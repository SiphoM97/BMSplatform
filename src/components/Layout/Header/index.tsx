"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => setSticky(window.scrollY >= 80);
  const handleClickOutside = (event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`fixed top-0 z-40 w-full transition-all duration-300 bg-white ${sticky ? "shadow-lg py-5" : "py-6"}`}>
      <div className="container mx-auto flex items-center justify-between px-4 lg:max-w-screen-xl">
        
        {/* Text Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary">Dr Nkuna & Partners</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 items-center">
          <Link href="/" className="text-black hover:text-primary transition">Home</Link>
          <Link href="#about" className="text-black hover:text-primary transition">About</Link>
          <Link href="#services" className="text-black hover:text-primary transition">Services</Link>
          <Link href="#contact" className="text-black hover:text-primary transition">Contact</Link>
          <a
            href="#booking"
            className="bg-primary text-white px-4 py-2 rounded-full hover:bg-secondary transition"
          >
            Book Now
          </a>
          <a
            href="https://wa.me/27821234567?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment"
            target="_blank"
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setNavbarOpen(!navbarOpen)} className="lg:hidden p-2" aria-label="Toggle mobile menu">
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
          <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
        </button>

        {/* Mobile Navigation */}
        {navbarOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" />
        )}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? "translate-x-0" : "translate-x-full"} z-50`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h1 className="text-lg font-bold text-primary">Dr Sibiya Clinic</h1>
            <button
              onClick={() => setNavbarOpen(false)}
              aria-label="Close menu"
              className="text-black hover:text-primary"
            >
              <Icon icon="mdi:close" className="text-2xl" />
            </button>
          </div>
          <nav className="flex flex-col gap-4 p-6">
            <Link href="/" onClick={() => setNavbarOpen(false)}>Home</Link>
            <Link href="#about" onClick={() => setNavbarOpen(false)}>About</Link>
            <Link href="#services" onClick={() => setNavbarOpen(false)}>Services</Link>
            <Link href="#contact" onClick={() => setNavbarOpen(false)}>Contact</Link>
            <a
              href="#booking"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
            >
              Book Now
            </a>
            <a
              href="https://wa.me/27821234567?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment"
              target="_blank"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
