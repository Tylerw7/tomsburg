"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { TbStarFilled, TbBrandGoogle } from "react-icons/tb";
import { HiArrowRight } from "react-icons/hi";
import { RiDoubleQuotesL } from "react-icons/ri";

// ─── Palette: Secure Light ───────────────────────────────────────────────────
// #F4F5F7 — Off White · #FFFFFF — Pure White
// #1C1C1F — Near Black · #D92B2B — Brand Red · #6B7280 — Slate Grey
// ─────────────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    name: "James R.",
    role: "Operations Manager",
    company: "Riverside Logistics",
    rating: 5,
    date: "2 weeks ago",
    text: "Tomsburg completely transformed our warehouse security. Professional team, clean installation, and the system has been flawless. Highly recommend to any business owner.",
    initials: "JR",
    color: "#1C1C1F",
  },
  {
    name: "Maria S.",
    role: "Property Manager",
    company: "Sunset Realty Group",
    rating: 5,
    date: "1 month ago",
    text: "We hired Tomsburg to upgrade cameras across 4 properties. They finished ahead of schedule and the image quality is stunning. The app monitoring is incredibly easy to use.",
    initials: "MS",
    color: "#D92B2B",
  },
  {
    name: "David K.",
    role: "Homeowner",
    company: "Residential Client",
    rating: 5,
    date: "3 weeks ago",
    text: "From the free assessment to final installation, every step was smooth. The technician explained everything clearly and even helped me set up remote access on my phone. Outstanding service.",
    initials: "DK",
    color: "#2563EB",
  },
  {
    name: "Patricia L.",
    role: "Store Owner",
    company: "L&M Boutique",
    rating: 5,
    date: "2 months ago",
    text: "Had cameras installed at my boutique and couldn't be happier. The team was respectful, tidy, and done in half a day. Already recommended Tomsburg to three other business owners.",
    initials: "PL",
    color: "#059669",
  },
  {
    name: "Tom B.",
    role: "Facility Director",
    company: "Northside Medical Center",
    rating: 5,
    date: "1 month ago",
    text: "Tomsburg handled a complex multi-floor camera setup for our facility. Their planning was thorough, execution was spotless, and the ongoing support has been excellent.",
    initials: "TB",
    color: "#7C3AED",
  },
  {
    name: "Angela M.",
    role: "Restaurant Owner",
    company: "Casa Mia Trattoria",
    rating: 5,
    date: "3 months ago",
    text: "I was nervous about the installation disrupting my restaurant but they worked around our hours. Zero mess, zero fuss — and I sleep better knowing my place is protected.",
    initials: "AM",
    color: "#D97706",
  },
  {
    name: "Kevin T.",
    role: "IT Manager",
    company: "Apex Tech Solutions",
    rating: 5,
    date: "6 weeks ago",
    text: "As an IT professional I had high expectations. Tomsburg exceeded them — proper cable management, clean config, and a system that integrates with our existing network beautifully.",
    initials: "KT",
    color: "#0891B2",
  },
  {
    name: "Sandra W.",
    role: "School Administrator",
    company: "Westbrook Academy",
    rating: 5,
    date: "2 months ago",
    text: "Safety is our top priority and Tomsburg delivered. They understood the sensitivity of a school environment and designed a system that covers every inch without being obtrusive.",
    initials: "SW",
    color: "#BE185D",
  },
];

// Duplicate for seamless infinite scroll
const MARQUEE_ROWS = [
  REVIEWS.slice(0, 4),
  REVIEWS.slice(4, 8),
];

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <TbStarFilled key={i} className="text-[#FBBC05] text-sm" />
      ))}
    </div>
  );
}

function ReviewCard({ review, style }: { review: (typeof REVIEWS)[0]; style?: React.CSSProperties }) {
  return (
    <div
      className="flex-shrink-0 w-72 bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_2px_16px_rgba(28,28,31,0.07)] flex flex-col gap-3 hover:shadow-[0_6px_28px_rgba(28,28,31,0.12)] hover:-translate-y-1 transition-all duration-200"
      style={style}
    >
      {/* Google icon + stars */}
      <div className="flex items-center justify-between">
        <StarRow count={review.rating} />
        <TbBrandGoogle className="text-xl text-[#6B7280]/50" />
      </div>

      {/* Quote */}
      <p
        className="text-[#1C1C1F] text-sm leading-relaxed flex-1"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        &quot;{review.text}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-[#F4F5F7]">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
          style={{ background: review.color, fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p
            className="text-[#1C1C1F] font-bold text-xs leading-tight truncate"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {review.name}
          </p>
          <p
            className="text-[#6B7280] text-[11px] truncate"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {review.company}
          </p>
        </div>
        <span
          className="ml-auto text-[10px] text-[#6B7280]/60 flex-shrink-0"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {review.date}
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({ reviews, reverse = false }: { reviews: typeof REVIEWS; reverse?: boolean }) {
  const items = [...reviews, ...reviews]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden relative">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #F4F5F7, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #F4F5F7, transparent)" }} />

      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee${reverse ? "Rev" : ""} 40s linear infinite`,
          willChange: "transform",
        }}
      >
        {items.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} review={r} />
        ))}
      </div>
    </div>
  );
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView(0.1);

  const anim = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <section
        id="testimonials"
        ref={ref as React.RefObject<HTMLElement>}
        className="relative bg-[#F4F5F7] py-20 lg:py-28 overflow-hidden"
      >
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D92B2B]/25 to-transparent" />

        {/* Subtle diagonal texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #1C1C1F 0px, #1C1C1F 1px, transparent 1px, transparent 16px)",
          }}
        />

        {/* ── Header ──────────────────────────────────────── */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            {/* Left: headline */}
            <div style={anim(0)}>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#D92B2B]" />
                <span
                  className="text-[#D92B2B] text-[11px] font-bold tracking-[0.22em] uppercase"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Google Reviews
                </span>
              </div>

              <h2
                className="text-[#1C1C1F] font-black leading-[0.93]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                }}
              >
                Don&apos;t Take Our
                <br />
                Word for It.
              </h2>
            </div>

            {/* Right: Google rating summary */}
            <div
              className="flex items-center gap-5 bg-white rounded-2xl border border-[#E5E7EB] px-6 py-4 shadow-sm self-start lg:self-auto"
              style={anim(0.1)}
            >
              {/* Google G logo */}
              <div className="flex-shrink-0">
                <svg width="36" height="36" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.7-3.3-11.3-8H6.3C9.7 35.7 16.3 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.2 5.2C36.9 40 44 35 44 24c0-1.3-.1-2.6-.4-3.9z"/>
                </svg>
              </div>

              <div className="h-10 w-px bg-[#E5E7EB]" />

              {/* Score */}
              <div className="text-center">
                <p
                  className="text-[#1C1C1F] font-black text-3xl leading-none"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  4.9
                </p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1,2,3,4,5].map(i => <TbStarFilled key={i} className="text-[#FBBC05] text-xs" />)}
                </div>
              </div>

              <div className="h-10 w-px bg-[#E5E7EB]" />

              <div>
                <p
                  className="text-[#1C1C1F] font-black text-lg leading-none"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  200+
                </p>
                <p
                  className="text-[#6B7280] text-xs mt-0.5"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Google reviews
                </p>
              </div>

              <Link
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-1 text-[#1C1C1F] text-xs font-bold underline-offset-2 hover:text-[#D92B2B] transition-colors duration-150 ml-2"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                View all
                <HiArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Marquee rows ─────────────────────────────────── */}
        <div
          className="flex flex-col gap-4"
          style={anim(0.15)}
        >
          <MarqueeRow reviews={MARQUEE_ROWS[0]} reverse={false} />
          <MarqueeRow reviews={MARQUEE_ROWS[1]} reverse={true} />
        </div>

        {/* ── Featured pull-quote ──────────────────────────── */}
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"
          style={anim(0.2)}
        >
          <div className="relative bg-[#1C1C1F] rounded-2xl overflow-hidden px-8 py-8 md:px-14 md:py-10 flex flex-col md:flex-row items-center gap-8">

            {/* Glow */}
            <div
              className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(217,43,43,0.2) 0%, transparent 65%)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: "repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)",
              }}
            />

            {/* Quote icon */}
            <RiDoubleQuotesL className="relative text-[#D92B2B] text-6xl flex-shrink-0 opacity-80" />

            {/* Text */}
            <div className="relative flex-1">
              <p
                className="text-white text-lg lg:text-xl font-semibold leading-snug mb-4"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                &quot;Tomsburg handled a complex multi-floor camera setup for our facility. Their planning was thorough, execution spotless, and the ongoing support has been excellent.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  TB
                </div>
                <div>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>Tom B.</p>
                  <p className="text-white/40 text-xs" style={{ fontFamily: "'Barlow', sans-serif" }}>Facility Director, Northside Medical Center</p>
                </div>
                <div className="flex gap-0.5 ml-2">
                  {[1,2,3,4,5].map(i => <TbStarFilled key={i} className="text-[#FBBC05] text-sm" />)}
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <TbBrandGoogle className="text-white/40 text-base" />
                  <span className="text-white/30 text-xs" style={{ fontFamily: "'Barlow', sans-serif" }}>Google</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative flex-shrink-0">
              <Link
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#D92B2B] text-white rounded-xl font-bold uppercase tracking-wide text-sm transition-all duration-200 hover:bg-[#b91c1c] hover:shadow-[0_6px_20px_rgba(217,43,43,0.4)] hover:-translate-y-0.5 whitespace-nowrap"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
              >
                Read All Reviews
                <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}