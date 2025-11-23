"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* -------------------------
   SIMPLE 1D FALLING DISK SIM
   ------------------------- */

const g = 9.81;
const rho = 1.225; // air density

export default function ResearchPage() {
  /* -------- Simulation states -------- */
  const [mass, setMass] = useState(0.05);
  const [radius, setRadius] = useState(0.03);
  const [Cd, setCd] = useState(1.2);
  const [height0, setHeight0] = useState(1.2);
  const [running, setRunning] = useState(false);
  const [timeSeries, setTimeSeries] = useState<{ t: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  /* Use refs for animation variables */
  const yRef = useRef(height0);
  const vRef = useRef(0);

  /* ------ Simulation Engine ------- */
  function runSimulation(dt = 0.002, tMax = 2.5) {
    const A = Math.PI * radius * radius;
    let t = 0;
    let y = height0;
    let v = 0;

    const series = [{ t, y }];

    while (t < tMax && y > 0) {
      const drag = 0.5 * rho * Cd * A * v * Math.abs(v);
      const a = (mass * g - drag) / mass;
      v += a * dt;
      y -= v * dt;

      if (y < 0) y = 0;

      t += dt;
      if (t - series[series.length - 1].t >= 0.01) {
        series.push({ t, y });
      }
    }

    return series;
  }

  /* ------ Canvas Drawing ------ */
  function draw(series: { t: number; y: number }[]) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "#e5e7eb";
    for (let i = 0; i <= 6; i++) {
      const y = (i / 6) * H;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const maxH = Math.max(height0, series[0]?.y || height0);
    const latest = series[series.length - 1];
    const px = W / 2;

    const mapY = (h: number) => {
      const margin = 12;
      return margin + (1 - h / maxH) * (H - margin * 2);
    };

    // HEIGHT vs TIME curve
    ctx.beginPath();
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = 2;

    const tMax = latest?.t || 1;
    series.forEach((p, i) => {
      const x = 10 + (p.t / tMax) * (W - 20);
      const y = 10 + (1 - p.y / maxH) * (H - 20);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Disk
    if (latest) {
      const cy = mapY(latest.y);
      ctx.beginPath();
      ctx.fillStyle = "#ffd6e0";
      ctx.strokeStyle = "#ef7bbf";
      ctx.lineWidth = 2;
      ctx.ellipse(px, cy, 18, 10, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    // Labels
    ctx.fillStyle = "#333";
    ctx.font = "12px Inter";
    ctx.fillText(`t = ${latest?.t.toFixed(2) || 0}s`, 12, 16);
    ctx.fillText(`y = ${latest?.y.toFixed(2) || 0}m`, 12, 32);
  }

  /* ------ Animation ------ */
  useEffect(() => {
    if (!running) return;

    // Initialize animation variables
    yRef.current = height0;
    vRef.current = 0;
    let t = 0;
    const dt = 0.01;
    const A = Math.PI * radius * radius;
    const series = [{ t, y: yRef.current }];

    function step() {
      if (yRef.current <= 0) {
        setRunning(false);
        draw(series);
        return;
      }

      const drag = 0.5 * rho * Cd * A * vRef.current * Math.abs(vRef.current);
      const a = (mass * g - drag) / mass;
      vRef.current += a * dt;
      yRef.current -= vRef.current * dt;
      if (yRef.current < 0) yRef.current = 0;
      t += dt;

      series.push({ t, y: yRef.current });
      draw(series);

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, mass, radius, Cd, height0]);

  // Redraw preview when parameters change
  useEffect(() => {
    if (running) return;
    const s = runSimulation();
    setTimeSeries(s);
    draw(s);
  }, [mass, radius, Cd, height0, running]);

  /* ------------------------------------
     FULL PAGE UI
     ------------------------------------ */

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-[#fff7fb] via-[#f2edff] to-[#e8f6ff] text-gray-900">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Numerical & Experimental Study of 1D Falling Disks
        </h1>
        <p className="mt-3 text-lg max-w-3xl text-gray-700">
          MATLAB ode45 simulations + PASCO experimental automation. Presented at the Maryland 
          Collegiate STEM Conference (2025).
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN – SUMMARY */}
        <div className="bg-white/60 border rounded-2xl p-6 shadow backdrop-blur">
          <h2 className="text-2xl font-semibold mb-3">Summary</h2>
          <p className="text-gray-700 mb-4">
            Ran 100+ high-accuracy time-of-flight trials using PASCO sensors and developed a 
            calibrated MATLAB numerical model with &lt;5% simulation error and 99% timing accuracy.
          </p>

          <h3 className="mt-4 font-medium">Tech Used</h3>
          <ul className="list-disc ml-5 text-gray-700 mt-2">
            <li>MATLAB (ode45)</li>
            <li>PASCO Capstone sensor automation</li>
            <li>Data analysis: Excel + Python</li>
            <li>Next.js interactive visualization</li>
          </ul>

          <h3 className="mt-4 font-medium">Key Results</h3>
          <ul className="list-disc ml-5 text-gray-700 mt-2">
            <li>99% timing accuracy</li>
            <li>6–11% slowdown from drag</li>
            <li>&lt;5% model–experiment error</li>
          </ul>
        </div>

        {/* MIDDLE COLUMN – INTERACTIVE SIM */}
        <div className="bg-white/60 border rounded-2xl p-6 shadow backdrop-blur">
          <h2 className="text-2xl font-semibold mb-3">Interactive Simulation</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Mass */}
            <div>
              <label className="text-sm">Mass (kg)</label>
              <input type="range" min={0.01} max={0.3} step={0.01}
                value={mass} onChange={(e) => setMass(+e.target.value)}
                className="w-full" />
              <div className="text-xs">{mass.toFixed(2)} kg</div>
            </div>

            {/* Radius */}
            <div>
              <label className="text-sm">Radius (m)</label>
              <input type="range" min={0.01} max={0.08} step={0.005}
                value={radius} onChange={(e) => setRadius(+e.target.value)}
                className="w-full" />
              <div className="text-xs">{radius.toFixed(3)} m</div>
            </div>

            {/* Cd */}
            <div>
              <label className="text-sm">Drag Coefficient</label>
              <input type="range" min={0.3} max={2} step={0.05}
                value={Cd} onChange={(e) => setCd(+e.target.value)}
                className="w-full" />
              <div className="text-xs">{Cd.toFixed(2)}</div>
            </div>

            {/* Height */}
            <div>
              <label className="text-sm">Initial Height</label>
              <input type="range" min={0.2} max={3} step={0.1}
                value={height0} onChange={(e) => setHeight0(+e.target.value)}
                className="w-full" />
              <div className="text-xs">{height0.toFixed(2)} m</div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button 
              onClick={() => setRunning(true)}
              disabled={running}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
            >
              Drop
            </button>
          </div>

          <canvas
            ref={canvasRef}
            width={640}
            height={320}
            className="w-full border rounded-lg mt-4"
          />
        </div>

        {/* RIGHT COLUMN – EXPERIMENT IMAGE */}
        <div className="bg-white/60 border rounded-2xl p-6 shadow backdrop-blur">
          <h2 className="text-2xl font-semibold mb-3">Experimental Data</h2>
          <p className="text-sm text-gray-600 mb-4">
            Collected with PASCO Capstone automated system — includes lag correction and 
            nonlinear drag calibration.
          </p>

          <img
            src="/images/Phy_Data.png"
            className="w-full rounded-xl border shadow"
            alt="Experimental data charts"
          />
        </div>
      </div>
    </div>
  );
}
