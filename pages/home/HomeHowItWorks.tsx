"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MdOutlinePhoneInTalk,
  MdOutlineContentPasteSearch,
  MdOutlineDesignServices,
  MdOutlineHandyman,
  MdOutlineVerified,
  MdArrowForward,
} from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import { TbCircleCheck } from "react-icons/tb";

// ─── Palette: Secure Light ───────────────────────────────────────────────────
// #F4F5F7 — Off White
// #FFFFFF — Pure White
// #1C1C1F — Near Black
// #D92B2B — Brand Red
// #6B7280 — Slate Grey
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    icon: <MdOutlinePhoneInTalk />,
    title: "Free Consultation",
    subtitle: "We listen first.",
    description:
      "Call us or submit a quote request online. Our security specialists will discuss your property, concerns, and goals — no hard sells, just expert guidance.",
    duration: "Same day response",
    details: ["Phone, email, or online form", "No obligation whatsoever", "Speak directly with an expert"],
  },
  {
    number: "02",
    icon: <MdOutlineContentPasteSearch />,
    title: "Site Assessment",
    subtitle: "We assess every angle.",
    description:
      "Our technicians visit your property to conduct a thorough walkthrough. We identify vulnerabilities, blind spots, and the optimal camera positions for full coverage.",
    duration: "1–2 hours on-site",
    details: ["Full property walkthrough", "Blind spot identification", "Written assessment report"],
  },
  {
    number: "03",
    icon: <MdOutlineDesignServices />,
    title: "Custom System Design",
    subtitle: "Built around your needs.",
    description:
      "We design a tailored security blueprint — selecting the right cameras, recorders, storage, and monitoring plan to match your exact requirements and budget.",
    duration: "24-hour turnaround",
    details: ["Camera placement diagram", "Equipment recommendations", "Transparent pricing breakdown"],
  },
  {
    number: "04",
    icon: <MdOutlineHandyman />,
    title: "Professional Installation",
    subtitle: "Clean, fast, zero disruption.",
    description:
      "Our certified installers handle everything — cabling, mounting, configuration, and testing. We work around your schedule to minimize any interruption to your business or home.",
    duration: "1–3 days typically",
    details: ["Licensed & insured technicians", "Neat cable management", "Full system testing & QA"],
  },
  {
    number: "05",
    icon: <MdOutlineVerified />,
    title: "Handoff & Ongoing Support",
    subtitle: "You're never on your own.",
    description:
      "We walk you through every feature, set up your mobile app, and make sure you're fully confident operating your system. Then we stay available 24/7 for support.",
    duration: "Lifetime support",
    details: ["Live app setup & walkthrough", "24/7 technical support line", "Annual maintenance check-ins"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[0];
  index: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      {/* ── Desktop layout: alternating left/right ─────────── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-0 items-start">

        {/* Left content (even steps) or spacer */}
        <div className={`py-2 ${isEven ? "pr-12 flex justify-end" : ""}`}>
          {isEven && (
            <StepContent step={step} index={index} hovered={hovered} setHovered={setHovered} align="right" />
          )}
        </div>

        {/* Center timeline column */}
        <div className="flex flex-col items-center w-20">
          {/* Step number node */}
          <div
            className={[
              "relative flex items-center justify-center w-16 h-16 rounded-2xl border-2 transition-all duration-300 flex-shrink-0 z-10",
              hovered
                ? "bg-[#D92B2B] border-[#D92B2B] shadow-[0_0_24px_rgba(217,43,43,0.4)]"
                : "bg-white border-[#E5E7EB] shadow-md",
            ].join(" ")}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span
              className={`text-2xl transition-colors duration-300 ${hovered ? "text-white" : "text-[#D92B2B]"}`}
            >
              {step.icon}
            </span>
            {/* Step number badge */}
            <div
              className={[
                "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-colors duration-300",
                hovered ? "bg-[#1C1C1F] text-white" : "bg-[#1C1C1F] text-white",
              ].join(" ")}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {index + 1}
            </div>
          </div>

          {/* Connecting line */}
          {!isLast && (
            <div className="relative w-px flex-1 mt-3 overflow-hidden" style={{ minHeight: "80px" }}>
              <div className="absolute inset-0 bg-[#E5E7EB]" />
              <div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#D92B2B] to-[#D92B2B]/20"
                style={{
                  height: inView ? "100%" : "0%",
                  transition: `height 0.8s ease ${index * 0.12 + 0.4}s`,
                }}
              />
              {/* Animated dot */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D92B2B]"
                style={{ animation: inView ? "travelDown 2s ease-in-out infinite" : "none" }}
              />
            </div>
          )}
        </div>

        {/* Right content (odd steps) or spacer */}
        <div className={`py-2 ${!isEven ? "pl-12" : ""}`}>
          {!isEven && (
            <StepContent step={step} index={index} hovered={hovered} setHovered={setHovered} align="left" />
          )}
        </div>
      </div>

      {/* ── Mobile layout: vertical stack ──────────────────── */}
      <div className="lg:hidden flex gap-5">
        {/* Left: icon + line */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            className={[
              "relative flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all duration-300 z-10",
              hovered
                ? "bg-[#D92B2B] border-[#D92B2B] shadow-[0_0_16px_rgba(217,43,43,0.35)]"
                : "bg-white border-[#E5E7EB] shadow-sm",
            ].join(" ")}
          >
            <span className={`text-xl transition-colors duration-300 ${hovered ? "text-white" : "text-[#D92B2B]"}`}>
              {step.icon}
            </span>
            <div
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#1C1C1F] text-white flex items-center justify-center text-[9px] font-black"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {index + 1}
            </div>
          </div>
          {!isLast && (
            <div className="relative w-px flex-1 mt-2 overflow-hidden" style={{ minHeight: "60px" }}>
              <div className="absolute inset-0 bg-[#E5E7EB]" />
              <div
                className="absolute top-0 left-0 right-0 bg-[#D92B2B]/40"
                style={{ height: inView ? "100%" : "0%", transition: `height 0.8s ease ${index * 0.12 + 0.3}s` }}
              />
            </div>
          )}
        </div>

        {/* Right: content */}
        <div className="pb-8 flex-1">
          <StepContent step={step} index={index} hovered={hovered} setHovered={setHovered} align="left" />
        </div>
      </div>
    </div>
  );
}

function StepContent({
  step,
  index,
  hovered,
  setHovered,
  align,
}: {
  step: (typeof STEPS)[0];
  index: number;
  hovered: boolean;
  setHovered: (v: boolean) => void;
  align: "left" | "right";
}) {
  return (
    <div
      className={[
        "group relative max-w-sm bg-white rounded-2xl border p-6 transition-all duration-300 cursor-default",
        hovered
          ? "border-[#D92B2B]/40 shadow-[0_8px_40px_rgba(217,43,43,0.10)] -translate-y-1"
          : "border-[#E5E7EB] shadow-sm hover:border-[#D92B2B]/30 hover:shadow-md hover:-translate-y-0.5",
        align === "right" ? "text-left" : "text-left",
      ].join(" ")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ghost number watermark */}
      <span
        className="absolute top-3 right-4 text-5xl font-black text-[#F4F5F7] select-none leading-none pointer-events-none"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {step.number}
      </span>

      {/* Duration pill */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F4F5F7] border border-[#E5E7EB] mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
        <span
          className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {step.duration}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[#1C1C1F] font-black text-xl leading-tight mb-1"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.01em" }}
      >
        {step.title}
      </h3>
      <p
        className="text-[#D92B2B] text-xs font-bold tracking-wide uppercase mb-3"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {step.subtitle}
      </p>

      {/* Description */}
      <p
        className="text-[#6B7280] text-sm leading-relaxed mb-4"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {step.description}
      </p>

      {/* Detail bullets */}
      <ul className="flex flex-col gap-1.5">
        {step.details.map((d) => (
          <li key={d} className="flex items-center gap-2">
            <TbCircleCheck className="text-[#D92B2B] text-base flex-shrink-0" />
            <span
              className="text-xs text-[#6B7280]"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              {d}
            </span>
          </li>
        ))}
      </ul>

      {/* Hover red left border accent */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-[#D92B2B] transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      />
    </div>
  );
}

export default function HowItWorksSection() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const { ref: ctaRef, inView: ctaInView } = useInView(0.2);

  return (
    <>
      <style>{`
        @keyframes travelDown {
          0%   { top: 0%;   opacity: 1; }
          80%  { top: 90%;  opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <section id="how-it-works" className="relative bg-white py-24 lg:py-32 overflow-hidden">

        {/* ── Background decorations ───────────────────────── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D92B2B]/20 to-transparent" />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #D92B2B 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.04,
          }}
        />

        {/* Red glow top-right */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(217,43,43,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section header ───────────────────────────────── */}
          <div
            ref={headerRef}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            {/* Eyebrow */}
            <div
              className="flex items-center justify-center gap-3 mb-4"
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.5s ease",
              }}
            >
              <div
                className="h-px bg-[#D92B2B]"
                style={{
                  width: headerInView ? "3rem" : "0",
                  transition: "width 0.6s ease 0.3s",
                }}
              />
              <span
                className="text-[#D92B2B] text-xs font-bold tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Our Process
              </span>
              <div
                className="h-px bg-[#D92B2B]"
                style={{
                  width: headerInView ? "3rem" : "0",
                  transition: "width 0.6s ease 0.3s",
                }}
              />
            </div>

            <h2
              className="text-[clamp(2.4rem,5vw,3.8rem)] font-black leading-none text-[#1C1C1F] mb-5"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "-0.01em",
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.1s",
              }}
            >
              From First Call to{" "}
              <span className="text-[#D92B2B]">Full Protection.</span>
            </h2>

            <p
              className="text-[#6B7280] text-base leading-relaxed"
              style={{
                fontFamily: "'Barlow', sans-serif",
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.2s",
              }}
            >
              We&apos;ve built a simple, transparent process so you always know what to expect. No surprises — just a smooth journey from consultation to a fully secured property.
            </p>
          </div>

          {/* ── Steps timeline ───────────────────────────────── */}
          <div className="flex flex-col gap-0 lg:gap-8">
            {STEPS.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>

          {/* ── Bottom CTA ───────────────────────────────────── */}
          <div
            ref={ctaRef}
            className="mt-20 flex flex-col items-center text-center gap-6"
            style={{
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#E5E7EB]" />
              <span
                className="text-[#6B7280] text-sm font-semibold tracking-wide"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Ready to get started?
              </span>
              <div className="h-px w-12 bg-[#E5E7EB]" />
            </div>

            <h3
              className="text-[#1C1C1F] font-black text-3xl leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Your first step takes 60 seconds.
            </h3>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#D92B2B] text-white rounded-xl font-bold uppercase tracking-wide text-sm transition-all duration-200 hover:bg-[#b91c1c] hover:shadow-[0_8px_30px_rgba(217,43,43,0.35)] hover:-translate-y-0.5 active:scale-95"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
              >
                Start With a Free Consultation
                <HiArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="tel:+15551234567"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#1C1C1F] rounded-xl font-bold uppercase tracking-wide text-sm border border-[#E5E7EB] transition-all duration-200 hover:border-[#D92B2B] hover:text-[#D92B2B] hover:-translate-y-0.5 shadow-sm"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
              >
                <MdOutlinePhoneInTalk className="text-lg" />
                Call Us Now
              </Link>
            </div>

            {/* Trust micro-line */}
            <p
              className="text-[#6B7280] text-xs"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              No commitment required · Licensed & insured · Serving the Tri-State Area
            </p>
          </div>

        </div>
      </section>
    </>
  );
}