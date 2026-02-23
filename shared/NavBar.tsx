"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

// ─── Palette: Secure Light ───────────────────────────────────────────────────
// #F4F5F7 — Off White (bg)
// #FFFFFF — Pure White (cards/navbar bg)
// #1C1C1F — Near Black (text/nav)
// #D92B2B — Brand Red (CTAs)
// #6B7280 — Slate Grey (subtext)
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Systems", href: "/systems" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Show/hide on scroll direction
      if (currentY < 80) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        // Scrolling down
        setVisible(false);
        setDrawerOpen(false);
      } else {
        // Scrolling up
        setVisible(true);
      }

      setScrolled(currentY > 20);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          visible ? "translate-y-0" : "-translate-y-full",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(28,28,31,0.10)] border-b border-[#F4F5F7]"
            : "bg-white border-b border-transparent",
        ].join(" ")}
      >
        {/* Thin red accent line at very top */}
        <div className="h-[3px] w-full bg-[#D92B2B]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ─────────────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden ring-2 ring-[#D92B2B]/20 group-hover:ring-[#D92B2B]/50 transition-all duration-200">
                <Image
                  src="/images/toms_logo600x600.png"
                  alt="Tomsburg Surveillance Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span
                  className="block text-[#1C1C1F] font-black tracking-tight leading-none"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.25rem" }}
                >
                  TOMSBURG
                </span>
                <span
                  className="block text-[#D92B2B] font-semibold tracking-[0.15em] uppercase leading-none"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.6rem" }}
                >
                  Surveillance
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ─────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-semibold text-[#1C1C1F] tracking-wide uppercase transition-colors duration-150 hover:text-[#D92B2B] group"
                  style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: "0.05em" }}
                >
                  {link.label}
                  {/* Underline hover effect */}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#D92B2B] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                </Link>
              ))}
            </nav>

            {/* ── Desktop CTA + Mobile Hamburger ───────────────── */}
            <div className="flex items-center gap-3">
              {/* Get a Quote button — hidden on mobile */}
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#D92B2B] text-white text-sm font-bold tracking-wide uppercase transition-all duration-150 hover:bg-[#b91c1c] hover:shadow-lg hover:shadow-[#D92B2B]/25 active:scale-95"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
              >
                <MdSecurity className="text-base" />
                Get a Quote
              </Link>

              {/* Hamburger — visible on md and below */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-[#1C1C1F] hover:bg-[#F4F5F7] transition-colors duration-150"
                aria-label="Open navigation menu"
              >
                <RxHamburgerMenu className="text-2xl" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ───────────────────────────────────────── */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
        <DrawerContent
          className="h-full w-[300px] ml-auto rounded-none border-l border-[#F4F5F7] bg-white flex flex-col"
          style={{ maxWidth: "85vw" }}
        >
          {/* Drawer Header */}
          <DrawerHeader className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#F4F5F7]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#D92B2B]/30">
                <Image
                  src="/toms_logo600x600.png"
                  alt="Tomsburg Surveillance Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <DrawerTitle
                className="text-[#1C1C1F] font-black tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}
              >
                TOMSBURG
              </DrawerTitle>
            </div>
            <DrawerClose asChild>
              <button
                className="flex items-center justify-center w-9 h-9 rounded-md text-[#6B7280] hover:text-[#1C1C1F] hover:bg-[#F4F5F7] transition-colors"
                aria-label="Close menu"
              >
                <IoClose className="text-xl" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {/* Drawer Nav Links */}
          <nav className="flex flex-col px-4 py-4 flex-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-[#1C1C1F] font-semibold tracking-wide uppercase text-sm transition-all duration-150 hover:bg-[#F4F5F7] hover:text-[#D92B2B] group"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  letterSpacing: "0.05em",
                  animationDelay: `${i * 50}ms`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B] opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Drawer CTA */}
          <div className="px-6 py-6 border-t border-[#F4F5F7]">
            <Link
              href="/contact"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-[#D92B2B] text-white font-bold uppercase tracking-wide text-sm transition-all duration-150 hover:bg-[#b91c1c] active:scale-95"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.07em" }}
            >
              <MdSecurity className="text-base" />
              Get a Free Quote
            </Link>
            <p className="text-center text-[#6B7280] text-xs mt-3" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Licensed & Insured · Serving the Tri-State Area
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}