"use client";
import { Menu, Rocket, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
          <div className="bg-gradient-to-br from-violet-600 to-blue-600 p-2 rounded-lg">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl !text-white font-bold tracking-tight">
            Valid<span className="text-violet-400">8r</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#" className="hover:text-white transition-colors">
            How it Works
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Pricing
          </a>
          {/* <button className="text-white px-5 py-2.5 rounded-full border border-slate-700 hover:border-violet-500 transition-all">
              Log in
            </button> */}
          <Link
            href={"/chat"}
            className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-semibold hover:bg-violet-50 transition-colors"
          >
            Start Validating
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-4 flex flex-col gap-4 shadow-2xl">
          <a href="#" className="text-slate-300 hover:text-white py-2">
            Features
          </a>
          <a href="#" className="text-slate-300 hover:text-white py-2">
            How it Works
          </a>
          <a href="#" className="text-slate-300 hover:text-white py-2">
            Pricing
          </a>
          <button className="w-full text-center text-white px-5 py-3 rounded-lg border border-slate-700">
            Log in
          </button>
          <button className="w-full text-center bg-violet-600 text-white px-5 py-3 rounded-lg font-semibold">
            Start Validating
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
