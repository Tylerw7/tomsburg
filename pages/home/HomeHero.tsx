"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MdSecurity, MdVerifiedUser, MdSupportAgent } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import { TbCameraPlus } from "react-icons/tb";
import { RiShieldCheckLine } from "react-icons/ri";

// ─── Palette: Secure Light ───────────────────────────────────────────────────
// #F4F5F7 — Off White
// #FFFFFF — Pure White
// #1C1C1F — Near Black
// #D92B2B — Brand Red
// #6B7280 — Slate Grey
// ─────────────────────────────────────────────────────────────────────────────

// Animated scanning line on a mock camera feed card
function CameraFeedCard({
  label,
  location,
  delay,
}: {
  label: string;
  location: string;
  delay: string;
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden bg-[#1C1C1F] border border-white/10 shadow-xl"
      style={{
        animation: `fadeSlideUp 0.7s ease forwards`,
        animationDelay: delay,
        opacity: 0,
      }}
    >
      {/* Camera grid overlay */}
      <div
        className="w-full h-full absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(217,43,43,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,43,43,0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Fake video feed — gradient blocks simulating a dark scene */}
      <div className="relative h-28 bg-gradient-to-br from-[#23272e] via-[#1a1d22] to-[#0f1114]">
        {/* Simulated scene shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111] to-transparent" />
        <div className="absolute bottom-4 left-4 w-16 h-8 rounded bg-[#2a2e35] opacity-60" />
        <div className="absolute bottom-4 right-8 w-8 h-12 rounded bg-[#2a2e35] opacity-40" />
        <div className="absolute bottom-4 left-24 w-24 h-6 rounded bg-[#2a2e35] opacity-30" />

        {/* Scanning line */}
        <div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D92B2B] to-transparent opacity-80"
          style={{ animation: "scanLine 3s linear infinite", animationDelay: delay }}
        />

        {/* REC indicator */}
        <div className="absolute top-2 left-3 flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-[#D92B2B]"
            style={{ animation: "blink 1.2s ease-in-out infinite" }}
          />
          <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">
            REC
          </span>
        </div>

        {/* Timestamp */}
        <div className="absolute top-2 right-3 text-white/50 text-[10px] font-mono">
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Card footer */}
      <div className="px-3 py-2 flex items-center justify-between">
        <div>
          <p className="text-white text-xs font-bold tracking-wide">{label}</p>
          <p className="text-white/40 text-[10px] tracking-wide">{location}</p>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
      </div>
    </div>
  );
}

// Trust badge pill
function TrustBadge({
  icon,
  text,
  delay,
}: {
  icon: React.ReactNode;
  text: string;
  delay: string;
}) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E7EB] shadow-sm text-[#1C1C1F] text-sm font-semibold"
      style={{
        animation: `fadeSlideUp 0.6s ease forwards`,
        animationDelay: delay,
        opacity: 0,
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      <span className="text-[#D92B2B]">{icon}</span>
      {text}
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animated dot-grid particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLS = 18;
    const ROWS = 10;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cw = canvas.width / COLS;
      const ch = canvas.height / ROWS;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = c * cw + cw / 2;
          const y = r * ch + ch / 2;
          const wave = Math.sin(t * 0.02 + c * 0.4 + r * 0.6);
          const alpha = 0.08 + wave * 0.06;
          const scale = 0.8 + wave * 0.3;
          ctx.beginPath();
          ctx.arc(x, y, scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(217, 43, 43, ${Math.max(0.03, alpha)})`;
          ctx.fill();
        }
      }
      t++;
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  return (
    <>
      {/* Global keyframe styles */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanLine {
          0%   { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .hero-headline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.01em;
        }
        .text-shimmer {
          background: linear-gradient(
            90deg,
            #D92B2B 0%,
            #ff6b6b 40%,
            #D92B2B 60%,
            #b91c1c 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F4F5F7] pt-24 pb-16">

        {/* ── Background layers ───────────────────────────────── */}

        {/* Large soft red gradient blob — top right */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(217,43,43,0.08) 0%, rgba(217,43,43,0.02) 50%, transparent 70%)",
          }}
        />

        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #1C1C1F 0px, #1C1C1F 1px, transparent 1px, transparent 12px)",
          }}
        />

        {/* Animated dot grid canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: mounted ? 1 : 0, transition: "opacity 1s ease" }}
        />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#F4F5F7] to-transparent" />

        {/* ── Content grid ────────────────────────────────────── */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* ── Left: Text content ─────────────────────────── */}
            <div className="flex flex-col gap-6">

              {/* Eyebrow tag */}
              <div
                className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-[#D92B2B]/30 bg-[#D92B2B]/5 text-[#D92B2B] text-xs font-bold tracking-widest uppercase"
                style={{
                  animation: "fadeSlideUp 0.5s ease forwards",
                  opacity: 0,
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]"
                  style={{ animation: "blink 1.5s ease-in-out infinite" }}
                />
                Professional Security Systems
              </div>

              {/* Headline */}
              <h1
                className="hero-headline text-[clamp(2.8rem,6vw,5rem)] text-[#1C1C1F]"
                style={{
                  animation: "fadeSlideUp 0.6s ease forwards",
                  animationDelay: "0.1s",
                  opacity: 0,
                }}
              >
                Protect What
                <br />
                Matters{" "}
                <span className="text-shimmer">Most.</span>
              </h1>

              {/* Subheadline */}
              <p
                className="text-[#6B7280] text-lg leading-relaxed max-w-lg"
                style={{
                  animation: "fadeSlideUp 0.6s ease forwards",
                  animationDelay: "0.2s",
                  opacity: 0,
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                Tomsburg Surveillance designs and installs cutting-edge security camera systems for commercial and residential properties. 24/7 monitoring. Expert installation. Total peace of mind.
              </p>

              {/* CTA row */}
              <div
                className="flex flex-wrap gap-4 items-center"
                style={{
                  animation: "fadeSlideUp 0.6s ease forwards",
                  animationDelay: "0.3s",
                  opacity: 0,
                }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#D92B2B] text-white rounded-lg font-bold uppercase tracking-wide text-sm transition-all duration-200 hover:bg-[#b91c1c] hover:shadow-[0_8px_30px_rgba(217,43,43,0.35)] hover:-translate-y-0.5 active:scale-95"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
                >
                  <MdSecurity className="text-lg" />
                  Get a Free Quote
                  <HiArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1C1C1F] rounded-lg font-bold uppercase tracking-wide text-sm border border-[#E5E7EB] transition-all duration-200 hover:border-[#D92B2B] hover:text-[#D92B2B] hover:-translate-y-0.5 shadow-sm"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
                >
                  View Services
                </Link>
              </div>

              {/* Trust badges */}
              <div
                className="flex flex-wrap gap-3 pt-2"
                style={{
                  animation: "fadeSlideUp 0.6s ease forwards",
                  animationDelay: "0.4s",
                  opacity: 0,
                }}
              >
                <TrustBadge icon={<RiShieldCheckLine />} text="Licensed & Insured" delay="0.45s" />
                <TrustBadge icon={<MdSupportAgent />} text="24/7 Support" delay="0.5s" />
                <TrustBadge icon={<MdVerifiedUser />} text="5-Year Warranty" delay="0.55s" />
              </div>

              {/* Stats row */}
              <div
                className="flex gap-8 pt-4 border-t border-[#E5E7EB]"
                style={{
                  animation: "fadeSlideUp 0.6s ease forwards",
                  animationDelay: "0.6s",
                  opacity: 0,
                }}
              >
                {[
                  { value: "500+", label: "Systems Installed" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "15+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="text-3xl font-black text-[#1C1C1F]"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-xs text-[#6B7280] font-semibold tracking-wide uppercase mt-0.5"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Visual panel ────────────────────────── */}
            <div
              className="relative flex flex-col items-center justify-center"
              style={{
                animation: "fadeSlideUp 0.8s ease forwards",
                animationDelay: "0.2s",
                opacity: 0,
              }}
            >
              {/* Central shield / icon hero graphic */}
              <div
                className="relative flex items-center justify-center"
                style={{ animation: "floatY 5s ease-in-out infinite" }}
              >
                {/* Outer pulsing ring */}
                <div
                  className="absolute w-64 h-64 rounded-full border-2 border-[#D92B2B]/20"
                  style={{ animation: "pulseRing 2.5s ease-out infinite" }}
                />
                <div
                  className="absolute w-64 h-64 rounded-full border-2 border-[#D92B2B]/15"
                  style={{ animation: "pulseRing 2.5s ease-out infinite", animationDelay: "0.8s" }}
                />

                {/* Rotating dashed orbit */}
                <div
                  className="absolute w-52 h-52 rounded-full border border-dashed border-[#D92B2B]/20"
                  style={{ animation: "rotateSlow 20s linear infinite" }}
                />

                {/* Main icon container */}
                <div className="relative w-44 h-44 rounded-3xl bg-white shadow-[0_20px_60px_rgba(28,28,31,0.12)] border border-[#E5E7EB] flex items-center justify-center">
                  {/* Inner red glow */}
                  <div className="absolute inset-4 rounded-2xl bg-[#D92B2B]/5" />
                  <TbCameraPlus className="relative text-[#D92B2B] text-7xl" />
                </div>

                {/* Floating badge: LIVE */}
                <div className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1C1F] text-white text-[11px] font-bold tracking-widest uppercase rounded-full shadow-lg">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]"
                    style={{ animation: "blink 1s ease-in-out infinite" }}
                  />
                  LIVE
                </div>

                {/* Floating badge: 4K */}
                <div className="absolute -bottom-3 -left-3 px-3 py-1.5 bg-[#D92B2B] text-white text-[11px] font-black tracking-widest uppercase rounded-full shadow-lg">
                  4K UHD
                </div>
              </div>

              {/* Camera feed cards grid */}
              <div className="grid grid-cols-2 gap-3 mt-10 w-full max-w-sm">
                <CameraFeedCard label="CAM-01" location="Front Entrance" delay="0.5s" />
                <CameraFeedCard label="CAM-02" location="Parking Lot" delay="0.65s" />
                <CameraFeedCard label="CAM-03" location="Server Room" delay="0.8s" />
                <CameraFeedCard label="CAM-04" location="Loading Dock" delay="0.95s" />
              </div>

              {/* "All systems operational" status bar */}
              <div
                className="mt-4 w-full max-w-sm flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-[#E5E7EB] shadow-sm"
                style={{
                  animation: "fadeSlideUp 0.6s ease forwards",
                  animationDelay: "1.1s",
                  opacity: 0,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_3px_rgba(52,211,153,0.4)] flex-shrink-0" />
                <p
                  className="text-xs font-semibold text-[#1C1C1F] tracking-wide"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  All systems operational
                </p>
                <span className="ml-auto text-[10px] text-[#6B7280] font-mono">4/4 online</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Scroll cue ──────────────────────────────────────── */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{
            animation: "fadeSlideUp 0.6s ease forwards",
            animationDelay: "1.2s",
            opacity: 0,
          }}
        >
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-[#6B7280] font-semibold"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[#6B7280]/50 to-transparent" />
        </div>

      </section>
    </>
  );
}