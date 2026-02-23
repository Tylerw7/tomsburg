"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  MdOutlineEngineering,
  MdOutlineSpeed,
  MdOutlineSupportAgent,
  MdOutlineWorkspacePremium,
  MdOutlinePriceCheck,
  MdOutlineHandshake,
} from "react-icons/md";
import { TbStarFilled } from "react-icons/tb";
import { HiArrowRight } from "react-icons/hi";
import { RiShieldCheckFill } from "react-icons/ri";

// ─── Palette: Secure Light ───────────────────────────────────────────────────
// #F4F5F7 — Off White · #FFFFFF — Pure White
// #1C1C1F — Near Black · #D92B2B — Brand Red · #6B7280 — Slate Grey
// ─────────────────────────────────────────────────────────────────────────────

const REASONS = [
  { icon: <MdOutlineEngineering />,     title: "Certified Technicians",  blurb: "Licensed, background-checked pros — never subcontractors."   },
  { icon: <MdOutlineSpeed />,            title: "Same-Day Installs",       blurb: "Most residential jobs wrapped up in a single visit."          },
  { icon: <MdOutlineSupportAgent />,     title: "24/7 Live Support",       blurb: "Our line never closes — 2AM or 2PM, we pick up."              },
  { icon: <MdOutlineWorkspacePremium />, title: "Premium Equipment",       blurb: "Industry-leading brands, full manufacturer warranties."        },
  { icon: <MdOutlinePriceCheck />,       title: "Flat, Clear Pricing",     blurb: "Every quote itemized upfront. Zero hidden charges, ever."      },
  { icon: <MdOutlineHandshake />,        title: "5-Year Warranty",         blurb: "Every install backed by our industry-leading guarantee."       },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const setRef = (el: HTMLElement | null) => {
    ref.current = el;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { setRef, inView };
}

export default function WhyChooseUsSection() {
  const { setRef, inView } = useInView(0.1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @keyframes wcu-fadeLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes wcu-fadeRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes wcu-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wcu-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .wcu-left  { animation: wcu-fadeLeft  0.65s ease forwards; }
        .wcu-right { animation: wcu-fadeRight 0.65s ease 0.15s forwards; }
        .wcu-item  { animation: wcu-fadeUp    0.5s ease forwards; }
        .wcu-ring  { animation: wcu-spin 18s linear infinite; }
      `}</style>

      <section
        ref={setRef as React.RefCallback<HTMLElement>}
        id="why-choose-us"
        className="relative bg-[#F4F5F7] overflow-hidden"
        style={{ maxHeight: "100vh", paddingTop: "clamp(3rem, 6vh, 5rem)", paddingBottom: "clamp(3rem, 6vh, 5rem)" }}
      >

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #6B7280 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.07,
          }}
        />
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D92B2B]/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Two-column split ──────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ════════════════════════════════════════
                LEFT COLUMN — Visual anchor
            ════════════════════════════════════════ */}
            <div
              className={inView ? "wcu-left" : "opacity-0"}
              style={{ animationFillMode: "forwards" }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-8 h-[2px] bg-[#D92B2B]" />
                <span
                  className="text-[#D92B2B] text-[11px] font-bold tracking-[0.22em] uppercase"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Why Choose Us
                </span>
              </div>

              {/* Headline */}
              <h2
                className="font-black text-[#1C1C1F] leading-[0.93] mb-5"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.6rem, 4.8vw, 4.2rem)",
                }}
              >
                Trusted Security.
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg,#D92B2B,#ff6b6b 50%,#D92B2B)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Zero Compromises.
                </span>
              </h2>

              <p
                className="text-[#6B7280] text-base leading-relaxed mb-8 max-w-md"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                From the first call to years after installation, Tomsburg delivers expertise, transparency, and support that most companies simply can&apos;t match.
              </p>

              {/* Rotating shield graphic */}
              <div className="relative w-48 h-48 flex items-center justify-center mx-auto lg:mx-0">
                {/* Outer rotating dashed ring */}
                <svg
                  className="wcu-ring absolute inset-0 w-full h-full"
                  viewBox="0 0 192 192"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="96" cy="96" r="88"
                    stroke="#D92B2B"
                    strokeWidth="1.5"
                    strokeDasharray="6 8"
                    opacity="0.25"
                  />
                </svg>

                {/* Middle static ring */}
                <div className="absolute w-36 h-36 rounded-full border border-[#E5E7EB]" />

                {/* Center badge */}
                <div className="relative w-28 h-28 rounded-full bg-white shadow-[0_8px_32px_rgba(28,28,31,0.12)] border border-[#E5E7EB] flex flex-col items-center justify-center gap-1">
                  <RiShieldCheckFill className="text-[#D92B2B] text-4xl" />
                  <span
                    className="text-[#1C1C1F] font-black text-xs tracking-wide uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Trusted
                  </span>
                </div>

                {/* Orbiting stat pills */}
                {[
                  { label: "500+",  sub: "Installs", angle: -60  },
                  { label: "4.9★",  sub: "Rating",   angle: 60   },
                  { label: "15yrs", sub: "Exp.",      angle: 180  },
                ].map(({ label, sub, angle }) => {
                  const rad = (angle * Math.PI) / 180;
                  const r = 88;
                  const x = 96 + r * Math.cos(rad);
                  const y = 96 + r * Math.sin(rad);
                  const left = `${(x / 192) * 100}%`;
                  const top  = `${(y / 192) * 100}%`;
                  return (
                    <div
                      key={label}
                      className="absolute flex flex-col items-center justify-center bg-white border border-[#E5E7EB] shadow-md rounded-full w-14 h-14 -translate-x-1/2 -translate-y-1/2"
                      style={{ left, top }}
                    >
                      <span
                        className="text-[#D92B2B] font-black text-sm leading-none"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-[#6B7280] text-[9px] font-semibold tracking-wide uppercase"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        {sub}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#D92B2B] text-white rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:bg-[#b91c1c] hover:shadow-[0_6px_20px_rgba(217,43,43,0.35)] hover:-translate-y-0.5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
                >
                  Get a Free Quote
                  <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <span
                  className="text-[#6B7280] text-xs"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  No commitment required
                </span>
              </div>
            </div>

            {/* ════════════════════════════════════════
                RIGHT COLUMN — Numbered reason list
            ════════════════════════════════════════ */}
            <div
              className={inView ? "wcu-right" : "opacity-0"}
              style={{ animationFillMode: "forwards" }}
            >
              <div className="flex flex-col divide-y divide-[#E5E7EB]">
                {REASONS.map((r, i) => (
                  <div
                    key={r.title}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="group flex items-center gap-5 py-4 cursor-default transition-all duration-200"
                    style={
                      inView
                        ? { animation: `wcu-fadeUp 0.45s ease ${0.2 + i * 0.07}s forwards`, opacity: 0, animationFillMode: "forwards" }
                        : { opacity: 0 }
                    }
                  >
                    {/* Index number */}
                    <span
                      className="flex-shrink-0 w-8 text-right font-black text-xl leading-none transition-colors duration-200"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: hoveredIdx === i ? "#D92B2B" : "#E5E7EB",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-200"
                      style={{
                        background: hoveredIdx === i ? "#D92B2B" : "#FFFFFF",
                        color: hoveredIdx === i ? "#fff" : "#D92B2B",
                        boxShadow: hoveredIdx === i
                          ? "0 4px 16px rgba(217,43,43,0.35)"
                          : "0 2px 8px rgba(28,28,31,0.08)",
                      }}
                    >
                      {r.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-black text-sm leading-tight transition-colors duration-200"
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          letterSpacing: "0.02em",
                          color: hoveredIdx === i ? "#1C1C1F" : "#1C1C1F",
                        }}
                      >
                        {r.title}
                      </p>
                      <p
                        className="text-[#6B7280] text-xs leading-snug mt-0.5 transition-colors duration-200"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        {r.blurb}
                      </p>
                    </div>

                    {/* Hover arrow */}
                    <HiArrowRight
                      className="flex-shrink-0 text-base transition-all duration-200"
                      style={{
                        color: hoveredIdx === i ? "#D92B2B" : "transparent",
                        transform: hoveredIdx === i ? "translateX(0)" : "translateX(-6px)",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Bottom trust strip */}
              <div className="mt-5 pt-5 border-t border-[#E5E7EB] flex flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map(s => <TbStarFilled key={s} className="text-[#D92B2B] text-sm" />)}
                  <span className="text-[#6B7280] text-xs ml-1" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    4.9 / 5 · 200+ reviews
                  </span>
                </div>
                <span className="text-[#E5E7EB]">|</span>
                <span className="text-[#6B7280] text-xs" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Licensed & Insured
                </span>
                <span className="text-[#E5E7EB]">|</span>
                <span className="text-[#6B7280] text-xs" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  5-Year Warranty
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}