"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MdOutlineVideocam,
  MdOutlineBusinessCenter,
  MdOutlineHome,
  MdOutlineCloud,
  MdOutlineLightbulb,
  MdOutlinePhonelink,
  MdArrowForward,
  MdCheckCircleOutline,
} from "react-icons/md";
import { TbShieldLock, TbWifi } from "react-icons/tb";
import { HiArrowRight } from "react-icons/hi";

// ─── Palette: Secure Light ───────────────────────────────────────────────────
// #F4F5F7 — Off White
// #FFFFFF — Pure White
// #1C1C1F — Near Black
// #D92B2B — Brand Red
// #6B7280 — Slate Grey
// ─────────────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "01",
    icon: <MdOutlineVideocam />,
    title: "CCTV Camera Installation",
    tagline: "Crystal-clear coverage, everywhere.",
    description:
      "We design and install professional HD and 4K CCTV systems tailored to your property's unique layout — maximizing coverage with zero blind spots.",
    features: [
      "HD & 4K resolution cameras",
      "Indoor & outdoor rated",
      "Night vision & infrared",
      "Vandal-resistant housings",
    ],
    accent: "#D92B2B",
    featured: true,
  },
  {
    id: "02",
    icon: <MdOutlineBusinessCenter />,
    title: "Commercial Security Systems",
    tagline: "Enterprise-grade protection at scale.",
    description:
      "From retail chains to warehouses and office complexes, we build multi-camera networks with centralized management and access control integration.",
    features: [
      "Multi-site management",
      "Access control integration",
      "License plate recognition",
      "Custom alert zones",
    ],
    accent: "#1C1C1F",
    featured: false,
  },
  {
    id: "03",
    icon: <MdOutlineHome />,
    title: "Residential Security",
    tagline: "Home protection, simplified.",
    description:
      "Protect your family and property with smart home-compatible systems that are easy to use and professionally installed.",
    features: [
      "Smart home integration",
      "Mobile app monitoring",
      "Doorbell cameras",
      "Motion-triggered alerts",
    ],
    accent: "#1C1C1F",
    featured: false,
  },
  {
    id: "04",
    icon: <MdOutlineCloud />,
    title: "Cloud & Remote Monitoring",
    tagline: "Watch from anywhere, anytime.",
    description:
      "Secure cloud storage and remote access lets you monitor your property live from any device — 24/7, no matter where you are.",
    features: [
      "Encrypted cloud storage",
      "Live remote viewing",
      "30-day footage retention",
      "Multi-user access controls",
    ],
    accent: "#1C1C1F",
    featured: false,
  },
  {
    id: "05",
    icon: <TbShieldLock />,
    title: "Alarm & Intrusion Detection",
    tagline: "Stop threats before they escalate.",
    description:
      "Integrated alarm systems with motion detectors, door/window sensors, and instant professional monitoring response.",
    features: [
      "Motion & glass-break sensors",
      "24/7 professional monitoring",
      "Instant SMS & call alerts",
      "Police dispatch integration",
    ],
    accent: "#1C1C1F",
    featured: false,
  },
  {
    id: "06",
    icon: <MdOutlinePhonelink />,
    title: "System Upgrades & Maintenance",
    tagline: "Keep your system at peak performance.",
    description:
      "Already have a system? We upgrade outdated equipment, fix dead zones, and provide ongoing maintenance to keep everything running flawlessly.",
    features: [
      "Free system assessment",
      "Analog to IP upgrades",
      "Preventive maintenance plans",
      "Same-day repair service",
    ],
    accent: "#1C1C1F",
    featured: false,
  },
];

// Hook: observe when element enters viewport
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

// Individual service card
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "relative flex flex-col rounded-2xl border transition-all duration-500 cursor-pointer group overflow-hidden",
        service.featured
          ? "bg-[#1C1C1F] border-[#D92B2B]/50 shadow-[0_0_40px_rgba(217,43,43,0.15)]"
          : "bg-white border-[#E5E7EB] hover:border-[#D92B2B]/40 hover:shadow-[0_8px_40px_rgba(28,28,31,0.10)]",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Featured banner */}
      {service.featured && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D92B2B] to-transparent" />
      )}

      {/* Hover background wash */}
      {!service.featured && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#D92B2B]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        />
      )}

      <div className="flex flex-col gap-5 p-7 flex-1">
        {/* Icon + number row */}
        <div className="flex items-start justify-between">
          <div
            className={[
              "flex items-center justify-center w-14 h-14 rounded-2xl text-2xl transition-all duration-300",
              service.featured
                ? "bg-[#D92B2B] text-white shadow-[0_4px_20px_rgba(217,43,43,0.4)]"
                : "bg-[#F4F5F7] text-[#D92B2B] group-hover:bg-[#D92B2B] group-hover:text-white group-hover:shadow-[0_4px_20px_rgba(217,43,43,0.3)]",
            ].join(" ")}
          >
            {service.icon}
          </div>
          <span
            className={[
              "font-black text-4xl leading-none select-none",
              service.featured ? "text-white/10" : "text-[#1C1C1F]/06",
            ].join(" ")}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {service.id}
          </span>
        </div>

        {/* Title & tagline */}
        <div>
          <h3
            className={[
              "font-black text-xl leading-tight mb-1",
              service.featured ? "text-white" : "text-[#1C1C1F]",
            ].join(" ")}
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.01em" }}
          >
            {service.title}
          </h3>
          <p
            className={[
              "text-sm font-semibold",
              service.featured ? "text-[#D92B2B]" : "text-[#D92B2B]",
            ].join(" ")}
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {service.tagline}
          </p>
        </div>

        {/* Description */}
        <p
          className={[
            "text-sm leading-relaxed",
            service.featured ? "text-white/60" : "text-[#6B7280]",
          ].join(" ")}
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="flex flex-col gap-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <MdCheckCircleOutline
                className={[
                  "text-base flex-shrink-0",
                  service.featured ? "text-[#D92B2B]" : "text-[#D92B2B]",
                ].join(" ")}
              />
              <span
                className={[
                  "text-sm",
                  service.featured ? "text-white/70" : "text-[#6B7280]",
                ].join(" ")}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card footer link */}
      <div
        className={[
          "px-7 py-4 border-t flex items-center justify-between transition-colors duration-200",
          service.featured
            ? "border-white/10"
            : "border-[#F4F5F7] group-hover:border-[#D92B2B]/20",
        ].join(" ")}
      >
        <span
          className={[
            "text-xs font-bold uppercase tracking-widest",
            service.featured ? "text-white/50" : "text-[#6B7280]",
          ].join(" ")}
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Learn More
        </span>
        <MdArrowForward
          className={[
            "text-lg transition-all duration-200",
            service.featured
              ? "text-[#D92B2B] group-hover:translate-x-1"
              : "text-[#6B7280] group-hover:text-[#D92B2B] group-hover:translate-x-1",
          ].join(" ")}
        />
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const { ref: ctaRef, inView: ctaInView } = useInView(0.2);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        @keyframes widthGrow {
          from { width: 0; }
          to   { width: 3rem; }
        }
      `}</style>

      <section id="services" className="relative bg-[#F4F5F7] py-24 lg:py-32 overflow-hidden">

        {/* ── Background decoration ─────────────────────────── */}
        {/* Subtle diagonal stripe texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #1C1C1F 0px, #1C1C1F 1px, transparent 1px, transparent 14px)",
          }}
        />

        {/* Large red glow — bottom left */}
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(217,43,43,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Section divider line — top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D92B2B]/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section header ───────────────────────────────── */}
          <div
            ref={headerRef}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
          >
            {/* Left: label + headline */}
            <div
              className="transition-all duration-700"
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(24px)",
              }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
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
                  What We Do
                </span>
              </div>

              <h2
                className="text-[clamp(2.4rem,5vw,3.8rem)] font-black leading-none text-[#1C1C1F]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Security Solutions
                <br />
                <span className="text-[#D92B2B]">Built for You.</span>
              </h2>
            </div>

            {/* Right: description */}
            <div
              className="max-w-md transition-all duration-700 delay-200"
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "0.2s",
              }}
            >
              <p
                className="text-[#6B7280] text-base leading-relaxed"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                From single-camera setups to enterprise-grade multi-site networks, Tomsburg Surveillance delivers fully customized security solutions with professional installation and lifetime support.
              </p>

              {/* Inline stats */}
              <div className="flex gap-6 mt-6 pt-6 border-t border-[#E5E7EB]">
                {[
                  { icon: <TbWifi />, label: "IP & Analog Systems" },
                  { icon: <MdOutlineLightbulb />, label: "Custom-Designed" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="text-[#D92B2B] text-lg">{item.icon}</span>
                    <span
                      className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Services grid ────────────────────────────────── */}
          {/* Featured card spans full width at top on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className={service.featured ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>

          {/* ── Bottom CTA banner ────────────────────────────── */}
          <div
            ref={ctaRef}
            className="mt-16 relative rounded-2xl overflow-hidden"
            style={{
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease",
            }}
          >
            {/* Dark background with texture */}
            <div className="bg-[#1C1C1F] relative px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Decorative red corner */}
              <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at top right, rgba(217,43,43,0.15) 0%, transparent 60%)",
                }}
              />

              {/* Diagonal stripes accent */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)",
                }}
              />

              {/* Left text */}
              <div className="relative">
                <p
                  className="text-[#D92B2B] text-xs font-bold tracking-[0.2em] uppercase mb-2"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Not Sure What You Need?
                </p>
                <h3
                  className="text-white font-black text-2xl md:text-3xl leading-tight"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Get a Security Assessment
                </h3>
                <p
                  className="text-white/50 text-sm mt-2 max-w-md"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Our experts will evaluate your property and recommend the perfect system — at no cost, no obligation.
                </p>
              </div>

              {/* Right CTA */}
              <div className="relative flex-shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[#D92B2B] text-white rounded-xl font-bold uppercase tracking-wide text-sm transition-all duration-200 hover:bg-[#b91c1c] hover:shadow-[0_8px_30px_rgba(217,43,43,0.4)] hover:-translate-y-0.5 active:scale-95"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
                >
                  Book Free Assessment
                  <HiArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <p
                  className="text-white/30 text-xs text-center mt-2"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Typically responds within 2 hours
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}