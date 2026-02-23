"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { TbPlus, TbMinus } from "react-icons/tb";

// ─── Palette: Secure Light ───────────────────────────────────────────────────
// #F4F5F7 — Off White · #FFFFFF — Pure White
// #1C1C1F — Near Black · #D92B2B — Brand Red · #6B7280 — Slate Grey
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Installation", "Equipment", "Pricing", "Support"] as const;
type Category = (typeof CATEGORIES)[number];

const FAQS: { q: string; a: string; category: Category }[] = [
  {
    category: "Installation",
    q: "How long does a typical security camera installation take?",
    a: "Most residential installations are completed within a single day — usually 4 to 8 hours depending on the number of cameras and complexity of the layout. Commercial projects typically take 1 to 3 days. We always give you a clear timeframe during your free assessment so there are no surprises.",
  },
  {
    category: "Installation",
    q: "Do I need to be home during the installation?",
    a: "Yes, we do require someone to be present at the start of the installation to go over placement, access points, and any preferences. After that initial walkthrough our team can work independently, and we'll do a final walkthrough with you before we leave.",
  },
  {
    category: "Installation",
    q: "Will you install cameras in an existing building without major renovation?",
    a: "Absolutely. We specialize in clean, low-impact installations. We use the most efficient cabling routes possible and take care to minimize any wall penetrations. For most buildings, the installation requires no renovation work whatsoever.",
  },
  {
    category: "Equipment",
    q: "What camera brands and types do you install?",
    a: "We work with industry-leading brands known for reliability and image quality. We install HD and 4K IP cameras, PTZ cameras, fisheye cameras, license plate recognition cameras, and doorbell cameras — all selected to match your specific coverage needs and budget.",
  },
  {
    category: "Equipment",
    q: "Can your cameras record at night or in low-light conditions?",
    a: "Yes. All of our standard camera packages include infrared night vision capable of producing clear footage in complete darkness. We also offer color night vision cameras that use ambient light to deliver full-color footage even at night.",
  },
  {
    category: "Equipment",
    q: "How much footage storage do I get and where is it stored?",
    a: "We offer both local storage (NVR/DVR hard drives) and cloud storage options. Local storage typically holds 30 to 90 days of footage depending on the number of cameras and recording settings. Cloud plans offer secure off-site backup with 30-day retention and remote access from any device.",
  },
  {
    category: "Pricing",
    q: "How much does a security camera system cost?",
    a: "Pricing varies based on the number of cameras, equipment tier, and installation complexity. Residential systems typically start around $800–$1,500 fully installed. Commercial systems are custom-quoted. Every quote is fully itemized — you'll always know exactly what you're paying for with zero hidden fees.",
  },
  {
    category: "Pricing",
    q: "Do you offer financing or payment plans?",
    a: "Yes, we offer flexible payment options for larger commercial installs. Ask your technician or mention it during your free assessment and we'll walk you through the available options.",
  },
  {
    category: "Pricing",
    q: "Is the free assessment really free with no obligation?",
    a: "100% free, 100% no obligation. We'll visit your property, evaluate your security needs, and provide a detailed written quote. You're never pressured to commit — we let our expertise and pricing speak for themselves.",
  },
  {
    category: "Support",
    q: "What happens if a camera stops working after installation?",
    a: "All our installations are covered by a 5-year warranty on workmanship. Equipment is covered by the manufacturer's warranty. If anything stops working, call our 24/7 support line and we'll troubleshoot remotely or dispatch a technician — usually same or next day.",
  },
  {
    category: "Support",
    q: "Can I access my cameras remotely from my phone?",
    a: "Yes. We set up remote access on your smartphone, tablet, or computer as part of every installation. You'll be able to view live feeds, review recorded footage, receive motion alerts, and manage settings from anywhere in the world.",
  },
  {
    category: "Support",
    q: "Do you offer maintenance plans for ongoing upkeep?",
    a: "Yes, we offer annual maintenance packages that include a full system inspection, lens cleaning, firmware updates, and a health check on all recording equipment. This keeps your system performing at peak level year after year.",
  },
];

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

function AccordionItem({
  faq,
  isOpen,
  onToggle,
  index,
  inView,
}: {
  faq: (typeof FAQS)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  inView: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={[
        "group border rounded-xl overflow-hidden transition-all duration-300",
        isOpen
          ? "border-[#D92B2B]/40 shadow-[0_4px_24px_rgba(217,43,43,0.08)] bg-white"
          : "border-[#E5E7EB] bg-white hover:border-[#D92B2B]/25 hover:shadow-sm",
      ].join(" ")}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${0.05 + index * 0.055}s, transform 0.5s ease ${0.05 + index * 0.055}s, border-color 0.2s, box-shadow 0.2s`,
      }}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        {/* Index pip */}
        <span
          className={[
            "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-200",
            isOpen ? "bg-[#D92B2B] text-white" : "bg-[#F4F5F7] text-[#6B7280] group-hover:bg-[#D92B2B]/10 group-hover:text-[#D92B2B]",
          ].join(" ")}
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question text */}
        <span
          className={[
            "flex-1 font-bold text-sm leading-snug transition-colors duration-200",
            isOpen ? "text-[#1C1C1F]" : "text-[#1C1C1F] group-hover:text-[#D92B2B]",
          ].join(" ")}
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {faq.q}
        </span>

        {/* Toggle icon */}
        <div
          className={[
            "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200",
            isOpen ? "bg-[#D92B2B] text-white rotate-0" : "bg-[#F4F5F7] text-[#6B7280] group-hover:bg-[#D92B2B]/10 group-hover:text-[#D92B2B]",
          ].join(" ")}
        >
          {isOpen ? <TbMinus className="text-sm" /> : <TbPlus className="text-sm" />}
        </div>
      </button>

      {/* Answer — animated height */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-350 ease-in-out"
        style={{
          // eslint-disable-next-line react-hooks/refs
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 400}px` : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.25s ease",
        }}
      >
        <div className="px-6 pb-5 pl-16">
          {/* Red left rule */}
          <div className="relative border-l-2 border-[#D92B2B]/30 pl-4">
            <p
              className="text-[#6B7280] text-sm leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { ref, inView } = useInView(0.08);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = activeCategory === "All"
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  // Reset open item when filter changes
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpenIndex(0); }, [activeCategory]);

  const headerAnim = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  return (
    <section
      id="faq"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative bg-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D92B2B]/25 to-transparent" />

      {/* Faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6B7280 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.05,
        }}
      />

      {/* Large ghost text watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[clamp(8rem,20vw,18rem)] font-black text-[#1C1C1F]/[0.025] leading-none whitespace-nowrap"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          FAQ
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Two-column layout ─────────────────────────── */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-12 lg:gap-16">

          {/* ── LEFT: Sticky sidebar ─────────────────────── */}
          <div className="lg:sticky lg:top-28 lg:self-start flex flex-col gap-8">

            {/* Header */}
            <div style={headerAnim(0)}>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#D92B2B]" />
                <span
                  className="text-[#D92B2B] text-[11px] font-bold tracking-[0.22em] uppercase"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  FAQ
                </span>
              </div>
              <h2
                className="text-[#1C1C1F] font-black leading-[0.93] mb-4"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                }}
              >
                Got
                <br />
                Questions?
                <br />
                <span className="text-[#D92B2B]">We&apos;ve Got</span>
                <br />
                Answers.
              </h2>
              <p
                className="text-[#6B7280] text-sm leading-relaxed"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Everything you need to know about working with Tomsburg Surveillance — from first call to long-term support.
              </p>
            </div>

            {/* Category filters */}
            <div style={headerAnim(0.1)}>
              <p
                className="text-[#1C1C1F] text-xs font-bold tracking-[0.15em] uppercase mb-3"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Filter by topic
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={[
                      "px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200 border",
                      activeCategory === cat
                        ? "bg-[#D92B2B] text-white border-[#D92B2B] shadow-[0_4px_14px_rgba(217,43,43,0.30)]"
                        : "bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#D92B2B]/40 hover:text-[#D92B2B]",
                    ].join(" ")}
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {cat}
                    {cat !== "All" && (
                      <span className={[
                        "ml-1.5 text-[10px] font-black",
                        activeCategory === cat ? "text-white/70" : "text-[#6B7280]/60",
                      ].join(" ")}>
                        {FAQS.filter(f => f.category === cat).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Still have questions card */}
            <div
              className="relative bg-[#1C1C1F] rounded-2xl p-6 overflow-hidden"
              style={headerAnim(0.2)}
            >
              {/* Glow */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(217,43,43,0.25) 0%, transparent 70%)" }}
              />
              {/* Stripe texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: "repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)",
                }}
              />
              <div className="relative">
                <p
                  className="text-white font-black text-lg leading-tight mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Still have questions?
                </p>
                <p
                  className="text-white/50 text-xs leading-relaxed mb-5"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Our team is standing by. Call, email, or request a free callback and we&apos;ll answer everything.
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D92B2B] text-white rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:bg-[#b91c1c] hover:shadow-[0_4px_14px_rgba(217,43,43,0.4)]"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
                  >
                    Send Us a Message
                    <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="tel:+15551234567"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:bg-white/15 border border-white/10"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
                  >
                    <MdOutlinePhoneInTalk className="text-sm" />
                    Call Us Now
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Accordion list ────────────────────── */}
          <div className="flex flex-col gap-3">

            {/* Result count */}
            <div
              className="flex items-center gap-2 mb-1"
              style={headerAnim(0.05)}
            >
              <span
                className="text-[#6B7280] text-xs"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Showing{" "}
                <span className="font-bold text-[#1C1C1F]">{filtered.length}</span>{" "}
                {activeCategory === "All" ? "questions" : `questions in "${activeCategory}"`}
              </span>
              {activeCategory !== "All" && (
                <button
                  onClick={() => setActiveCategory("All")}
                  className="text-[#D92B2B] text-xs font-bold hover:underline"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Clear filter
                </button>
              )}
            </div>

            {filtered.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                inView={inView}
              />
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}