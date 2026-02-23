"use client";

import { useRef, useState, useEffect } from "react";
import {
  MdOutlinePhoneInTalk,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineAccessTime,
  MdCheckCircle,
} from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { HiArrowRight } from "react-icons/hi";
import { RiShieldCheckFill } from "react-icons/ri";

// ─── Palette: Secure Light ───────────────────────────────────────────────────
// #F4F5F7 — Off White · #FFFFFF — Pure White
// #1C1C1F — Near Black · #D92B2B — Brand Red · #6B7280 — Slate Grey
// ─────────────────────────────────────────────────────────────────────────────

const SERVICE_OPTIONS = [
  "CCTV Installation",
  "Commercial Security",
  "Residential Security",
  "Cloud & Remote Monitoring",
  "Alarm & Intrusion Detection",
  "System Upgrade / Repair",
  "Free Assessment",
  "Other",
];

const CONTACT_INFO = [
  {
    icon: <MdOutlinePhoneInTalk />,
    label: "Call Us",
    value: "(555) 123-4567",
    sub: "Mon – Sat, 8AM – 6PM",
    href: "tel:+15551234567",
  },
  {
    icon: <MdOutlineEmail />,
    label: "Email Us",
    value: "info@tomsburg.com",
    sub: "We reply within 2 hours",
    href: "mailto:info@tomsburg.com",
  },
  {
    icon: <MdOutlineLocationOn />,
    label: "Service Area",
    value: "Tri-State Region",
    sub: "NY · NJ · CT",
    href: "#",
  },
  {
    icon: <MdOutlineAccessTime />,
    label: "Emergency Line",
    value: "24/7 Available",
    sub: "For existing clients",
    href: "tel:+15551234567",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  services: string[];
  message: string;
};

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

// Floating label input
function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={[
          "w-full bg-[#F4F5F7] border rounded-xl px-4 pt-6 pb-2 text-sm text-[#1C1C1F] outline-none transition-all duration-200 peer",
          focused
            ? "border-[#D92B2B] ring-2 ring-[#D92B2B]/15 bg-white"
            : "border-[#E5E7EB] hover:border-[#D92B2B]/30",
        ].join(" ")}
        style={{ fontFamily: "'Barlow', sans-serif" }}
      />
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none font-semibold transition-all duration-200",
          raised
            ? "top-2 text-[10px] tracking-[0.1em] uppercase text-[#D92B2B]"
            : "top-1/2 -translate-y-1/2 text-sm text-[#6B7280]",
        ].join(" ")}
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {label}{required && " *"}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className={[
          "w-full bg-[#F4F5F7] border rounded-xl px-4 pt-7 pb-3 text-sm text-[#1C1C1F] outline-none transition-all duration-200 resize-none",
          focused
            ? "border-[#D92B2B] ring-2 ring-[#D92B2B]/15 bg-white"
            : "border-[#E5E7EB] hover:border-[#D92B2B]/30",
        ].join(" ")}
        style={{ fontFamily: "'Barlow', sans-serif" }}
      />
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none font-semibold transition-all duration-200",
          raised
            ? "top-2 text-[10px] tracking-[0.1em] uppercase text-[#D92B2B]"
            : "top-5 text-sm text-[#6B7280]",
        ].join(" ")}
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactSection() {
  const { ref, inView } = useInView(0.08);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    services: [],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleService = (s: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call — replace with your form handler (e.g. Resend, EmailJS, server action)
    await new Promise((res) => setTimeout(res, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const anim = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @keyframes successPop {
          0%   { opacity: 0; transform: scale(0.85) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .submit-spinner {
          animation: spinSlow 0.8s linear infinite;
        }
      `}</style>

      <section
        id="contact"
        ref={ref as React.RefObject<HTMLElement>}
        className="relative bg-[#F4F5F7] py-20 lg:py-28 overflow-hidden"
      >
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D92B2B]/25 to-transparent" />

        {/* Background: large red glow blobs */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(217,43,43,0.07) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(217,43,43,0.05) 0%, transparent 70%)" }}
        />
        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #1C1C1F 0px, #1C1C1F 1px, transparent 1px, transparent 16px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section header ──────────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-4 mb-12" style={anim(0)}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#D92B2B]" />
                <span
                  className="text-[#D92B2B] text-[11px] font-bold tracking-[0.22em] uppercase"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Get In Touch
                </span>
              </div>
              <h2
                className="text-[#1C1C1F] font-black leading-[0.93]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.6rem, 5vw, 4rem)",
                }}
              >
                Let&apos;s Secure
                <br />
                <span className="text-[#D92B2B]">Your Property.</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p
                className="text-[#6B7280] text-base leading-relaxed max-w-md"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Fill out the form below and our team will reach out within 2 hours to schedule your free no-obligation security assessment.
              </p>
            </div>
          </div>

          {/* ── Main grid: form + sidebar ────────────────────── */}
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 items-start">

            {/* ── FORM ──────────────────────────────────────── */}
            <div
              className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_8px_40px_rgba(28,28,31,0.07)] overflow-hidden"
              style={anim(0.1)}
            >
              {/* Form top red bar */}
              <div className="h-[3px] bg-gradient-to-r from-[#D92B2B] via-[#ff6b6b] to-[#D92B2B]" />

              {submitted ? (
                /* ── Success state ── */
                <div
                  className="flex flex-col items-center justify-center text-center px-8 py-20 gap-5"
                  style={{ animation: "successPop 0.5s ease forwards" }}
                >
                  <div className="w-20 h-20 rounded-full bg-[#D92B2B]/10 flex items-center justify-center">
                    <MdCheckCircle className="text-[#D92B2B] text-5xl" />
                  </div>
                  <h3
                    className="text-[#1C1C1F] font-black text-3xl"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Message Received!
                  </h3>
                  <p
                    className="text-[#6B7280] text-sm max-w-sm leading-relaxed"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Thanks for reaching out. One of our security specialists will contact you within 2 hours to discuss your needs and schedule your free assessment.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {["Licensed & Insured", "No Obligation", "Free Assessment"].map((b) => (
                      <span
                        key={b}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] bg-[#F4F5F7] px-3 py-1.5 rounded-full border border-[#E5E7EB]"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
                        {b}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", propertyType: "", services: [], message: "" }); }}
                    className="mt-2 text-[#D92B2B] text-sm font-bold underline-offset-2 hover:underline"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                /* ── Form fields ── */
                <form onSubmit={handleSubmit} className="p-6 lg:p-8 flex flex-col gap-5">

                  {/* Row 1: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FloatingInput
                      id="name"
                      label="Full Name"
                      value={form.name}
                      onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                      required
                    />
                    <FloatingInput
                      id="email"
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                      required
                    />
                  </div>

                  {/* Row 2: Phone + Property type */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FloatingInput
                      id="phone"
                      label="Phone Number"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
                    />
                    {/* Property type select */}
                    <div className="relative">
                      <select
                        id="propertyType"
                        value={form.propertyType}
                        onChange={(e) => setForm((p) => ({ ...p, propertyType: e.target.value }))}
                        className={[
                          "w-full bg-[#F4F5F7] border rounded-xl px-4 pt-6 pb-2 text-sm text-[#1C1C1F] outline-none transition-all duration-200 appearance-none cursor-pointer",
                          form.propertyType
                            ? "border-[#E5E7EB]"
                            : "border-[#E5E7EB] hover:border-[#D92B2B]/30",
                        ].join(" ")}
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        <option value="" disabled />
                        <option>Residential</option>
                        <option>Small Business</option>
                        <option>Commercial / Industrial</option>
                        <option>Multi-Site / Enterprise</option>
                      </select>
                      <label
                        htmlFor="propertyType"
                        className={[
                          "absolute left-4 pointer-events-none font-semibold transition-all duration-200",
                          form.propertyType
                            ? "top-2 text-[10px] tracking-[0.1em] uppercase text-[#D92B2B]"
                            : "top-1/2 -translate-y-1/2 text-sm text-[#6B7280]",
                        ].join(" ")}
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        Property Type
                      </label>
                      {/* Chevron */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Services selector */}
                  <div>
                    <p
                      className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#6B7280] mb-2.5"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      Services Interested In
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((s) => {
                        const active = form.services.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleService(s)}
                            className={[
                              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 border",
                              active
                                ? "bg-[#D92B2B] text-white border-[#D92B2B] shadow-[0_2px_10px_rgba(217,43,43,0.25)]"
                                : "bg-[#F4F5F7] text-[#6B7280] border-[#E5E7EB] hover:border-[#D92B2B]/40 hover:text-[#D92B2B]",
                            ].join(" ")}
                            style={{ fontFamily: "'Barlow', sans-serif" }}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <FloatingTextarea
                    id="message"
                    label="Tell us about your property or project"
                    value={form.message}
                    onChange={(v) => setForm((p) => ({ ...p, message: v }))}
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting || !form.name || !form.email}
                    className={[
                      "group w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black uppercase tracking-wide text-sm transition-all duration-200",
                      submitting || !form.name || !form.email
                        ? "bg-[#6B7280]/30 text-[#6B7280] cursor-not-allowed"
                        : "bg-[#D92B2B] text-white hover:bg-[#b91c1c] hover:shadow-[0_8px_28px_rgba(217,43,43,0.35)] hover:-translate-y-0.5 active:scale-95",
                    ].join(" ")}
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
                  >
                    {submitting ? (
                      <>
                        <svg className="submit-spinner w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <TbSend className="text-lg" />
                        Send My Request
                        <HiArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p
                    className="text-center text-[#6B7280] text-xs"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    We typically respond within 2 hours · No spam, ever.
                  </p>
                </form>
              )}
            </div>

            {/* ── SIDEBAR ───────────────────────────────────── */}
            <div className="flex flex-col gap-4">

              {/* Contact info cards */}
              {CONTACT_INFO.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-4 bg-white rounded-xl border border-[#E5E7EB] px-5 py-4 shadow-sm transition-all duration-200 hover:border-[#D92B2B]/40 hover:shadow-md hover:-translate-y-0.5"
                  style={anim(0.15 + i * 0.07)}
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#F4F5F7] text-[#D92B2B] flex items-center justify-center text-xl transition-all duration-200 group-hover:bg-[#D92B2B] group-hover:text-white group-hover:shadow-[0_4px_14px_rgba(217,43,43,0.3)]">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[#6B7280] text-[10px] font-bold tracking-[0.15em] uppercase"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-[#1C1C1F] font-bold text-sm truncate"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {item.value}
                    </p>
                    <p
                      className="text-[#6B7280] text-xs"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {item.sub}
                    </p>
                  </div>
                  <HiArrowRight className="flex-shrink-0 text-[#6B7280] text-sm opacity-0 group-hover:opacity-100 group-hover:text-[#D92B2B] transition-all duration-200" />
                </a>
              ))}

              {/* Trust badge block */}
              <div
                className="bg-[#1C1C1F] rounded-2xl p-6 relative overflow-hidden"
                style={anim(0.45)}
              >
                <div
                  className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(217,43,43,0.22) 0%, transparent 70%)" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)",
                  }}
                />
                <div className="relative flex items-start gap-4">
                  <RiShieldCheckFill className="text-[#D92B2B] text-4xl flex-shrink-0 mt-0.5" />
                  <div>
                    <p
                      className="text-white font-black text-lg leading-tight mb-1"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      Your info is safe with us.
                    </p>
                    <p
                      className="text-white/45 text-xs leading-relaxed"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      We never share your details with third parties. Your request goes directly to our team — no spam, no sales calls from strangers.
                    </p>
                  </div>
                </div>
                <div className="relative mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-3">
                  {["Licensed & Insured", "No Obligation", "5-Year Warranty"].map((b) => (
                    <span
                      key={b}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-white/50 uppercase tracking-wide"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      <span className="w-1 h-1 rounded-full bg-[#D92B2B]" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}