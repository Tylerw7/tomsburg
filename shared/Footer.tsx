"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MdOutlinePhoneInTalk,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineAccessTime,
} from "react-icons/md";
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandYoutube,
  TbBrandGoogle,
} from "react-icons/tb";
import { RiShieldCheckFill } from "react-icons/ri";
import { HiArrowRight } from "react-icons/hi";

// ─── Palette: Secure Light ───────────────────────────────────────────────────
// #F4F5F7 — Off White · #FFFFFF — Pure White
// #1C1C1F — Near Black · #D92B2B — Brand Red · #6B7280 — Slate Grey
// ─────────────────────────────────────────────────────────────────────────────

const NAV_COLUMNS = [
  {
    heading: "Services",
    links: [
      { label: "CCTV Installation",         href: "/services/cctv" },
      { label: "Commercial Security",        href: "/services/commercial" },
      { label: "Residential Security",       href: "/services/residential" },
      { label: "Cloud & Remote Monitoring",  href: "/services/cloud" },
      { label: "Alarm & Intrusion Detection",href: "/services/alarm" },
      { label: "System Upgrades",            href: "/services/upgrades" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",       href: "/about" },
      { label: "How It Works",   href: "/#how-it-works" },
      { label: "Why Choose Us",  href: "/#why-choose-us" },
      { label: "Testimonials",   href: "/#testimonials" },
      { label: "FAQ",            href: "/#faq" },
      { label: "Careers",        href: "/careers" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Get a Free Quote",   href: "/contact" },
      { label: "Schedule Assessment",href: "/contact" },
      { label: "Support Portal",     href: "/support" },
      { label: "Emergency Line",     href: "tel:+15551234567" },
    ],
  },
];

const SOCIALS = [
  { icon: <TbBrandFacebook />,  href: "https://facebook.com",  label: "Facebook"  },
  { icon: <TbBrandInstagram />, href: "https://instagram.com", label: "Instagram" },
  { icon: <TbBrandLinkedin />,  href: "https://linkedin.com",  label: "LinkedIn"  },
  { icon: <TbBrandYoutube />,   href: "https://youtube.com",   label: "YouTube"   },
  { icon: <TbBrandGoogle />,    href: "https://google.com",    label: "Google"    },
];

const TRUST_BADGES = [
  "Licensed & Insured",
  "5-Year Warranty",
  "24/7 Support",
  "No Subcontractors",
  "Free Assessment",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1C1C1F] overflow-hidden">

      {/* ── Background decorations ─────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, #fff 0px, #fff 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,43,43,0.14) 0%, transparent 65%)" }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,43,43,0.08) 0%, transparent 70%)" }}
      />

      {/* Top red hairline */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D92B2B] to-transparent" />

      {/* ════════════════════════════════════════════════════
          CTA BANNER — above main footer body
      ════════════════════════════════════════════════════ */}
      <div className="relative border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p
                className="text-[#D92B2B] text-[11px] font-bold tracking-[0.22em] uppercase mb-1"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Ready to get protected?
              </p>
              <h3
                className="text-white font-black text-2xl lg:text-3xl leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Get Your Free Security Assessment Today.
              </h3>
            </div>
            <Link
              href="/contact"
              className="group flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#D92B2B] text-white rounded-xl font-bold uppercase tracking-wide text-sm transition-all duration-200 hover:bg-[#b91c1c] hover:shadow-[0_8px_28px_rgba(217,43,43,0.4)] hover:-translate-y-0.5 active:scale-95"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
            >
              Get a Free Quote
              <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          MAIN FOOTER BODY
      ════════════════════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">

          {/* ── Brand column ────────────────────────────── */}
          <div className="flex flex-col gap-7">

            {/* Logo + wordmark */}
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#D92B2B]/30 group-hover:ring-[#D92B2B]/60 transition-all duration-200">
                <Image
                  src="/images/toms_logo600x600.png"
                  alt="Tomsburg Surveillance Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span
                  className="block text-white font-black tracking-tight leading-none"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.3rem" }}
                >
                  TOMSBURG
                </span>
                <span
                  className="block text-[#D92B2B] font-semibold tracking-[0.18em] uppercase leading-none"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.6rem" }}
                >
                  Surveillance
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p
              className="text-white/45 text-sm leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Professional security camera installation for commercial and residential properties. Trusted by 500+ clients across the Tri-State area.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              {[
                { icon: <MdOutlinePhoneInTalk />, text: "(555) 123-4567", href: "tel:+15551234567" },
                { icon: <MdOutlineEmail />,        text: "info@tomsburg.com", href: "mailto:info@tomsburg.com" },
                { icon: <MdOutlineLocationOn />,   text: "New York, NJ & Connecticut", href: "#" },
                { icon: <MdOutlineAccessTime />,   text: "Mon–Sat 8AM–6PM · 24/7 Emergency", href: "#" },
              ].map((item) => (
                <a
                  key={item.text}
                  href={item.href}
                  className="flex items-center gap-3 group w-fit"
                >
                  <span className="text-[#D92B2B] text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                    {item.icon}
                  </span>
                  <span
                    className="text-white/50 text-xs group-hover:text-white/80 transition-colors duration-150"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {item.text}
                  </span>
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/50 text-base transition-all duration-200 hover:bg-[#D92B2B] hover:text-white hover:border-[#D92B2B] hover:shadow-[0_4px_12px_rgba(217,43,43,0.35)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav columns ─────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {NAV_COLUMNS.map((col) => (
              <div key={col.heading}>
                <p
                  className="text-white font-black text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {col.heading}
                  <span className="block w-6 h-[2px] bg-[#D92B2B] mt-2" />
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1.5 text-white/45 text-xs hover:text-white transition-colors duration-150"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        <span className="w-0 h-px bg-[#D92B2B] group-hover:w-3 transition-all duration-200 flex-shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* ── Trust badges row ───────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-white/[0.07]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
            <RiShieldCheckFill className="text-[#D92B2B] text-xl flex-shrink-0" />
            {TRUST_BADGES.map((badge, i) => (
              <div key={badge} className="flex items-center gap-x-6">
                <span
                  className="text-white/35 text-[11px] font-bold tracking-[0.14em] uppercase"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {badge}
                </span>
                {i < TRUST_BADGES.length - 1 && (
                  <span className="text-white/15 text-xs">·</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ════════════════════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════════════════════ */}
      <div className="relative border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p
            className="text-white/25 text-xs"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            © {year} Tomsburg Surveillance. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy",    href: "/privacy" },
              { label: "Terms of Service",  href: "/terms" },
              { label: "Sitemap",           href: "/sitemap.xml" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-white/25 text-xs hover:text-white/60 transition-colors duration-150"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}