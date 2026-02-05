"use client";
import { useEffect, useState } from "react";
import { Menu, X, Mic } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handler (replace with router logic if needed)
  const onNavigate = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-2 rounded-lg">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Intervue<span className="text-emerald-400">.AI</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/features">
            <button className="hover:text-white transition-colors">
              Features
            </button>
          </Link>
          <Link href="/works">
            <button className="hover:text-white transition-colors">
              Methodology
            </button>
          </Link>
          <Link href="/pricing">
            <button className="hover:text-white transition-colors">
              Pricing
            </button>
          </Link>
          <Link href="/login">
            <button className="text-white px-5 py-2.5 rounded-full border border-slate-700 hover:border-emerald-500 transition-all">
              Log in
            </button>
          </Link>
          <Link
            href={
              "/chat?designation=Frontend&role=Developer&field=React&experience=2&difficulty=medium"
            }
          >
            <button className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-semibold hover:bg-emerald-50 transition-colors">
              Start Practicing
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
          <Link href="/features">
            <button className="text-slate-300 hover:text-white py-2 text-left">
              Features
            </button>
          </Link>
          <Link href="/works">
            <button className="text-slate-300 hover:text-white py-2 text-left">
              Methodology
            </button>
          </Link>
          <Link href="/pricing">
            <button className="text-slate-300 hover:text-white py-2 text-left">
              Pricing
            </button>
          </Link>
          <Link href={"/login"}>
            <button className="w-full text-center text-white px-5 py-3 rounded-lg border border-slate-700">
              Log in
            </button>
          </Link>
          <Link
            href={
              "/chat?designation=Frontend&role=Developer&field=React&experience=2&difficulty=medium"
            }
          >
            <button className="w-full text-center bg-emerald-600 text-white px-5 py-3 rounded-lg font-semibold">
              Start Practicing
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
