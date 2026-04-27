"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── VERTEX SHADER ─────────────────────────────────────────────
const VERT = `#version 300 es
precision highp float;

in  vec3  aPos;
in  float aSeed;

uniform float uT;
uniform vec2  uPtrs[10];   // up to 5 fingers × 2 hands
uniform float uForces[10]; // per-finger force type: 0=push 1=attract 2=paint 3=vortex
uniform int   uPtrCount;
uniform int   uMode;
uniform float uSpread;
uniform vec2  uTrail[64];  // recent paint trail
uniform int   uTrailLen;
uniform int   uEffect;     // 0=curl 1=explode 2=vortex 3=freeze 4=gravity

out vec3  vColor;
out float vAlpha;
out float vGlow;

vec4 _p(vec4 x){return mod(((x*34.)+1.)*x,289.);}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz),l=1.-g;
  vec3 i1=min(g,l.zxy),i2=max(g,l.zxy);
  vec3 x1=x0-i1+C.x,x2=x0-i2+C.y,x3=x0-.5;
  i=mod(i,289.);
  vec4 p=_p(_p(_p(i.z+vec4(0,i1.z,i2.z,1))+i.y+vec4(0,i1.y,i2.y,1))+i.x+vec4(0,i1.x,i2.x,1));
  vec4 j=p-49.*floor(p/49.),x_=floor(j/7.),y_=floor(j-7.*x_);
  vec4 xs=x_/7.-.5/7.,ys=y_/7.-.5/7.,hs=1.-abs(xs)-abs(ys);
  vec4 b0=vec4(xs.xy,ys.xy),b1=vec4(xs.zw,ys.zw);
  vec4 s0=floor(b0)*2.+1.,s1=floor(b1)*2.+1.,sh=-step(hs,vec4(0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy,a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,hs.x),p1=vec3(a0.zw,hs.y),p2=vec3(a1.xy,hs.z),p3=vec3(a1.zw,hs.w);
  vec4 n=inversesqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=n.x;p1*=n.y;p2*=n.z;p3*=n.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m*=m; return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
vec3 curl(vec3 p){
  float e=.08;
  return vec3(
    snoise(p+vec3(0,e,0))-snoise(p-vec3(0,e,0))-snoise(p+vec3(0,0,e))+snoise(p-vec3(0,0,e)),
    snoise(p+vec3(0,0,e))-snoise(p-vec3(0,0,e))-snoise(p+vec3(e,0,0))+snoise(p-vec3(e,0,0)),
    snoise(p+vec3(e,0,0))-snoise(p-vec3(e,0,0))-snoise(p+vec3(0,e,0))+snoise(p-vec3(0,e,0))
  )/(2.*e);
}
vec3 hsv2rgb(vec3 c){
  vec4 K=vec4(1.,2./3.,1./3.,3.);
  vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);
  return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);
}

void main(){
  float t = uT * .13;
  float speedMult = uMode==1 ? 2.5 : uMode==2 ? 0.25 : 1.0;

  vec3 vel  = curl(aPos*.5  + vec3(t, t*.8, t*.55)) * 2.1 * speedMult;
  vec3 vel2 = curl(aPos*.9  + vec3(t*.6, t*1.1, t*.3)) * 0.8;

  // freeze effect
  if(uEffect == 3) { vel *= 0.02; vel2 *= 0.02; }

  vec3 pos = aPos + vel + vel2;

  // gravity well
  if(uEffect == 4) {
    pos.y -= 0.8;
  }

  float totalPush = 0.0;
  float totalPaint = 0.0;
  vec3  pushDir = vec3(0.);
  float vortexStrength = 0.0;

  // ── per-finger forces ──
  for(int fi=0; fi<uPtrCount && fi<10; fi++){
    vec3 fptr = vec3(uPtrs[fi] * 4.5, 0.);
    vec3 diff = pos - fptr;
    float d   = length(diff);
    float ftype = uForces[fi];

    if(ftype < 0.5) {
      // push
      float push = smoothstep(2.5, 0., d);
      pos += normalize(diff+1e-4)*push*3.5;
      totalPush = max(totalPush, push);
      pushDir += normalize(diff+1e-4)*push;
    } else if(ftype < 1.5) {
      // attract
      float pull = smoothstep(3.0, 0., d);
      pos -= normalize(diff+1e-4)*pull*3.0;
      totalPush = max(totalPush, pull);
    } else if(ftype < 2.5) {
      // paint / sculpt - pull strongly into trail
      float paint = smoothstep(1.2, 0., d);
      pos -= normalize(diff+1e-4)*paint*5.0;
      totalPaint = max(totalPaint, paint);
      totalPush  = max(totalPush,  paint);
    } else {
      // vortex
      float v = smoothstep(3.0, 0., d);
      vec3 tang = normalize(cross(diff, vec3(0,0,1))+1e-4);
      pos += tang * v * 2.5;
      vortexStrength = max(vortexStrength, v);
      totalPush = max(totalPush, v*0.5);
    }
  }

  // ── trail attraction ──
  float trailPull = 0.0;
  for(int ti=0; ti<uTrailLen && ti<64; ti++){
    vec3 tp = vec3(uTrail[ti]*4.5, 0.);
    float td = length(pos - tp);
    float tf = smoothstep(0.8, 0., td);
    pos -= normalize(pos - tp + 1e-4) * tf * 1.5;
    trailPull = max(trailPull, tf);
  }
  totalPush = max(totalPush, trailPull*0.7);

  // spread explosion
  float expl = clamp((uSpread-1.5)*0.8, 0., 1.);
  pos += normalize(pos+1e-4)*expl*4.5*aSeed;

  // global effects
  if(uEffect == 1) {
    // shockwave
    float wave = sin(length(pos)*3.0 - uT*4.0)*0.5+0.5;
    pos += normalize(pos+1e-4)*wave*1.5*aSeed;
    totalPush = max(totalPush, wave*0.5);
  }

  // ── COLOUR ──
  float hBase = snoise(aPos*.28 + uT*.04)*.5+.5;
  float hTime = mod(uT*0.05 + aSeed, 1.0);
  vec3 col;

  if(uMode==0){
    col = hsv2rgb(vec3(hTime, 0.9, 1.0));
  } else if(uMode==1){
    float f=hBase;
    col = f<.33 ? mix(vec3(1.,.05,0.),vec3(1.,.45,0.),f*3.)
        : f<.66 ? mix(vec3(1.,.45,0.),vec3(1.,.9,.2),(f-.33)*3.)
        :         mix(vec3(1.,.9,.2), vec3(1.,1.,1.), (f-.66)*3.);
  } else if(uMode==2){
    col = hsv2rgb(vec3(0.5+hBase*.15, 0.9, 0.9));
  } else {
    vec3 ca=vec3(.97,.67,.84),cb=vec3(.73,.58,.98),cc=vec3(.98,.88,.4);
    col = hBase<.5 ? mix(ca,cb,hBase*2.) : mix(cb,cc,(hBase-.5)*2.);
  }

  // paint trail = bright white-gold
  col = mix(col, vec3(1.0,0.95,0.6), totalPaint*0.9);
  col = mix(col, vec3(trailPull>0.3?1.0:col.r, trailPull>0.3?1.0:col.g, trailPull>0.3?0.5:col.b), trailPull*0.7);

  // push glow
  col = mix(col, vec3(1.), totalPush*0.7);
  col = mix(col, vec3(1.,0.5,0.9), vortexStrength*0.6);

  // explosion flash
  col = mix(col, vec3(1.,.95,.8), expl*0.8);

  // freeze = icy blue
  if(uEffect==3) col = mix(col, vec3(0.6,0.85,1.0), 0.6);

  vColor = col;
  vAlpha = mix(.15, 1.0, totalPush) + trailPull*0.5 + expl*0.3;
  vGlow  = totalPush + trailPull*0.6 + vortexStrength;

  float fov=.75, zz=pos.z+7.;
  vec2 proj=pos.xy/(zz*fov);
  gl_Position  = vec4(proj, 0., 1.);
  gl_PointSize = max(1., (2.2+totalPush*5.+trailPull*4.+expl*3.) * (7./zz));
}`;

const FRAG = `#version 300 es
precision mediump float;
in  vec3  vColor;
in  float vAlpha;
in  float vGlow;
out vec4  fragColor;
void main(){
  vec2 c=gl_PointCoord-.5;
  float d=length(c);
  if(d>.5) discard;
  float core=1.-smoothstep(0.,.2,d);
  float halo=1.-smoothstep(.1,.5,d);
  float alpha=(halo*.55+core*.45)*vAlpha;
  vec3 col=mix(vColor,vec3(1.),core*vGlow*.45);
  fragColor=vec4(col,alpha);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error("Shader:", gl.getShaderInfoLog(s));
  return s;
}
function link(gl: WebGL2RenderingContext, v: string, f: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, v));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, f));
  gl.linkProgram(p);
  return p;
}

const N = 220_000;
const MODES = [
  { name: "🌈 Rainbow", bg: [0.04,0.02,0.08] },
  { name: "🔥 Fire",    bg: [0.08,0.02,0.01] },
  { name: "🌊 Ocean",   bg: [0.02,0.04,0.10] },
  { name: "🌌 Galaxy",  bg: [0.06,0.03,0.12] },
];
const EFFECTS = ["🌀 Curl","💥 Wave","❄️ Freeze","🌍 Gravity"];
const GESTURES = [
  { fingers: "☝️",  label: "1 finger",  desc: "Push cloud" },
  { fingers: "✌️",  label: "2 fingers", desc: "Vortex spin" },
  { fingers: "🤟",  label: "3 fingers", desc: "Attract pull" },
  { fingers: "🖐️",  label: "Open hand", desc: "Explosion!" },
  { fingers: "🤏",  label: "Pinch",     desc: "Paint/sculpt" },
];
const SHAPES = ["Circle","Heart","Star","Wave","Infinity"];

export default function ImmersivePage() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const overlayRef   = useRef<HTMLCanvasElement>(null);

  // GL uniforms
  const progRef      = useRef<WebGLProgram|null>(null);
  const uTRef        = useRef<WebGLUniformLocation|null>(null);
  const uPtrsRef     = useRef<WebGLUniformLocation|null>(null);
  const uForcesRef   = useRef<WebGLUniformLocation|null>(null);
  const uCountRef    = useRef<WebGLUniformLocation|null>(null);
  const uModeRef     = useRef<WebGLUniformLocation|null>(null);
  const uSpreadRef   = useRef<WebGLUniformLocation|null>(null);
  const uTrailRef    = useRef<WebGLUniformLocation|null>(null);
  const uTrailLenRef = useRef<WebGLUniformLocation|null>(null);
  const uEffectRef   = useRef<WebGLUniformLocation|null>(null);
  const bgRef        = useRef([0.04,0.02,0.08]);

  // live state refs (avoid re-renders in RAF)
  const ptrsRef      = useRef<number[]>([]);   // flat [x,y, x,y …]
  const forcesRef    = useRef<number[]>([]);   // per-pointer force type
  const spreadRef    = useRef(0);
  const trailRef     = useRef<number[]>([]);   // flat [x,y …]
  const effectRef    = useRef(0);
  const modeRef      = useRef(0);

  const rafRef       = useRef(0);
  const camStreamRef = useRef<MediaStream|null>(null);
  const mpRafRef     = useRef(0);

  // drawing overlay
  const drawingRef   = useRef(false);
  const overlayPtsRef= useRef<{x:number,y:number}[]>([]);
  const paintColorRef= useRef("#f472b6");

  const [tracking,   setTracking]   = useState(false);
  const [camLoading, setCamLoading] = useState(false);
  const [showGuide,  setShowGuide]  = useState(true);
  const [fps,        setFps]        = useState(0);
  const [mode,       setMode]       = useState(0);
  const [effect,     setEffect]     = useState(0);
  const [handInfo,   setHandInfo]   = useState("");
  const [drawMode,   setDrawMode]   = useState(false);
  const [paintColor, setPaintColor] = useState("#f472b6");
  const [showPanel,  setShowPanel]  = useState(false);

  // ── WebGL setup ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl2",{antialias:false,alpha:false})!;
    if (!gl) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0,0,canvas.width,canvas.height);
      if (overlayRef.current) {
        overlayRef.current.width  = window.innerWidth;
        overlayRef.current.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const prog = link(gl, VERT, FRAG);
    progRef.current      = prog;
    uTRef.current        = gl.getUniformLocation(prog,"uT");
    uPtrsRef.current     = gl.getUniformLocation(prog,"uPtrs");
    uForcesRef.current   = gl.getUniformLocation(prog,"uForces");
    uCountRef.current    = gl.getUniformLocation(prog,"uPtrCount");
    uModeRef.current     = gl.getUniformLocation(prog,"uMode");
    uSpreadRef.current   = gl.getUniformLocation(prog,"uSpread");
    uTrailRef.current    = gl.getUniformLocation(prog,"uTrail");
    uTrailLenRef.current = gl.getUniformLocation(prog,"uTrailLen");
    uEffectRef.current   = gl.getUniformLocation(prog,"uEffect");

    const pos  = new Float32Array(N*3);
    const seed = new Float32Array(N);
    for (let i=0;i<N;i++){
      const th=Math.random()*Math.PI*2;
      const ph=Math.acos(2*Math.random()-1);
      const r =4.5*Math.cbrt(Math.random());
      pos[i*3]  =r*Math.sin(ph)*Math.cos(th);
      pos[i*3+1]=r*Math.sin(ph)*Math.sin(th);
      pos[i*3+2]=r*Math.cos(ph);
      seed[i]=Math.random();
    }

    const vao=gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const posBuf=gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER,posBuf);
    gl.bufferData(gl.ARRAY_BUFFER,pos,gl.STATIC_DRAW);
    const posLoc=gl.getAttribLocation(prog,"aPos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc,3,gl.FLOAT,false,0,0);
    const seedBuf=gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER,seedBuf);
    gl.bufferData(gl.ARRAY_BUFFER,seed,gl.STATIC_DRAW);
    const seedLoc=gl.getAttribLocation(prog,"aSeed");
    gl.enableVertexAttribArray(seedLoc);
    gl.vertexAttribPointer(seedLoc,1,gl.FLOAT,false,0,0);
    gl.bindVertexArray(null);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
    gl.disable(gl.DEPTH_TEST);

    let start=performance.now(), frames=0, lastFps=0;
    const loop=()=>{
      rafRef.current=requestAnimationFrame(loop);
      const t=(performance.now()-start)/1000;
      frames++;
      if(t-lastFps>=1){setFps(frames);frames=0;lastFps=t;}

      const bg=bgRef.current;
      gl.clearColor(bg[0],bg[1],bg[2],1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform1f(uTRef.current!,t);

      // pack pointers
      const ptrs=ptrsRef.current;
      const forces=forcesRef.current;
      const padPtrs   = new Float32Array(20).fill(9);
      const padForces = new Float32Array(10).fill(0);
      for(let i=0;i<Math.min(ptrs.length/2,10);i++){
        padPtrs[i*2]  =ptrs[i*2];
        padPtrs[i*2+1]=ptrs[i*2+1];
        padForces[i]  =forces[i]??0;
      }
      gl.uniform2fv(uPtrsRef.current!,   padPtrs);
      gl.uniform1fv(uForcesRef.current!, padForces);
      gl.uniform1i(uCountRef.current!,   Math.min(ptrs.length/2,10));
      gl.uniform1i(uModeRef.current!,    modeRef.current);
      gl.uniform1f(uSpreadRef.current!,  spreadRef.current);
      gl.uniform1i(uEffectRef.current!,  effectRef.current);

      // trail
      const trail=trailRef.current;
      const padTrail=new Float32Array(128).fill(9);
      const tLen=Math.min(trail.length/2,64);
      for(let i=0;i<tLen;i++){
        padTrail[i*2]  =trail[i*2];
        padTrail[i*2+1]=trail[i*2+1];
      }
      gl.uniform2fv(uTrailRef.current!, padTrail);
      gl.uniform1i(uTrailLenRef.current!, tLen);

      gl.bindVertexArray(vao);
      gl.drawArrays(gl.POINTS,0,N);
      gl.bindVertexArray(null);
    };
    loop();

    // mouse fallback (when not tracking)
    const onMouse=(e:MouseEvent)=>{
      if (tracking) return;
      const x=(e.clientX/window.innerWidth)*2-1;
      const y=-((e.clientY/window.innerHeight)*2-1);
      ptrsRef.current  =[x,y];
      forcesRef.current=[0];
    };
    window.addEventListener("mousemove",onMouse);

    return ()=>{
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",resize);
      window.removeEventListener("mousemove",onMouse);
    };
  },[mode, tracking]);

  // ── Overlay canvas drawing ───────────────────────────────────
  const getOverlayCtx=()=>overlayRef.current?.getContext("2d");

  const startDraw=useCallback((e:React.PointerEvent)=>{
    if (!drawMode) return;
    drawingRef.current=true;
    overlayPtsRef.current=[];
    const ctx=getOverlayCtx();
    if(!ctx) return;
    ctx.beginPath();
    ctx.strokeStyle=paintColorRef.current;
    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.shadowColor=paintColorRef.current;
    ctx.shadowBlur=12;
    ctx.moveTo(e.clientX,e.clientY);
  },[drawMode]);

  const doDraw=useCallback((e:React.PointerEvent)=>{
    if (!drawMode||!drawingRef.current) return;
    const ctx=getOverlayCtx();
    if(!ctx) return;
    ctx.lineTo(e.clientX,e.clientY);
    ctx.stroke();
    overlayPtsRef.current.push({x:e.clientX,y:e.clientY});
    // push to particle trail
    const nx=(e.clientX/window.innerWidth)*2-1;
    const ny=-((e.clientY/window.innerHeight)*2-1);
    const t=trailRef.current;
    t.push(nx,ny);
    if(t.length>128) t.splice(0,2);
    trailRef.current=t;
  },[drawMode]);

  const endDraw=useCallback(()=>{
    drawingRef.current=false;
    // fade trail over 3 seconds
    setTimeout(()=>{ trailRef.current=[]; },3000);
    // fade overlay
    const ctx=getOverlayCtx();
    if(!ctx) return;
    let op=1;
    const fade=setInterval(()=>{
      op-=0.03;
      if(op<=0){clearInterval(fade);ctx.clearRect(0,0,9999,9999);return;}
      ctx.globalAlpha=op;
      const tmp=ctx.getImageData(0,0,overlayRef.current!.width,overlayRef.current!.height);
      ctx.clearRect(0,0,9999,9999);
      ctx.putImageData(tmp,0,0);
    },50);
  },[]);

  // ── Shape spawner ────────────────────────────────────────────
  const spawnShape=useCallback((shapeName:string)=>{
    const cx=0, cy=0, R=1.8;
    const pts:number[]=[];
    const steps=60;
    if(shapeName==="Circle"){
      for(let i=0;i<steps;i++){
        const a=i/steps*Math.PI*2;
        pts.push(cx+Math.cos(a)*R, cy+Math.sin(a)*R);
      }
    } else if(shapeName==="Heart"){
      for(let i=0;i<steps;i++){
        const a=i/steps*Math.PI*2;
        const x=R*0.7*(16*Math.pow(Math.sin(a),3));
        const y=-R*0.7*(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a));
        pts.push(x/10,y/10);
      }
    } else if(shapeName==="Star"){
      for(let i=0;i<steps;i++){
        const a=i/steps*Math.PI*2;
        const r=i%2===0?R:R*0.45;
        pts.push(cx+Math.cos(a)*r, cy+Math.sin(a)*r);
      }
    } else if(shapeName==="Wave"){
      for(let i=0;i<steps;i++){
        const x=(i/steps)*4-2;
        const y=Math.sin(x*Math.PI*1.5)*0.8;
        pts.push(x,y);
      }
    } else if(shapeName==="Infinity"){
      for(let i=0;i<steps;i++){
        const a=i/steps*Math.PI*2;
        const x=R*Math.cos(a)/(1+Math.sin(a)*Math.sin(a));
        const y=R*Math.sin(a)*Math.cos(a)/(1+Math.sin(a)*Math.sin(a));
        pts.push(x,y);
      }
    }
    trailRef.current=pts;
    setTimeout(()=>{ trailRef.current=[]; },4000);
  },[]);

  // ── Hand tracking ────────────────────────────────────────────
  const startTracking=useCallback(async()=>{
    setCamLoading(true);
    try{
      const {HandLandmarker,FilesetResolver}=await import("@mediapipe/tasks-vision");
      const vision=await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const landmarker=await HandLandmarker.createFromOptions(vision,{
        baseOptions:{
          modelAssetPath:"https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate:"GPU",
        },
        runningMode:"VIDEO",numHands:2,
      });
      const stream=await navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:"user"}});
      camStreamRef.current=stream;
      const video=document.createElement("video");
      video.srcObject=stream; video.autoplay=true; video.muted=true; video.playsInline=true;
      video.style.cssText="position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;";
      document.body.appendChild(video);
      await video.play();
      setTracking(true); setCamLoading(false);

      const dist=(a:{x:number,y:number},b:{x:number,y:number})=>Math.hypot(a.x-b.x,a.y-b.y);

      // count extended fingers
      const countFingers=(lm:{x:number,y:number,z:number}[])=>{
        let count=0;
        // thumb
        if(lm[4].x < lm[3].x) count++;
        // index, middle, ring, pinky
        const tips=[8,12,16,20], mids=[6,10,14,18];
        for(let i=0;i<4;i++) if(lm[tips[i]].y < lm[mids[i]].y) count++;
        return count;
      };

      let lastTime=-1;
      const detect=()=>{
        mpRafRef.current=requestAnimationFrame(detect);
        if(video.readyState<2||video.currentTime===lastTime) return;
        lastTime=video.currentTime;
        const result=landmarker.detectForVideo(video,performance.now());
        const hands=result.landmarks??[];

        const newPtrs:number[]=[];
        const newForces:number[]=[];
        let infoStr="";

        for(let hi=0;hi<Math.min(hands.length,2);hi++){
          const lm=hands[hi];
          const fingers=countFingers(lm);
          const pinchD=dist(lm[4],lm[8]);
          const isPinch=pinchD<0.06;

          // determine force type from gesture
          let forceType=0;
          let gestureLabel="Push";
          if(isPinch){ forceType=2; gestureLabel="Paint 🎨"; }
          else if(fingers>=5){ forceType=0; gestureLabel="Explode 💥"; }
          else if(fingers===3){ forceType=1; gestureLabel="Attract 🌀"; }
          else if(fingers===2){ forceType=3; gestureLabel="Vortex 🌪️"; }
          else { forceType=0; gestureLabel="Push ☝️"; }

          // if painting, push index tip into trail
          const tip=lm[8];
          const nx=(1-tip.x)*2-1;
          const ny=-(tip.y*2-1);

          if(isPinch){
            const t=trailRef.current;
            t.push(nx,ny);
            if(t.length>128) t.splice(0,2);
            trailRef.current=t;
          }

          // spread = 5-finger open hand → explosion
          if(fingers>=5){
            const wrist=lm[0];
            const mid=lm[12];
            spreadRef.current=dist(wrist,mid)*8;
          } else {
            spreadRef.current=Math.max(0,spreadRef.current-0.05);
          }

          // send all extended fingertips as separate pointers
          const tipIdxs=[8,12,16,20,4];
          for(let fi=0;fi<Math.min(fingers,5);fi++){
            const ftip=lm[tipIdxs[fi]];
            newPtrs.push((1-ftip.x)*2-1, -(ftip.y*2-1));
            newForces.push(forceType);
          }

          infoStr+=(hi>0?" | ":``)+(fingers===0?"✊":fingers===1?"☝️":fingers===2?"✌️":fingers===3?"🤟":fingers===4?"🖖":"🖐️")+` ${fingers}f · ${gestureLabel}`;
        }

        if(hands.length===0){
          ptrsRef.current=[]; forcesRef.current=[];
          trailRef.current=[];
          spreadRef.current=0;
          infoStr="No hands";
        } else {
          ptrsRef.current=newPtrs;
          forcesRef.current=newForces;
        }
        setHandInfo(infoStr);
      };
      detect();
    }catch(e){
      console.error(e); setCamLoading(false);
      alert("Camera permission needed.");
    }
  },[]);

  const stopTracking=useCallback(()=>{
    cancelAnimationFrame(mpRafRef.current);
    camStreamRef.current?.getTracks().forEach(t=>t.stop());
    camStreamRef.current=null;
    document.querySelectorAll("video[style*='-9999']").forEach(v=>v.remove());
    setTracking(false);
    ptrsRef.current=[]; forcesRef.current=[];
    spreadRef.current=0; trailRef.current=[];
    setHandInfo("");
  },[]);

  const changeMode=(m:number)=>{ setMode(m); modeRef.current=m; bgRef.current=MODES[m].bg; };
  const changeEffect=(e:number)=>{ setEffect(e); effectRef.current=e; };

  // ── UI ───────────────────────────────────────────────────────
  return (
    <div
      style={{position:"relative",width:"100%",height:"100svh",overflow:"hidden",background:"#0f0a1a"}}
      onPointerDown={startDraw}
      onPointerMove={doDraw}
      onPointerUp={endDraw}
    >
      {/* WebGL canvas */}
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,display:"block"}} />

      {/* Drawing overlay */}
      <canvas
        ref={overlayRef}
        style={{
          position:"absolute",inset:0,display:"block",
          cursor:drawMode?"crosshair":"default",
          pointerEvents:drawMode?"all":"none",
        }}
      />

      {/* ── TOP LEFT: title ── */}
      <div style={{position:"absolute",top:24,left:24,zIndex:10,pointerEvents:"none"}}>
        <p style={{margin:"0 0 2px",fontSize:10,letterSpacing:".35em",textTransform:"uppercase",color:"#ec4899",fontWeight:600}}>Immersive</p>
        <h1 style={{
          margin:0,lineHeight:1.1,fontWeight:800,
          fontSize:"clamp(1.8rem,4vw,3rem)",
          background:"linear-gradient(135deg,#f472b6,#a78bfa,#60a5fa,#34d399)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
        }}>8D Space</h1>
        <p style={{margin:"3px 0 0",fontSize:10,color:"#a78bfa"}}>{N.toLocaleString()} particles · WebGL2</p>
      </div>

      {/* ── TOP RIGHT: stats + hand info ── */}
      <div style={{position:"absolute",top:24,right:24,zIndex:10,pointerEvents:"none",textAlign:"right"}}>
        <div style={{fontSize:13,color:"#a78bfa"}}>{fps} fps</div>
        <div style={{marginTop:3,fontSize:12,color:tracking?"#4ade80":"#f472b6"}}>
          {tracking?"✋ tracking":"🖱️ mouse"}
        </div>
        {handInfo&&<div style={{marginTop:4,fontSize:11,color:"#fbbf24",maxWidth:220}}>{handInfo}</div>}
      </div>

      {/* ── TOP CENTER: mode buttons ── */}
      <div style={{
        position:"absolute",top:24,left:"50%",transform:"translateX(-50%)",
        zIndex:10,display:"flex",gap:6,
      }}>
        {MODES.map((m,i)=>(
          <button key={i} onClick={()=>changeMode(i)} style={{
            padding:"6px 12px",borderRadius:999,fontSize:11,fontWeight:600,
            cursor:"pointer",border:mode===i?"1px solid rgba(255,255,255,0.5)":"1px solid rgba(255,255,255,0.12)",
            background:mode===i?"rgba(255,255,255,0.18)":"rgba(15,10,26,0.75)",
            backdropFilter:"blur(10px)",color:mode===i?"#fff":"#94a3b8",
            boxShadow:mode===i?"0 0 14px rgba(167,139,250,0.4)":"none",transition:"all .2s",
          }}>{m.name}</button>
        ))}
      </div>

      {/* ── LEFT PANEL: effects + shapes + draw ── */}
      <div style={{position:"absolute",top:"50%",left:16,transform:"translateY(-50%)",zIndex:10,display:"flex",flexDirection:"column",gap:8}}>

        {/* Effects */}
        <div style={{
          background:"rgba(15,10,26,0.85)",backdropFilter:"blur(12px)",
          border:"1px solid rgba(167,139,250,0.2)",borderRadius:16,padding:10,
          display:"flex",flexDirection:"column",gap:6,
        }}>
          <p style={{margin:0,fontSize:9,color:"#a78bfa",letterSpacing:".2em",textTransform:"uppercase",textAlign:"center"}}>Effects</p>
          {EFFECTS.map((ef,i)=>(
            <button key={i} onClick={()=>changeEffect(i)} style={{
              padding:"6px 10px",borderRadius:10,fontSize:11,fontWeight:600,cursor:"pointer",
              border:effect===i?"1px solid rgba(167,139,250,0.6)":"1px solid rgba(255,255,255,0.08)",
              background:effect===i?"rgba(139,92,246,0.3)":"transparent",
              color:effect===i?"#fff":"#64748b",transition:"all .2s",whiteSpace:"nowrap",
            }}>{ef}</button>
          ))}
        </div>

        {/* Shapes */}
        <div style={{
          background:"rgba(15,10,26,0.85)",backdropFilter:"blur(12px)",
          border:"1px solid rgba(244,114,182,0.2)",borderRadius:16,padding:10,
          display:"flex",flexDirection:"column",gap:6,
        }}>
          <p style={{margin:0,fontSize:9,color:"#f472b6",letterSpacing:".2em",textTransform:"uppercase",textAlign:"center"}}>Shapes</p>
          {SHAPES.map((s,i)=>(
            <button key={i} onClick={()=>spawnShape(s)} style={{
              padding:"6px 10px",borderRadius:10,fontSize:11,fontWeight:600,cursor:"pointer",
              border:"1px solid rgba(244,114,182,0.2)",
              background:"rgba(244,114,182,0.08)",
              color:"#f9a8d4",transition:"all .2s",whiteSpace:"nowrap",
            }}>{s}</button>
          ))}
        </div>

        {/* Draw mode */}
        <div style={{
          background:"rgba(15,10,26,0.85)",backdropFilter:"blur(12px)",
          border:`1px solid ${drawMode?"rgba(52,211,153,0.5)":"rgba(255,255,255,0.1)"}`,
          borderRadius:16,padding:10,display:"flex",flexDirection:"column",gap:6,
        }}>
          <p style={{margin:0,fontSize:9,color:"#34d399",letterSpacing:".2em",textTransform:"uppercase",textAlign:"center"}}>Draw</p>
          <button onClick={()=>setDrawMode(d=>!d)} style={{
            padding:"6px 10px",borderRadius:10,fontSize:11,fontWeight:600,cursor:"pointer",
            border:`1px solid ${drawMode?"rgba(52,211,153,0.6)":"rgba(255,255,255,0.1)"}`,
            background:drawMode?"rgba(52,211,153,0.2)":"transparent",
            color:drawMode?"#34d399":"#64748b",transition:"all .2s",
          }}>{drawMode?"✏️ Drawing":"✏️ Draw"}</button>
          {drawMode&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center"}}>
              {["#f472b6","#a78bfa","#60a5fa","#34d399","#fbbf24","#fb923c","#fff"].map(c=>(
                <button key={c} onClick={()=>{setPaintColor(c);paintColorRef.current=c;}} style={{
                  width:20,height:20,borderRadius:"50%",background:c,border:
                  paintColor===c?"2px solid white":"2px solid transparent",cursor:"pointer",padding:0,
                }}/>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM: camera + gesture guide toggle ── */}
      <div style={{
        position:"absolute",bottom:24,left:"50%",transform:"translateX(-50%)",
        zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:10,
      }}>
        {tracking&&(
          <div style={{
            display:"flex",gap:12,padding:"8px 16px",borderRadius:999,
            background:"rgba(15,10,26,0.8)",backdropFilter:"blur(10px)",
            border:"1px solid rgba(167,139,250,0.2)",fontSize:11,color:"#94a3b8",
          }}>
            <span>☝️ Push</span><span>✌️ Vortex</span><span>🤟 Attract</span><span>🖐️ Explode</span><span>🤏 Paint</span>
          </div>
        )}
        <div style={{display:"flex",gap:10}}>
          {!tracking?(
            <button onClick={startTracking} disabled={camLoading} style={{
              display:"flex",alignItems:"center",gap:8,
              padding:"11px 24px",borderRadius:999,fontSize:14,fontWeight:600,
              cursor:"pointer",border:"1px solid rgba(167,139,250,0.5)",
              background:"rgba(15,10,26,0.88)",backdropFilter:"blur(14px)",
              color:"#a78bfa",opacity:camLoading?.6:1,
              boxShadow:"0 0 20px rgba(167,139,250,0.2)",
            }}>
              <span style={{width:8,height:8,borderRadius:"50%",background:camLoading?"#fbbf24":"#6b7280",boxShadow:camLoading?"0 0 8px #fbbf24":"none"}}/>
              {camLoading?"Loading model…":"✋ Enable hand tracking"}
            </button>
          ):(
            <button onClick={stopTracking} style={{
              display:"flex",alignItems:"center",gap:8,
              padding:"11px 24px",borderRadius:999,fontSize:14,fontWeight:600,
              cursor:"pointer",border:"1px solid rgba(248,113,113,0.4)",
              background:"rgba(15,10,26,0.88)",backdropFilter:"blur(14px)",color:"#f87171",
            }}>
              <span style={{width:8,height:8,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 8px #4ade80"}}/>
              📷 Turn off camera
            </button>
          )}
        </div>
      </div>

      {/* ── WELCOME ── */}
      {showGuide&&(
        <div style={{
          position:"absolute",inset:0,zIndex:20,
          display:"flex",alignItems:"center",justifyContent:"center",
          background:"rgba(6,3,15,0.93)",backdropFilter:"blur(12px)",
        }}>
          <div style={{
            maxWidth:480,margin:"0 20px",padding:40,borderRadius:28,
            background:"rgba(15,8,30,0.98)",textAlign:"center",
            border:"1px solid rgba(167,139,250,0.25)",
            boxShadow:"0 0 80px rgba(167,139,250,0.1)",
          }}>
            <div style={{fontSize:48,marginBottom:12}}>✨</div>
            <h2 style={{
              margin:"0 0 10px",fontSize:26,fontWeight:800,
              background:"linear-gradient(135deg,#f472b6,#a78bfa,#60a5fa,#34d399)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            }}>8D Space — Enhanced</h2>
            <p style={{margin:"0 0 20px",fontSize:13,color:"#94a3b8",lineHeight:1.8}}>
              {N.toLocaleString()} particles. Full-finger gesture control. Draw & sculpt in real time.
            </p>
            <div style={{
              display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,
              marginBottom:28,textAlign:"left",
            }}>
              {[
                ["☝️ 1 finger","Push cloud"],
                ["✌️ 2 fingers","Vortex spin"],
                ["🤟 3 fingers","Attract pull"],
                ["🖐️ Open hand","Explosion!"],
                ["🤏 Pinch","Paint particles"],
                ["✏️ Draw mode","Sculpt w/ mouse"],
                ["💠 Shapes","Spawn patterns"],
                ["🎨 Effects","Change field"],
              ].map(([k,v])=>(
                <div key={k} style={{
                  padding:"8px 12px",borderRadius:10,
                  background:"rgba(167,139,250,0.07)",
                  border:"1px solid rgba(167,139,250,0.12)",
                }}>
                  <div style={{fontSize:12,color:"#fff",fontWeight:600}}>{k}</div>
                  <div style={{fontSize:11,color:"#64748b"}}>{v}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>setShowGuide(false)} style={{
              width:"100%",padding:"14px 0",borderRadius:16,fontSize:16,
              fontWeight:700,color:"#fff",border:"none",cursor:"pointer",
              background:"linear-gradient(135deg,#ec4899,#8b5cf6,#3b82f6,#06b6d4)",
              boxShadow:"0 4px 28px rgba(139,92,246,0.45)",
            }}>Enter the Space ✨</button>
          </div>
        </div>
      )}
    </div>
  );
}