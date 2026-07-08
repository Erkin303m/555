"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "./logo.png";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Smartphone,
  Menu,
  X,
  Home,
  ShoppingBag,
  ShieldEllipsis,
} from "lucide-react";

const links = [
  { href: "/", label: "Bosh sahifa", icon: Home },
  { href: "/products", label: "Mahsulotlar", icon: ShoppingBag },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={120}
            className="w-15 h-15"
          />
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    active ? "text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 bg-black rounded-full -z-10 animate-[fadeIn_0.25s_ease]" />
                  )}
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Admin button */}
          <Link
            href="/admin"
            title="Admin panel"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300 ml-1"
          >
            <ShieldEllipsis className="w-4 h-4" strokeWidth={1.8} />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Menyu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-56 border-t border-gray-100" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-3 gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <ShieldEllipsis className="w-4 h-4" />
            Admin panel
          </Link>
        </nav>
      </div>
    </header>
  );
}
