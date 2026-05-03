"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
//  SHADERS
// ═══════════════════════════════════════════════════════════════

const QUAD_VERT = `#version 300 es
precision highp float;
in vec2 aUV;
out vec2 vUV;
void main(){ vUV = aUV * 0.5 + 0.5; gl_Position = vec4(aUV, 0., 1.); }`;

const CAMERA_FRAG = `#version 300 es
precision highp float;
in  vec2 vUV;
out vec4 fragColor;

uniform sampler2D uCamera;
uniform sampler2D uParticles;
uniform float uT;
uniform vec2  uPtrs[10];
uniform int   uPtrCount;
uniform float uGlass;
uniform float uPrism;
uniform float uMag;
uniform vec2  uResolution;

vec2 hash2(vec2 p){
  p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
  return -1.+2.*fract(sin(p)*43758.5453);
}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),
             mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1)),f-vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p*=2.1;a*=.5;}
  return v;
}
vec2 aspectUV(vec2 uv,vec2 res){
  return (uv-.5)*vec2(res.x/res.y,1.)+.5;
}

void main(){
  vec2 res=uResolution;
  vec2 uv=vec2(vUV.x,1.0-vUV.y);
  vec2 uvAsp=aspectUV(uv,res);

  float viscT=uT*0.18;
  vec2 liq1=vec2(
    fbm(uvAsp*2.2+vec2(viscT*.4,viscT*.31))-.5,
    fbm(uvAsp*2.2+vec2(viscT*.28+4.3,viscT*.35+2.1))-.5
  )*0.045*uGlass;
  vec2 liq2=vec2(
    fbm(uvAsp*1.1+vec2(viscT*.18+1.7,viscT*.22))-.5,
    fbm(uvAsp*1.1+vec2(viscT*.15+5.2,viscT*.19+3.8))-.5
  )*0.028*uGlass;
  vec2 dist=liq1+liq2;

  float totalMag=0.;
  vec2 magCenter=vec2(0.5);

  for(int i=0;i<uPtrCount&&i<10;i++){
    vec2 ptr=vec2(uPtrs[i].x*.5+.5,uPtrs[i].y*.5+.5);
    vec2 dAsp=aspectUV(uv,res)-aspectUV(ptr,res);
    float r=length(dAsp);
    vec2 dUV=uv-ptr;
    float ring=sin(r*48.-uT*2.6)*exp(-r*5.)*0.006*uGlass;
    dist+=normalize(dUV+1e-4)*ring;
    float barrel=exp(-r*r*6.)*uGlass*0.042;
    dist+=normalize(dUV+1e-4)*barrel;
    float mHere=exp(-r*r*8.)*uMag;
    if(mHere>totalMag){totalMag=mHere;magCenter=ptr;}
  }

  vec2 fromC=aspectUV(uv,res)-aspectUV(magCenter,res);
  float rC=length(fromC);
  float lensR=0.16*(uMag*0.5+0.5);
  bool inside=(totalMag>0.01&&rC<lensR);
  if(inside){
    float t=rC/lensR;
    float squeeze=1.0/(1.0+uMag*2.0*(1.0-smoothstep(0.,1.,t)));
    vec2 fromCUV=uv-magCenter;
    dist+=fromCUV*(squeeze-1.0)*0.65;
  }

  float pa=uPrism*0.010;
  vec2 rUV=clamp(uv+dist+vec2(pa,pa*.28),0.,1.);
  vec2 gUV=clamp(uv+dist+vec2(pa*.15,-pa*.08),0.,1.);
  vec2 bUV=clamp(uv+dist+vec2(-pa,-pa*.28),0.,1.);
  for(int i=0;i<uPtrCount&&i<10;i++){
    vec2 ptr=vec2(uPtrs[i].x*.5+.5,uPtrs[i].y*.5+.5);
    vec2 dAsp=aspectUV(uv,res)-aspectUV(ptr,res);
    float r=length(dAsp);
    float ca=exp(-r*r*4.)*uPrism*0.016;
    vec2 dir=normalize(uv-ptr+1e-4);
    rUV=clamp(rUV+dir*ca,0.,1.);
    bUV=clamp(bUV-dir*ca,0.,1.);
  }

  float rSamp=texture(uCamera,rUV).r;
  float gSamp=texture(uCamera,gUV).g;
  float bSamp=texture(uCamera,bUV).b;
  vec3 cam=vec3(rSamp,gSamp,bSamp);

  float lum=dot(cam,vec3(0.299,0.587,0.114));
  cam=mix(cam,vec3(lum),0.16);
  cam=mix(cam,vec3(0.03,0.05,0.11),0.07);
  cam=cam/(cam+0.52)*1.52;

  if(totalMag>0.01){
    vec2 rimD=aspectUV(uv,res)-aspectUV(magCenter,res);
    float rRim=length(rimD);
    float edge=smoothstep(lensR*.78,lensR*.98,rRim)*smoothstep(lensR*1.10,lensR*.98,rRim);
    cam+=vec3(0.45,0.58,0.82)*edge*uGlass*0.55;
  }

  float shimmer=noise(uv*5.5+uT*.10)*.5+.5;
  vec3 shimCol=mix(vec3(0.50,0.55,0.70),vec3(0.70,0.68,0.82),shimmer);
  cam+=shimCol*shimmer*0.022*uPrism;

  float sheen=fbm(uvAsp*3.0+vec2(viscT*.5,viscT*.38))*.5+.5;
  cam+=vec3(0.18,0.22,0.32)*pow(sheen,3.5)*uGlass*0.4;

  vec4 pCol=texture(uParticles,vec2(vUV.x,vUV.y));
  cam+=pCol.rgb*pCol.a*0.88;

  fragColor=vec4(clamp(cam,0.,1.),1.);
}`;

const VERT = `#version 300 es
precision highp float;
in  vec3  aPos;
in  float aSeed;

uniform float uT;
uniform vec2  uPtrs[10];
uniform float uForces[10];
uniform int   uPtrCount;
uniform int   uMode;
uniform float uSpread;
uniform vec2  uTrail[128];
uniform int   uTrailLen;
uniform int   uEffect;
uniform float uGlobalSpeed;

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
  vec4 n_=inversesqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=n_.x;p1*=n_.y;p2*=n_.z;p3*=n_.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m*=m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
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
float seg(vec2 p,vec2 a,vec2 b){
  vec2 ab=b-a,ap=p-a;
  float t=clamp(dot(ap,ab)/dot(ab,ab),0.,1.);
  return length(ap-ab*t);
}

void main(){
  float spd=mix(0.012,1.0,uGlobalSpeed);
  float t=uT*.11*spd;
  float sm=uMode==1?2.2:uMode==2?0.28:1.0;
  if(uEffect==3) sm*=0.015;

  vec3 vel =curl(aPos*.5 +vec3(t,t*.8,t*.55))*2.0*sm;
  vec3 vel2=curl(aPos*.85+vec3(t*.65,t*1.05,t*.32))*.75;
  vec3 pos =aPos+vel+vel2;

  if(uEffect==4){
    float gravT=uT*0.008*(aSeed*.6+.4);
    pos.y-=mod(gravT,12.0)-.8;
  }
  if(uEffect==1){
    float wave=sin(length(pos)*3.-uT*4.*spd)*.5+.5;
    pos+=normalize(pos+1e-4)*wave*1.6*aSeed;
  }

  float push=0.,paint=0.,vortex=0.,ribbon=0.,crystal=0.,blackhole=0.;

  for(int fi=0;fi<uPtrCount&&fi<10;fi++){
    vec3 fp=vec3(uPtrs[fi]*4.5,0.);
    vec3 d=pos-fp;
    float r=length(d);
    float ft=uForces[fi];

    if(ft<0.5){
      float v=smoothstep(2.4,0.,r);
      pos+=normalize(d+1e-4)*v*3.4;
      push=max(push,v);
    } else if(ft<1.5){
      float v=smoothstep(2.9,0.,r);
      pos-=normalize(d+1e-4)*v*2.9;
      push=max(push,v);
    } else if(ft<2.5){
      float v=smoothstep(1.1,0.,r);
      pos-=normalize(d+1e-4)*v*5.;
      paint=max(paint,v);
      push=max(push,v);
    } else if(ft<3.5){
      float v=smoothstep(2.9,0.,r);
      pos+=normalize(cross(d,vec3(0,0,1))+1e-4)*v*2.4;
      vortex=max(vortex,v);
      push=max(push,v*.5);
    } else if(ft<4.5){
      float v=smoothstep(3.2,0.,r);
      float sgn=aSeed>.5?1.:-1.;
      pos+=normalize(cross(d,vec3(0,0,sgn))+1e-4)*v*1.8;
      ribbon=max(ribbon,v);
      push=max(push,v*.4);
    } else if(ft<5.5){
      float v=smoothstep(2.5,0.,r);
      float ang=atan(d.y,d.x);
      float snap=round(ang/(3.14159/3.))*(3.14159/3.);
      vec3 ldir=vec3(cos(snap),sin(snap),0.);
      pos+=ldir*v*2.8;
      crystal=max(crystal,v);
      push=max(push,v*.6);
    } else {
      float v=smoothstep(3.5,0.,r);
      pos-=normalize(d+1e-4)*v*v*5.5;
      blackhole=max(blackhole,v);
      push=max(push,v);
    }
  }

  float trail=0.;
  for(int ti=0;ti<uTrailLen-1&&ti<127;ti++){
    float sd=seg(pos.xy,uTrail[ti],uTrail[ti+1])*4.3;
    float tf=smoothstep(.9,0.,sd);
    pos.xy-=normalize(pos.xy-(uTrail[ti]+uTrail[ti+1])*.5+1e-4)*tf*2.0;
    trail=max(trail,tf);
  }
  push=max(push,trail*.75);

  float expl=clamp((uSpread-1.4)*.85,0.,1.);
  pos+=normalize(pos+1e-4)*expl*4.2*aSeed;

  float hB=snoise(aPos*.3+uT*.035)*.5+.5;
  float hS=mod(aSeed*3.7+uT*.04,1.);
  vec3 col;
  if(uMode==0){
    vec3 c0=vec3(.15,.95,.7),c1=vec3(.55,.18,.98),c2=vec3(1.,.22,.58),c3=vec3(1.,.82,.18);
    col=hS<.33?mix(c0,c1,hS*3.):hS<.66?mix(c1,c2,(hS-.33)*3.):mix(c2,c3,(hS-.66)*3.);
  } else if(uMode==1){
    vec3 c0=vec3(.5,.0,.12),c1=vec3(1.,.2,.02),c2=vec3(1.,.62,.05),c3=vec3(1.,.96,.78);
    col=hB<.33?mix(c0,c1,hB*3.):hB<.66?mix(c1,c2,(hB-.33)*3.):mix(c2,c3,(hB-.66)*3.);
  } else if(uMode==2){
    col=hsv2rgb(vec3(.53+hB*.11,.9,.85+hB*.15));
  } else {
    vec3 c0=vec3(.28,.04,.78),c1=vec3(.88,.08,.68),c2=vec3(.08,.48,1.),c3=vec3(.88,.93,1.);
    col=hS<.33?mix(c0,c1,hS*3.):hS<.66?mix(c1,c2,(hS-.33)*3.):mix(c2,c3,(hS-.66)*3.);
  }
  col=mix(col,vec3(1.),push*.58);
  col=mix(col,vec3(1.,.94,.52),paint*.82);
  col=mix(col,vec3(.75,1.,.88),trail*.72);
  col=mix(col,vec3(1.,.38,.82),vortex*.50);
  col=mix(col,vec3(.6,.9,1.),ribbon*.60);
  col=mix(col,vec3(.9,.85,1.),crystal*.70);
  col=mix(col,vec3(.05,.05,.05),blackhole*.80);
  col=mix(col,vec3(1.,.96,.82),expl*.72);
  if(uEffect==3) col=mix(col,vec3(.42,.72,1.),.62);

  vColor=col;
  vAlpha=mix(.11,.97,push)+trail*.52+expl*.26+paint*.38+ribbon*.25+crystal*.35;
  vGlow=push+trail*.62+vortex+ribbon*.4+crystal*.5;

  float fov=.75,zz=pos.z+7.;
  gl_Position=vec4(pos.xy/(zz*fov),0.,1.);
  gl_PointSize=max(1.,(2.+push*5.2+trail*5.+expl*3.2+crystal*3.8)*(7./zz));
}`;

const PART_FRAG = `#version 300 es
precision mediump float;
in vec3 vColor; in float vAlpha,vGlow;
out vec4 fragColor;
void main(){
  vec2 c=gl_PointCoord-.5; float d=length(c);
  if(d>.5)discard;
  float core=1.-smoothstep(0.,.18,d);
  float halo=1.-smoothstep(.12,.5,d);
  float a=(halo*.48+core*.52)*vAlpha;
  fragColor=vec4(mix(vColor,vec3(1.),core*vGlow*.38),a);
}`;

// ── helpers ───────────────────────────────────────────────────
function mkShader(gl:WebGL2RenderingContext,type:number,src:string){
  const s=gl.createShader(type)!;
  gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))
    console.error(type===gl.VERTEX_SHADER?"VERT":"FRAG",gl.getShaderInfoLog(s));
  return s;
}
function mkProg(gl:WebGL2RenderingContext,v:string,f:string){
  const p=gl.createProgram()!;
  gl.attachShader(p,mkShader(gl,gl.VERTEX_SHADER,v));
  gl.attachShader(p,mkShader(gl,gl.FRAGMENT_SHADER,f));
  gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))
    console.error("LINK",gl.getProgramInfoLog(p));
  return p;
}
function mkTex(gl:WebGL2RenderingContext,W:number,H:number){
  const t=gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D,t);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,W,H,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  return t;
}

const N=200_000;
const MODES=[
  {name:"🌿 Aurora", bg:[0.02,0.04,0.06]},
  {name:"🔥 Inferno",bg:[0.07,0.01,0.01]},
  {name:"🌊 Ocean",  bg:[0.01,0.03,0.09]},
  {name:"🌌 Nebula", bg:[0.05,0.02,0.11]},
];
const EFFECTS_PARTICLE=["🌀 Curl","💥 Wave","❄️ Freeze","🪐 Drift"];
const EFFECTS_CAMERA  =["🔮 Glass","💎 Prism","🔍 Magnify","✨ All"];

function recogniseShape(pts:{x:number,y:number}[]):string|null{
  if(pts.length<10)return null;
  const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);
  const minX=Math.min(...xs),maxX=Math.max(...xs);
  const minY=Math.min(...ys),maxY=Math.max(...ys);
  const w=maxX-minX,h=maxY-minY;
  if(w<30||h<30)return null;
  const cx=xs.reduce((a,b)=>a+b)/pts.length;
  const cy=ys.reduce((a,b)=>a+b)/pts.length;
  const radii=pts.map(p=>Math.hypot(p.x-cx,p.y-cy));
  const avgR=radii.reduce((a,b)=>a+b)/radii.length;
  const radVar=radii.map(r=>Math.abs(r-avgR)).reduce((a,b)=>a+b)/radii.length;
  const closed=Math.hypot(pts[0].x-pts[pts.length-1].x,pts[0].y-pts[pts.length-1].y)<Math.max(w,h)*.38;
  const aspect=w/Math.max(h,1);
  if(closed&&radVar/avgR<0.22)return"circle";
  if(closed&&radVar/avgR<0.48){
    const topPts=pts.filter(p=>p.y<cy-h*.1);
    const dip=topPts.filter(p=>Math.abs(p.x-cx)<w*.2);
    return dip.length>topPts.length*.15?"heart":"star";
  }
  if(!closed&&aspect>2.2)return"wave";
  if(!closed&&Math.abs(pts[0].x-pts[pts.length-1].x)<w*.35&&pts.length>25)return"infinity";
  return null;
}
function makeShapeTrail(shape:string,cx:number,cy:number,W:number,H:number):number[]{
  const toN=(x:number,y:number)=>[(x/W)*2-1,-((y/H)*2-1)] as [number,number];
  const[ncx,ncy]=toN(cx,cy);
  const R=0.52,pts:number[]=[];
  for(let i=0;i<=80;i++){
    const a=i/80*Math.PI*2;
    if(shape==="circle")      {pts.push(ncx+Math.cos(a)*R,ncy+Math.sin(a)*R*1.25);}
    else if(shape==="heart")  {const x=R*.068*(16*Math.pow(Math.sin(a),3));const y=-R*.068*(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a));pts.push(ncx+x,ncy+y);}
    else if(shape==="star")   {const r=i%2===0?R:R*.42;pts.push(ncx+Math.cos(a)*r,ncy+Math.sin(a)*r*1.25);}
    else if(shape==="wave")   {const x=(i/80)*2.2-1.1;pts.push(ncx+x*.55,ncy+Math.sin(x*Math.PI*2)*.42);}
    else                      {const d=1+Math.sin(a)*Math.sin(a);pts.push(ncx+R*Math.cos(a)/d,ncy+R*Math.sin(a)*Math.cos(a)/d*1.25);}
  }
  return pts;
}

type AppMode="particle"|"camera";

export default function ImmersivePage(){
  const canvasRef =useRef<HTMLCanvasElement>(null);
  const overlayRef=useRef<HTMLCanvasElement>(null);
  const videoRef  =useRef<HTMLVideoElement>(null);

  const glRef         =useRef<WebGL2RenderingContext|null>(null);
  const partProgRef   =useRef<WebGLProgram|null>(null);
  const camProgRef    =useRef<WebGLProgram|null>(null);
  const partVaoRef    =useRef<WebGLVertexArrayObject|null>(null);
  const quadVaoRef    =useRef<WebGLVertexArrayObject|null>(null);
  const pFboRef       =useRef<WebGLFramebuffer|null>(null);
  const pTexRef       =useRef<WebGLTexture|null>(null);
  const camTexRef     =useRef<WebGLTexture|null>(null);
  const rafRef        =useRef(0);
  const mpRafRef      =useRef(0);
  const camStreamRef  =useRef<MediaStream|null>(null);

  const pUni=useRef<Record<string,WebGLUniformLocation|null>>({});
  const cUni=useRef<Record<string,WebGLUniformLocation|null>>({});

  // live refs
  const bgRef          =useRef([0.02,0.04,0.06]);
  const ptrsRef        =useRef<number[]>([]);
  const forcesRef      =useRef<number[]>([]);
  const spreadRef      =useRef(0);
  const trailRef       =useRef<number[]>([]);
  const effectRef      =useRef(0);
  const modeRef        =useRef(0);
  const glassRef       =useRef(1.2);
  const prismRef       =useRef(1.0);
  const magRef         =useRef(1.2);
  const appModeRef     =useRef<AppMode>("particle");
  const globalSpeedRef =useRef(1.0);
  const drawModeRef    =useRef(false);  // ← draw mode live ref

  // drawing
  const isDrawing  =useRef(false);
  const drawPts    =useRef<{x:number,y:number}[]>([]);
  const paintColRef=useRef("#a78bfa");

  // ── Hand draw: index finger smoothing state ──────────────────
  // We keep a smoothed position and only draw when drawMode is ON
  const handDrawActive  =useRef(false);   // is finger currently being tracked for drawing?
  const handDrawPts     =useRef<{x:number,y:number}[]>([]);
  const smoothedFinger  =useRef({x:-1, y:-1});  // exponentially smoothed screen pos
  const prevFingerUp    =useRef(true);    // was finger "up" last frame (for stroke start)

  // UI state
  const[appMode,    setAppMode]   =useState<AppMode>("particle");
  const[tracking,   setTracking]  =useState(false);
  const[camLoading, setCamLoading]=useState(false);
  const[camReady,   setCamReady]  =useState(false);
  const[showGuide,  setShowGuide] =useState(true);
  const[fps,        setFps]       =useState(0);
  const[mode,       setMode]      =useState(0);
  const[effect,     setEffect]    =useState(0);
  const[handInfo,   setHandInfo]  =useState("");
  // ── draw mode is OFF by default, user must explicitly enable ──
  const[drawMode,   setDrawMode]  =useState(false);
  const[paintCol,   setPaintCol]  =useState("#a78bfa");
  const[glass,      setGlass]     =useState(1.2);
  const[prism,      setPrism]     =useState(1.0);
  const[mag,        setMag]       =useState(1.2);
  const[recognised, setRecognised]=useState<string|null>(null);
  const[showHint,   setShowHint]  =useState(false);
  const[slowMode,   setSlowMode]  =useState(false);
  // ── draw mode indicator ──
  const[drawActive, setDrawActive]=useState(false);  // shows "✏️ drawing…" feedback

  // ── WebGL init ───────────────────────────────────────────────
  useEffect(()=>{
    const canvas=canvasRef.current!;
    const gl=canvas.getContext("webgl2",{antialias:false,alpha:false})!;
    if(!gl){console.error("No WebGL2");return;}
    glRef.current=gl;

    const W=window.innerWidth,H=window.innerHeight;
    canvas.width=W;canvas.height=H;
    if(overlayRef.current){overlayRef.current.width=W;overlayRef.current.height=H;}

    const pProg=mkProg(gl,VERT,PART_FRAG);
    partProgRef.current=pProg;
    ["uT","uPtrs","uForces","uPtrCount","uMode","uSpread","uTrail","uTrailLen","uEffect","uGlobalSpeed"]
      .forEach(n=>{pUni.current[n]=gl.getUniformLocation(pProg,n);});

    const cProg=mkProg(gl,QUAD_VERT,CAMERA_FRAG);
    camProgRef.current=cProg;
    ["uT","uPtrs","uPtrCount","uGlass","uPrism","uMag","uResolution","uCamera","uParticles"]
      .forEach(n=>{cUni.current[n]=gl.getUniformLocation(cProg,n);});
    gl.useProgram(cProg);
    gl.uniform1i(cUni.current["uCamera"]!,0);
    gl.uniform1i(cUni.current["uParticles"]!,1);

    pTexRef.current=mkTex(gl,W,H);
    const pFbo=gl.createFramebuffer()!;pFboRef.current=pFbo;
    gl.bindFramebuffer(gl.FRAMEBUFFER,pFbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,pTexRef.current,0);
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);

    const cTex=gl.createTexture()!;camTexRef.current=cTex;
    gl.bindTexture(gl.TEXTURE_2D,cTex);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([8,4,16,255]));
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);

    const qVao=gl.createVertexArray()!;quadVaoRef.current=qVao;
    gl.bindVertexArray(qVao);
    const qBuf=gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER,qBuf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    const uvLoc=gl.getAttribLocation(cProg,"aUV");
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc,2,gl.FLOAT,false,0,0);
    gl.bindVertexArray(null);

    const pos=new Float32Array(N*3),seed=new Float32Array(N);
    for(let i=0;i<N;i++){
      const th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1),r=4.5*Math.cbrt(Math.random());
      pos[i*3]=r*Math.sin(ph)*Math.cos(th);
      pos[i*3+1]=r*Math.sin(ph)*Math.sin(th);
      pos[i*3+2]=r*Math.cos(ph);
      seed[i]=Math.random();
    }
    const pVao=gl.createVertexArray()!;partVaoRef.current=pVao;
    gl.bindVertexArray(pVao);
    const posBuf=gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER,posBuf);
    gl.bufferData(gl.ARRAY_BUFFER,pos,gl.STATIC_DRAW);
    const posLoc=gl.getAttribLocation(pProg,"aPos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc,3,gl.FLOAT,false,0,0);
    const seedBuf=gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER,seedBuf);
    gl.bufferData(gl.ARRAY_BUFFER,seed,gl.STATIC_DRAW);
    const seedLoc=gl.getAttribLocation(pProg,"aSeed");
    gl.enableVertexAttribArray(seedLoc);
    gl.vertexAttribPointer(seedLoc,1,gl.FLOAT,false,0,0);
    gl.bindVertexArray(null);

    const resize=()=>{
      const W2=window.innerWidth,H2=window.innerHeight;
      canvas.width=W2;canvas.height=H2;
      if(overlayRef.current){overlayRef.current.width=W2;overlayRef.current.height=H2;}
      gl.bindTexture(gl.TEXTURE_2D,pTexRef.current);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,W2,H2,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
      gl.viewport(0,0,W2,H2);
    };
    window.addEventListener("resize",resize);

    const onMouse=(e:MouseEvent)=>{
      if(isDrawing.current||appModeRef.current==="camera")return;
      ptrsRef.current=[(e.clientX/window.innerWidth)*2-1,-((e.clientY/window.innerHeight)*2-1)];
      forcesRef.current=[0];
    };
    window.addEventListener("mousemove",onMouse);

    let start=performance.now(),frames=0,lastFps=0;
    const loop=()=>{
      rafRef.current=requestAnimationFrame(loop);
      const t=(performance.now()-start)/1000;
      frames++;if(t-lastFps>=1){setFps(frames);frames=0;lastFps=t;}

      const W2=canvas.width,H2=canvas.height;
      const ptrs=ptrsRef.current,forces=forcesRef.current;
      const pp=new Float32Array(20).fill(9),pf=new Float32Array(10).fill(0);
      const cnt=Math.min(ptrs.length/2,10);
      for(let i=0;i<cnt;i++){pp[i*2]=ptrs[i*2];pp[i*2+1]=ptrs[i*2+1];pf[i]=forces[i]??0;}
      const trail=trailRef.current;
      const pt=new Float32Array(256).fill(9);
      const tLen=Math.min(trail.length/2,128);
      for(let i=0;i<tLen;i++){pt[i*2]=trail[i*2];pt[i*2+1]=trail[i*2+1];}

      const isCam=appModeRef.current==="camera";

      if(isCam){
        const vid=videoRef.current;
        if(vid&&vid.readyState>=2&&camTexRef.current){
          gl.bindTexture(gl.TEXTURE_2D,camTexRef.current);
          gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,vid);
        }
      }

      const setPartUnis=()=>{
        gl.uniform1f(pUni.current["uT"]!,t);
        gl.uniform2fv(pUni.current["uPtrs"]!,pp);
        gl.uniform1fv(pUni.current["uForces"]!,pf);
        gl.uniform1i(pUni.current["uPtrCount"]!,cnt);
        gl.uniform1i(pUni.current["uMode"]!,modeRef.current);
        gl.uniform1f(pUni.current["uSpread"]!,spreadRef.current);
        gl.uniform1i(pUni.current["uEffect"]!,effectRef.current);
        gl.uniform2fv(pUni.current["uTrail"]!,pt);
        gl.uniform1i(pUni.current["uTrailLen"]!,tLen);
        gl.uniform1f(pUni.current["uGlobalSpeed"]!,globalSpeedRef.current);
      };

      gl.bindFramebuffer(gl.FRAMEBUFFER,pFboRef.current);
      gl.viewport(0,0,W2,H2);
      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
      gl.disable(gl.DEPTH_TEST);
      gl.useProgram(partProgRef.current);
      setPartUnis();
      gl.bindVertexArray(partVaoRef.current);
      gl.drawArrays(gl.POINTS,0,N);
      gl.bindVertexArray(null);

      gl.bindFramebuffer(gl.FRAMEBUFFER,null);
      gl.viewport(0,0,W2,H2);
      gl.disable(gl.BLEND);
      gl.clearColor(0,0,0,1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if(isCam){
        gl.useProgram(camProgRef.current);
        gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,camTexRef.current);
        gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,pTexRef.current);
        gl.uniform1f(cUni.current["uT"]!,t);
        gl.uniform2fv(cUni.current["uPtrs"]!,pp);
        gl.uniform1i(cUni.current["uPtrCount"]!,cnt);
        gl.uniform1f(cUni.current["uGlass"]!,glassRef.current);
        gl.uniform1f(cUni.current["uPrism"]!,prismRef.current);
        gl.uniform1f(cUni.current["uMag"]!,magRef.current);
        gl.uniform2f(cUni.current["uResolution"]!,W2,H2);
        gl.bindVertexArray(quadVaoRef.current);
        gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
        gl.bindVertexArray(null);
      } else {
        const bg=bgRef.current;
        gl.clearColor(bg[0],bg[1],bg[2],1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
        gl.useProgram(partProgRef.current);
        setPartUnis();
        gl.bindVertexArray(partVaoRef.current);
        gl.drawArrays(gl.POINTS,0,N);
        gl.bindVertexArray(null);
      }
    };
    loop();

    return()=>{
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",resize);
      window.removeEventListener("mousemove",onMouse);
    };
  },[]);

  // ── Camera + hand tracking ───────────────────────────────────
  const startCamera=useCallback(async()=>{
    setCamLoading(true);
    try{
      const stream=await navigator.mediaDevices.getUserMedia({
        video:{width:{ideal:1280},height:{ideal:720},facingMode:"user"}
      });
      camStreamRef.current=stream;
      const vid=videoRef.current!;
      vid.srcObject=stream;vid.autoplay=true;vid.muted=true;vid.playsInline=true;
      await vid.play();
      setCamReady(true);

      const{HandLandmarker,FilesetResolver}=await import("@mediapipe/tasks-vision");
      const vision=await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      const landmarker=await HandLandmarker.createFromOptions(vision,{
        baseOptions:{
          modelAssetPath:"https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate:"GPU",
        },
        runningMode:"VIDEO",numHands:2,
        minHandDetectionConfidence:0.5,
        minHandPresenceConfidence:0.5,
        minTrackingConfidence:0.5,
      });
      setTracking(true);setCamLoading(false);

      const dist=(a:{x:number,y:number},b:{x:number,y:number})=>Math.hypot(a.x-b.x,a.y-b.y);

      // ── count extended fingers (excluding thumb) ──────────────
      const countFingers=(lm:{x:number,y:number,z:number}[])=>{
        let c=0;
        // thumb: compare x position relative to hand base
        if(Math.abs(lm[4].x-lm[0].x)>Math.abs(lm[3].x-lm[0].x))c++;
        const tips=[8,12,16,20],pips=[6,10,14,18];
        for(let i=0;i<4;i++)if(lm[tips[i]].y<lm[pips[i]].y-0.02)c++;
        return c;
      };

      // ── is index finger clearly extended and isolated ─────────
      const isIndexPointing=(lm:{x:number,y:number,z:number}[])=>{
        const indexUp=lm[8].y < lm[6].y - 0.03;   // tip above pip
        const middleDown=lm[12].y > lm[10].y - 0.01; // middle not extended
        return indexUp && middleDown;
      };

      const getCtx=()=>overlayRef.current?.getContext("2d");

      // ── finish a hand-draw stroke ─────────────────────────────
      const finishHandStroke=()=>{
        if(!handDrawActive.current)return;
        handDrawActive.current=false;
        setDrawActive(false);
        const W=window.innerWidth,H=window.innerHeight;
        const shape=recogniseShape(handDrawPts.current);
        if(shape){
          setRecognised(shape);setTimeout(()=>setRecognised(null),2800);
          const pts=handDrawPts.current;
          const cx=pts.reduce((a,p)=>a+p.x,0)/pts.length;
          const cy=pts.reduce((a,p)=>a+p.y,0)/pts.length;
          trailRef.current=makeShapeTrail(shape,cx,cy,W,H);
          setTimeout(()=>{trailRef.current=[];},5000);
        } else {
          setTimeout(()=>{trailRef.current=[];},3500);
        }
        // fade the overlay
        const ctx=getCtx();
        if(ctx){
          let op=1;
          const fade=setInterval(()=>{
            op-=0.05;if(op<=0){clearInterval(fade);ctx.clearRect(0,0,9999,9999);return;}
            const d=ctx.getImageData(0,0,overlayRef.current!.width,overlayRef.current!.height);
            ctx.clearRect(0,0,9999,9999);ctx.globalAlpha=op;ctx.putImageData(d,0,0);ctx.globalAlpha=1;
          },40);
        }
        prevFingerUp.current=true;
        smoothedFinger.current={x:-1,y:-1};
      };

      let lastTime=-1;
      const detect=()=>{
        mpRafRef.current=requestAnimationFrame(detect);
        const vid2=videoRef.current;
        if(!vid2||vid2.readyState<2)return;
        const now=performance.now();
        if(vid2.currentTime===lastTime)return;
        lastTime=vid2.currentTime;
        let result;
        try{result=landmarker.detectForVideo(vid2,now);}catch{return;}

        const hands=result.landmarks??[];
        const newPtrs:number[]=[],newForces:number[]=[];
        let info="";

        for(let hi=0;hi<Math.min(hands.length,2);hi++){
          const lm=hands[hi];
          const fingers=countFingers(lm);
          const W=window.innerWidth,H=window.innerHeight;

          // ── DRAW MODE: index finger traces ───────────────────
          // Only activate drawing when drawMode is ON
          if(drawModeRef.current){
            const pointing=isIndexPointing(lm);
            const tip=lm[8]; // index finger tip — landmark 8

            if(pointing){
              // raw screen position (mirrored: flip x because camera is mirrored)
              const rawX=(1-tip.x)*W;
              const rawY=tip.y*H;

              // ── exponential smoothing for precision ───────────
              // LERP factor: 0.35 = smooth but responsive
              // Lower = smoother but more lag, Higher = more jitter
              const SMOOTH=0.35;
              if(smoothedFinger.current.x<0){
                // first frame: snap to position
                smoothedFinger.current={x:rawX,y:rawY};
              } else {
                smoothedFinger.current.x=smoothedFinger.current.x+(rawX-smoothedFinger.current.x)*SMOOTH;
                smoothedFinger.current.y=smoothedFinger.current.y+(rawY-smoothedFinger.current.y)*SMOOTH;
              }

              const sx=smoothedFinger.current.x;
              const sy=smoothedFinger.current.y;
              const nx=(sx/W)*2-1;
              const ny=-((sy/H)*2-1);

              // start new stroke
              if(prevFingerUp.current){
                prevFingerUp.current=false;
                handDrawActive.current=true;
                handDrawPts.current=[];
                trailRef.current=[];
                setDrawActive(true);
                const ctx=getCtx();
                if(ctx){
                  ctx.clearRect(0,0,W,H);
                  ctx.beginPath();
                  ctx.strokeStyle=paintColRef.current;
                  ctx.lineWidth=4;
                  ctx.lineCap="round";
                  ctx.lineJoin="round";
                  ctx.shadowColor=paintColRef.current;
                  ctx.shadowBlur=18;
                  ctx.moveTo(sx,sy);
                }
              } else {
                // continue stroke
                const ctx=getCtx();
                if(ctx){ctx.lineTo(sx,sy);ctx.stroke();}
              }

              handDrawPts.current.push({x:sx,y:sy});
              const tr=trailRef.current;
              tr.push(nx,ny);
              if(tr.length>256)tr.splice(0,2);
              trailRef.current=tr;

              // still register as a push pointer so particles react visually
              newPtrs.push(nx,ny);
              newForces.push(2); // paint force type
              info+=(hi>0?" | ":"")+"✏️ Drawing";

            } else if(!prevFingerUp.current){
              // finger lowered — end the stroke
              finishHandStroke();
            } else {
              prevFingerUp.current=true;
              // normal gesture control when not drawing
              const tipIdx=lm[8];
              newPtrs.push((1-tipIdx.x)*2-1,-(tipIdx.y*2-1));
              newForces.push(0);
              info+=(hi>0?" | ":"")+"☝️ Ready to draw";
            }

          } else {
            // ── NORMAL MODE: gestures only, no drawing ────────
            // Make sure any active drawing is ended
            if(handDrawActive.current) finishHandStroke();

            let forceType=0,label="☝️ Push";
            const isPinch=dist(lm[4],lm[8])<0.07;

            if(fingers>=5){
              forceType=0;label="💥 Explode";
              spreadRef.current=dist(lm[0],lm[12])*9;
            } else if(fingers===4){
              forceType=4;label="🎀 Ribbon";
              spreadRef.current=Math.max(0,spreadRef.current-0.06);
            } else if(fingers===3){
              forceType=1;label="🌀 Attract";
              spreadRef.current=Math.max(0,spreadRef.current-0.06);
            } else if(fingers===2){
              forceType=3;label="🌪️ Vortex";
              spreadRef.current=Math.max(0,spreadRef.current-0.06);
            } else if(fingers===0){
              forceType=Math.floor(performance.now()/2000)%2===0?5:6;
              label=forceType===5?"💎 Crystal":"🕳️ Black Hole";
              spreadRef.current=Math.max(0,spreadRef.current-0.06);
            } else {
              forceType=0;label="☝️ Push";
              spreadRef.current=Math.max(0,spreadRef.current-0.06);
            }

            const tipIdxs=[8,12,16,20,4];
            const numTips=Math.max(1,Math.min(fingers,5));
            for(let fi=0;fi<numTips;fi++){
              const ftip=lm[tipIdxs[fi]];
              newPtrs.push((1-ftip.x)*2-1,-(ftip.y*2-1));
              newForces.push(forceType);
            }
            const fe=fingers===0?"✊":fingers===1?"☝️":fingers===2?"✌️":fingers===3?"🤟":fingers===4?"🖖":"🖐️";
            info+=(hi>0?" | ":"")+`${fe} ${label}`;
          }
        }

        if(!hands.length){
          if(handDrawActive.current) finishHandStroke();
          ptrsRef.current=[];forcesRef.current=[];
          spreadRef.current=Math.max(0,spreadRef.current-0.08);
          setHandInfo("No hands");
        } else {
          ptrsRef.current=newPtrs;forcesRef.current=newForces;setHandInfo(info);
        }
      };
      detect();
    }catch(e:any){
      console.error(e);setCamLoading(false);setTracking(false);
      alert(`Camera error: ${e?.message||e}`);
    }
  },[]);

  const stopCamera=useCallback(()=>{
    cancelAnimationFrame(mpRafRef.current);
    camStreamRef.current?.getTracks().forEach(t=>t.stop());
    camStreamRef.current=null;
    if(videoRef.current)videoRef.current.srcObject=null;
    setTracking(false);setCamReady(false);
    ptrsRef.current=[];forcesRef.current=[];spreadRef.current=0;trailRef.current=[];
    handDrawActive.current=false;
    smoothedFinger.current={x:-1,y:-1};
    prevFingerUp.current=true;
    setHandInfo("");setDrawActive(false);
    const gl=glRef.current;
    if(gl&&camTexRef.current){
      gl.bindTexture(gl.TEXTURE_2D,camTexRef.current);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([8,4,16,255]));
    }
  },[]);

  const switchAppMode=(m:AppMode)=>{
    if(m==="particle"&&tracking)stopCamera();
    setAppMode(m);appModeRef.current=m;
    setEffect(0);effectRef.current=0;
    setDrawMode(false);drawModeRef.current=false;
    trailRef.current=[];ptrsRef.current=[];forcesRef.current=[];
  };

  // ── Toggle draw mode — updates both state and ref ────────────
  const toggleDrawMode=useCallback(()=>{
    setDrawMode(prev=>{
      const next=!prev;
      drawModeRef.current=next;
      if(next){
        setShowHint(true);
        setTimeout(()=>setShowHint(false),4000);
      } else {
        // turning off: end any active stroke
        if(handDrawActive.current){
          handDrawActive.current=false;
          setDrawActive(false);
          trailRef.current=[];
          smoothedFinger.current={x:-1,y:-1};
          prevFingerUp.current=true;
          const ctx=overlayRef.current?.getContext("2d");
          if(ctx)ctx.clearRect(0,0,overlayRef.current!.width,overlayRef.current!.height);
        }
      }
      return next;
    });
  },[]);

  // ── Mouse draw (pointer events on overlay when drawMode ON) ──
  const getOCtx=()=>overlayRef.current?.getContext("2d");

  const startDraw=useCallback((e:React.PointerEvent)=>{
    e.preventDefault();
    isDrawing.current=true;drawPts.current=[];trailRef.current=[];
    const ctx=getOCtx();if(!ctx)return;
    ctx.clearRect(0,0,9999,9999);ctx.beginPath();
    ctx.strokeStyle=paintColRef.current;ctx.lineWidth=4;
    ctx.lineCap="round";ctx.lineJoin="round";
    ctx.shadowColor=paintColRef.current;ctx.shadowBlur=18;
    ctx.moveTo(e.clientX,e.clientY);
    drawPts.current.push({x:e.clientX,y:e.clientY});
  },[]);

  const doDraw=useCallback((e:React.PointerEvent)=>{
    if(!isDrawing.current)return;
    e.preventDefault();
    const ctx=getOCtx();if(!ctx)return;
    ctx.lineTo(e.clientX,e.clientY);ctx.stroke();
    drawPts.current.push({x:e.clientX,y:e.clientY});
    const W=window.innerWidth,H=window.innerHeight;
    const tr=trailRef.current;
    tr.push((e.clientX/W)*2-1,-((e.clientY/H)*2-1));
    if(tr.length>256)tr.splice(0,2);
    trailRef.current=tr;
  },[]);

  const endDraw=useCallback(()=>{
    if(!isDrawing.current)return;
    isDrawing.current=false;
    const W=window.innerWidth,H=window.innerHeight;
    const shape=recogniseShape(drawPts.current);
    if(shape){
      setRecognised(shape);setTimeout(()=>setRecognised(null),2800);
      const pts=drawPts.current;
      const cx=pts.reduce((a,p)=>a+p.x,0)/pts.length;
      const cy=pts.reduce((a,p)=>a+p.y,0)/pts.length;
      trailRef.current=makeShapeTrail(shape,cx,cy,W,H);
      setTimeout(()=>{trailRef.current=[];},5000);
    } else setTimeout(()=>{trailRef.current=[];},3500);
    const ctx=getOCtx();if(!ctx)return;
    let op=1;
    const fade=setInterval(()=>{
      op-=0.04;if(op<=0){clearInterval(fade);ctx.clearRect(0,0,9999,9999);return;}
      const d=ctx.getImageData(0,0,overlayRef.current!.width,overlayRef.current!.height);
      ctx.clearRect(0,0,9999,9999);ctx.globalAlpha=op;ctx.putImageData(d,0,0);ctx.globalAlpha=1;
    },40);
  },[]);

  const changeMode=(m:number)=>{setMode(m);modeRef.current=m;bgRef.current=MODES[m].bg;};

  const setCamEffect=(i:number)=>{
    setEffect(i);effectRef.current=i;
    const presets=[[1.8,0.2,0.2],[0.3,2.2,0.2],[0.3,0.3,2.5],[1.4,1.4,1.4]];
    const[g,pr,mg]=presets[i];
    glassRef.current=g;prismRef.current=pr;magRef.current=mg;
    setGlass(g);setPrism(pr);setMag(mg);
  };

  const panel:React.CSSProperties={
    background:"rgba(6,3,16,0.85)",backdropFilter:"blur(18px)",
    borderRadius:18,padding:"12px 10px",display:"flex",flexDirection:"column",gap:6,
    border:"1px solid rgba(120,100,200,0.18)",
  };
  const lbl:React.CSSProperties={
    fontSize:8,letterSpacing:".28em",textTransform:"uppercase",
    textAlign:"center",fontWeight:700,marginBottom:1,
  };
  const btn=(active:boolean,activeCol="rgba(139,92,246,0.28)",activeBorder="rgba(139,92,246,0.55)"):React.CSSProperties=>({
    padding:"5px 9px",borderRadius:9,fontSize:10,fontWeight:600,cursor:"pointer",
    border:active?`1px solid ${activeBorder}`:"1px solid rgba(255,255,255,0.05)",
    background:active?activeCol:"transparent",
    color:active?"#e2d9ff":"#475569",transition:"all .2s",whiteSpace:"nowrap" as const,
  });

  const isParticle=appMode==="particle";

  return(
    <div style={{position:"relative",width:"100%",height:"100svh",overflow:"hidden",background:"#06030f"}}>
      <video ref={videoRef} style={{position:"absolute",top:-9999,left:-9999,width:1,height:1}} playsInline muted/>
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,display:"block"}}/>

      {/* Drawing overlay */}
      <canvas ref={overlayRef} style={{
        position:"absolute",inset:0,display:"block",
        cursor:drawMode?"crosshair":"default",
        pointerEvents:drawMode?"all":"none",
      }}
        onPointerDown={drawMode?startDraw:undefined}
        onPointerMove={drawMode?doDraw:undefined}
        onPointerUp={drawMode?endDraw:undefined}
      />

      {/* ── MODE SWITCHER ── */}
      <div style={{
        position:"absolute",top:20,left:"50%",transform:"translateX(-50%)",
        zIndex:20,display:"flex",
        background:"rgba(6,3,16,0.92)",backdropFilter:"blur(16px)",
        borderRadius:999,border:"1px solid rgba(120,100,200,0.22)",overflow:"hidden",
      }}>
        {([{id:"particle" as AppMode,label:"✨ Particles"},{id:"camera" as AppMode,label:"🪞 Mirror Room"}]).map(m=>(
          <button key={m.id} onClick={()=>switchAppMode(m.id)} style={{
            padding:"9px 24px",fontSize:12,fontWeight:700,cursor:"pointer",border:"none",
            background:appMode===m.id
              ?"linear-gradient(135deg,rgba(139,92,246,0.5),rgba(236,72,153,0.38))"
              :"transparent",
            color:appMode===m.id?"#fff":"#475569",transition:"all .25s",
          }}>{m.label}</button>
        ))}
      </div>

      {/* ── Shape toast ── */}
      {recognised&&(
        <div style={{
          position:"absolute",top:"44%",left:"50%",transform:"translate(-50%,-50%)",
          zIndex:30,pointerEvents:"none",padding:"18px 36px",borderRadius:22,
          background:"rgba(6,3,16,0.97)",backdropFilter:"blur(20px)",
          border:"1px solid rgba(139,92,246,0.42)",
          boxShadow:"0 0 48px rgba(139,92,246,0.22)",textAlign:"center",
        }}>
          <div style={{fontSize:40,marginBottom:8}}>
            {recognised==="circle"?"⭕":recognised==="heart"?"❤️":recognised==="star"?"⭐":recognised==="wave"?"〰️":"♾️"}
          </div>
          <div style={{fontSize:16,fontWeight:800,background:"linear-gradient(135deg,#a78bfa,#f472b6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            {recognised.charAt(0).toUpperCase()+recognised.slice(1)} detected
          </div>
          <div style={{fontSize:10,color:"#475569",marginTop:4}}>Particles forming shape…</div>
        </div>
      )}

      {/* ── Draw active indicator ── */}
      {drawActive&&(
        <div style={{
          position:"absolute",top:70,left:"50%",transform:"translateX(-50%)",
          zIndex:15,pointerEvents:"none",padding:"6px 18px",borderRadius:20,
          background:"rgba(52,211,153,0.15)",
          border:"1px solid rgba(52,211,153,0.4)",
          display:"flex",alignItems:"center",gap:8,
        }}>
          <span style={{
            width:6,height:6,borderRadius:"50%",background:"#4ade80",
            boxShadow:"0 0 8px #4ade80",display:"inline-block",
          }}/>
          <span style={{fontSize:10,color:"#6ee7b7",letterSpacing:".1em"}}>Drawing with index finger…</span>
        </div>
      )}

      {/* ── Title ── */}
      <div style={{position:"absolute",top:72,left:22,zIndex:10,pointerEvents:"none"}}>
        <p style={{margin:"0 0 2px",fontSize:9,letterSpacing:".38em",textTransform:"uppercase",color:"#8b5cf6",fontWeight:600}}>
          {isParticle?"Particle Field":"Mirror Room"}
        </p>
        <h1 style={{
          margin:0,fontWeight:900,fontSize:"clamp(1.4rem,3vw,2.4rem)",lineHeight:1.1,
          background:isParticle
            ?"linear-gradient(135deg,#34d399,#60a5fa,#a78bfa,#f472b6)"
            :"linear-gradient(135deg,#94a3b8,#cbd5e1,#a78bfa,#818cf8)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
        }}>8D Space</h1>
        <p style={{margin:"3px 0 0",fontSize:9,color:"#334155"}}>
          {isParticle
            ?`${N.toLocaleString()} curl-noise particles · WebGL2`
            :camReady?"📷 Camera live · Glass · Prism · Magnify":"🪞 Enable camera to begin"}
        </p>
      </div>

      {/* ── Stats ── */}
      <div style={{position:"absolute",top:72,right:22,zIndex:10,pointerEvents:"none",textAlign:"right"}}>
        <div style={{fontSize:11,color:"#4c1d95",fontVariantNumeric:"tabular-nums"}}>{fps} fps</div>
        <div style={{fontSize:10,marginTop:2,color:tracking?"#34d399":"#475569"}}>
          {tracking?"✋ tracking":"🖱️ mouse"}
        </div>
        {drawMode&&<div style={{fontSize:9,color:"#34d399",marginTop:1}}>✏️ draw mode ON</div>}
        {slowMode&&<div style={{fontSize:9,color:"#a78bfa",marginTop:1}}>🐌 slow mode</div>}
        {handInfo&&<div style={{fontSize:10,color:"#a78bfa",marginTop:2,maxWidth:200}}>{handInfo}</div>}
      </div>

      {/* ── LEFT PANEL ── */}
      <div style={{
        position:"absolute",top:"50%",left:14,transform:"translateY(-50%)",
        zIndex:10,display:"flex",flexDirection:"column",gap:8,
        maxHeight:"90vh",overflowY:"auto",
      }}>

        {isParticle&&(<>
          <div style={panel}>
            <p style={{...lbl,color:"#a78bfa"}}>Palette</p>
            {MODES.map((m,i)=>(
              <button key={i} onClick={()=>changeMode(i)} style={btn(mode===i)}>{m.name}</button>
            ))}
          </div>

          <div style={panel}>
            <p style={{...lbl,color:"#60a5fa"}}>Field</p>
            {EFFECTS_PARTICLE.map((ef,i)=>(
              <button key={i} onClick={()=>{setEffect(i);effectRef.current=i;}}
                style={btn(effect===i,"rgba(96,165,250,0.22)","rgba(96,165,250,0.55)")}>
                {ef}
              </button>
            ))}
            <div style={{marginTop:4,borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:6}}>
              <button onClick={()=>{
                const next=!slowMode;setSlowMode(next);globalSpeedRef.current=next?0.0:1.0;
              }} style={btn(slowMode,"rgba(167,139,250,0.22)","rgba(167,139,250,0.55)")}>
                {slowMode?"🐌 Slow ON":"🐌 Slow mode"}
              </button>
            </div>
          </div>

          {/* ── DRAW PANEL — explicit toggle ── */}
          <div style={{
            ...panel,
            border:`1px solid ${drawMode?"rgba(52,211,153,0.45)":"rgba(120,100,200,0.18)"}`,
            background:drawMode?"rgba(6,20,14,0.9)":"rgba(6,3,16,0.85)",
          }}>
            <p style={{...lbl,color:drawMode?"#34d399":"#94a3b8"}}>✏️ Draw Mode</p>

            {/* Big toggle button */}
            <button onClick={toggleDrawMode} style={{
              padding:"8px 10px",borderRadius:10,fontSize:11,fontWeight:700,cursor:"pointer",
              border:drawMode?"1px solid rgba(52,211,153,0.6)":"1px solid rgba(255,255,255,0.08)",
              background:drawMode
                ?"linear-gradient(135deg,rgba(52,211,153,0.25),rgba(16,185,129,0.15))"
                :"rgba(255,255,255,0.03)",
              color:drawMode?"#6ee7b7":"#475569",
              transition:"all .25s",
              display:"flex",alignItems:"center",justifyContent:"center",gap:6,
            }}>
              <span style={{
                width:8,height:8,borderRadius:"50%",
                background:drawMode?"#4ade80":"#334155",
                boxShadow:drawMode?"0 0 8px #4ade80":"none",
                transition:"all .25s",
              }}/>
              {drawMode?"Drawing ON — tap to stop":"Enable Drawing"}
            </button>

            {drawMode&&(
              <>
                {/* Instruction */}
                <div style={{
                  fontSize:9,color:"#475569",lineHeight:1.6,
                  padding:"6px 4px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:2,
                }}>
                  {tracking
                    ?"☝️ Point index finger to draw\nOther gestures still work"
                    :"🖱️ Click + drag on screen to draw"}
                </div>

                {/* Color swatches */}
                <div>
                  <p style={{...lbl,color:"#64748b",marginBottom:4}}>Color</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center"}}>
                    {["#f472b6","#a78bfa","#60a5fa","#34d399","#fbbf24","#fb923c","#e2e8f0"].map(c=>(
                      <button key={c} onClick={()=>{setPaintCol(c);paintColRef.current=c;}} style={{
                        width:20,height:20,borderRadius:"50%",background:c,padding:0,cursor:"pointer",
                        border:paintCol===c?"2.5px solid white":"2px solid rgba(255,255,255,0.15)",
                        boxShadow:paintCol===c?`0 0 8px ${c}`:"none",
                        transition:"all .2s",
                      }}/>
                    ))}
                  </div>
                </div>

                {/* Clear button */}
                <button onClick={()=>{
                  trailRef.current=[];
                  const ctx=overlayRef.current?.getContext("2d");
                  if(ctx)ctx.clearRect(0,0,overlayRef.current!.width,overlayRef.current!.height);
                }} style={{
                  ...btn(false),fontSize:9,color:"#ef4444",
                  border:"1px solid rgba(239,68,68,0.2)",
                }}>
                  🗑 Clear canvas
                </button>
              </>
            )}
          </div>

          {/* Gesture legend — only shown when NOT in draw mode */}
          {!drawMode&&(
            <div style={panel}>
              <p style={{...lbl,color:"#8b5cf6"}}>Gestures</p>
              {[
                ["✊","Fist","Crystal / Black Hole"],
                ["☝️","1 finger","Push"],
                ["✌️","2 fingers","Vortex"],
                ["🤟","3 fingers","Attract"],
                ["🖖","4 fingers","Ribbon swirl"],
                ["🖐️","Open palm","Explosion"],
              ].map(([e,f,l])=>(
                <div key={l} style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontSize:13}}>{e}</span>
                  <div>
                    <div style={{fontSize:9,color:"#6d28d9",lineHeight:1.2}}>{f}</div>
                    <div style={{fontSize:9,color:"#334155"}}>{l}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Draw mode gesture hint */}
          {drawMode&&tracking&&(
            <div style={panel}>
              <p style={{...lbl,color:"#34d399"}}>Draw gestures</p>
              {[
                ["☝️","Index up","Draw — traces finger path"],
                ["✊/✌️","Others","Force gestures still active"],
                ["—","Finger down","Lifts pen / ends stroke"],
              ].map(([e,f,l])=>(
                <div key={l} style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontSize:13}}>{e}</span>
                  <div>
                    <div style={{fontSize:9,color:"#34d399",lineHeight:1.2}}>{f}</div>
                    <div style={{fontSize:9,color:"#334155"}}>{l}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>)}

        {!isParticle&&(<>
          <div style={panel}>
            <p style={{...lbl,color:"#94a3b8"}}>Lens Preset</p>
            {EFFECTS_CAMERA.map((ef,i)=>(
              <button key={i} onClick={()=>setCamEffect(i)}
                style={btn(effect===i,"rgba(148,163,184,0.18)","rgba(148,163,184,0.55)")}>
                {ef}
              </button>
            ))}
          </div>

          <div style={panel}>
            <p style={{...lbl,color:"#94a3b8"}}>Fine Tune</p>
            {([
              {label:"🔮 Glass",col:"#818cf8",val:glass, set:(v:number)=>{setGlass(v);glassRef.current=v;}},
              {label:"💎 Prism", col:"#c4b5fd",val:prism, set:(v:number)=>{setPrism(v);prismRef.current=v;}},
              {label:"🔍 Lens",  col:"#7dd3fc",val:mag,   set:(v:number)=>{setMag(v);magRef.current=v;}},
            ] as const).map((s,i)=>(
              <div key={i}>
                <label style={{fontSize:9,color:s.col,display:"block",marginBottom:2}}>{s.label} {s.val.toFixed(1)}</label>
                <input type="range" min={0} max={3} step={0.1} value={s.val}
                  onChange={e=>s.set(+e.target.value)}
                  style={{width:"100%",accentColor:s.col,cursor:"pointer"}}/>
              </div>
            ))}
          </div>

          {/* Draw in camera mode */}
          <div style={{
            ...panel,
            border:`1px solid ${drawMode?"rgba(52,211,153,0.45)":"rgba(120,100,200,0.18)"}`,
          }}>
            <p style={{...lbl,color:drawMode?"#34d399":"#94a3b8"}}>✏️ Draw Mode</p>
            <button onClick={toggleDrawMode} style={{
              padding:"8px 10px",borderRadius:10,fontSize:11,fontWeight:700,cursor:"pointer",
              border:drawMode?"1px solid rgba(52,211,153,0.6)":"1px solid rgba(255,255,255,0.08)",
              background:drawMode?"rgba(52,211,153,0.2)":"rgba(255,255,255,0.03)",
              color:drawMode?"#6ee7b7":"#475569",
              display:"flex",alignItems:"center",justifyContent:"center",gap:6,
            }}>
              <span style={{width:8,height:8,borderRadius:"50%",background:drawMode?"#4ade80":"#334155",boxShadow:drawMode?"0 0 8px #4ade80":"none"}}/>
              {drawMode?"Drawing ON — tap to stop":"Enable Drawing"}
            </button>
            {drawMode&&(
              <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginTop:4}}>
                {["#f472b6","#a78bfa","#60a5fa","#34d399","#fbbf24","#e2e8f0"].map(c=>(
                  <button key={c} onClick={()=>{setPaintCol(c);paintColRef.current=c;}} style={{
                    width:20,height:20,borderRadius:"50%",background:c,padding:0,cursor:"pointer",
                    border:paintCol===c?"2.5px solid white":"2px solid rgba(255,255,255,0.15)",
                  }}/>
                ))}
              </div>
            )}
          </div>
        </>)}
      </div>

      {/* ── Draw hint toast ── */}
      {showHint&&(
        <div style={{
          position:"absolute",top:"26%",left:"50%",transform:"translateX(-50%)",
          zIndex:15,pointerEvents:"none",padding:"14px 24px",borderRadius:18,
          background:"rgba(6,3,16,0.94)",backdropFilter:"blur(14px)",
          border:"1px solid rgba(52,211,153,0.3)",textAlign:"center",
        }}>
          <div style={{fontSize:13,color:"#6ee7b7",fontWeight:700,marginBottom:6}}>
            {tracking?"☝️ Point your index finger to draw":"🖱️ Click and drag to draw"}
          </div>
          <div style={{fontSize:10,color:"#475569"}}>Shapes: Circle · Heart · Star · Wave · ∞</div>
          <div style={{fontSize:10,color:"#334155",marginTop:3}}>
            {tracking?"Other gestures still sculpt particles while drawing mode is on":"Particles will snap to recognised shapes"}
          </div>
        </div>
      )}

      {/* ── Bottom camera button ── */}
      <div style={{
        position:"absolute",bottom:22,left:"50%",transform:"translateX(-50%)",
        zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:8,
      }}>
        {tracking&&!drawMode&&(
          <div style={{
            display:"flex",gap:10,padding:"5px 16px",borderRadius:999,
            background:"rgba(6,3,16,0.82)",backdropFilter:"blur(10px)",
            border:"1px solid rgba(120,100,200,0.15)",fontSize:10,color:"#64748b",
          }}>
            <span>✊ Crystal/BH</span>
            <span>☝️ Push</span>
            <span>✌️ Vortex</span>
            <span>🤟 Attract</span>
            <span>🖖 Ribbon</span>
            <span>🖐️ Explode</span>
          </div>
        )}
        {tracking&&drawMode&&(
          <div style={{
            padding:"5px 16px",borderRadius:999,
            background:"rgba(6,20,14,0.88)",backdropFilter:"blur(10px)",
            border:"1px solid rgba(52,211,153,0.2)",fontSize:10,color:"#34d399",
          }}>
            ☝️ Index finger = draw &nbsp;·&nbsp; Other gestures still active
          </div>
        )}
        {!tracking?(
          <button onClick={startCamera} disabled={camLoading} style={{
            display:"flex",alignItems:"center",gap:9,padding:"11px 26px",
            borderRadius:999,fontSize:13,fontWeight:700,cursor:"pointer",
            border:"1px solid rgba(120,100,200,0.38)",
            background:"rgba(6,3,16,0.92)",backdropFilter:"blur(14px)",
            color:"#a78bfa",opacity:camLoading?.5:1,
            boxShadow:"0 0 22px rgba(139,92,246,0.15)",
          }}>
            <span style={{
              width:7,height:7,borderRadius:"50%",flexShrink:0,
              background:camLoading?"#fbbf24":"#374151",
              boxShadow:camLoading?"0 0 10px #fbbf24":"none",
            }}/>
            {camLoading?"Loading MediaPipe…":"📷 Enable camera + hand tracking"}
          </button>
        ):(
          <button onClick={stopCamera} style={{
            display:"flex",alignItems:"center",gap:9,padding:"11px 26px",
            borderRadius:999,fontSize:13,fontWeight:700,cursor:"pointer",
            border:"1px solid rgba(248,113,113,0.3)",
            background:"rgba(6,3,16,0.92)",backdropFilter:"blur(14px)",color:"#f87171",
          }}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 10px #4ade80"}}/>
            Turn off camera
          </button>
        )}
      </div>

      {/* ── Welcome ── */}
      {showGuide&&(
        <div style={{
          position:"absolute",inset:0,zIndex:20,
          display:"flex",alignItems:"center",justifyContent:"center",
          background:"rgba(3,1,10,0.96)",backdropFilter:"blur(18px)",
        }}>
          <div style={{
            maxWidth:560,margin:"0 20px",padding:46,borderRadius:32,
            background:"rgba(8,4,20,0.99)",textAlign:"center",
            border:"1px solid rgba(120,100,200,0.2)",
            boxShadow:"0 0 100px rgba(139,92,246,0.1)",
          }}>
            <div style={{fontSize:50,marginBottom:14}}>✨</div>
            <h2 style={{
              margin:"0 0 8px",fontSize:26,fontWeight:900,
              background:"linear-gradient(135deg,#34d399,#818cf8,#f472b6)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            }}>8D Space</h2>
            <p style={{margin:"0 0 6px",fontSize:12,color:"#475569",fontWeight:600,letterSpacing:".15em",textTransform:"uppercase"}}>
              Two worlds. One canvas.
            </p>
            <p style={{margin:"0 0 24px",fontSize:13,color:"#64748b",lineHeight:1.9}}>
              <strong style={{color:"#a78bfa"}}>Particle Field</strong> — 200k curl-noise particles sculpted by hand gestures.<br/>
              <strong style={{color:"#94a3b8"}}>Mirror Room</strong> — live camera with glass, prism &amp; viscous liquid distortion.
            </p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:28,textAlign:"left"}}>
              {[
                ["✊ Fist","Crystal lattice / Black hole"],
                ["☝️ 1 finger","Push particles"],
                ["✌️ 2 fingers","Vortex spin"],
                ["🤟 3 fingers","Attract pull"],
                ["🖖 4 fingers","Ribbon figure-8"],
                ["🖐️ Open palm","Explosion"],
                ["✏️ Draw Mode","Enable in panel → index finger draws"],
                ["🐌 Slow mode","Everything ultra-slow"],
                ["🔮 Glass","Lens warp on camera"],
                ["💎 Prism","Silver chromatic split"],
                ["🔍 Magnify","Circular bubble lens"],
                ["🌊 Liquid","Viscous fluid warp"],
              ].map(([k,v])=>(
                <div key={k} style={{padding:"7px 11px",borderRadius:11,background:"rgba(120,100,200,0.06)",border:"1px solid rgba(120,100,200,0.11)"}}>
                  <div style={{fontSize:11,color:"#c4b5fd",fontWeight:700}}>{k}</div>
                  <div style={{fontSize:10,color:"#334155"}}>{v}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>setShowGuide(false)} style={{
              width:"100%",padding:"14px 0",borderRadius:18,fontSize:16,
              fontWeight:800,color:"#fff",border:"none",cursor:"pointer",
              background:"linear-gradient(135deg,#34d399 0%,#818cf8 50%,#ec4899 100%)",
              boxShadow:"0 4px 32px rgba(139,92,246,0.35)",
            }}>Enter the Space ✨</button>
          </div>
        </div>
      )}
    </div>
  );
}