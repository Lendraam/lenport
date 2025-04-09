"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Moon,
  Sun,
  Home,
  Briefcase,
  Mail,
  Star,
  Bot,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const preferred = savedTheme || "light";
    setTheme(preferred);
    document.documentElement.classList.toggle("dark", preferred === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const navLinks = [
    {
      href: "/home",
      label: "home",
      icon: <Home size={18} className="text-blue-500" />,
    },
    {
      href: "/portfolio",
      label: "Portfolio",
      icon: <Briefcase size={18} className="text-purple-500" />,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <Mail size={18} className="text-green-500" />,
    },
    {
      href: "/rating",
      label: "Rating",
      icon: <Star size={18} className="text-yellow-500" />,
    },
    {
      href: "/ai",
      label: "AI",
      icon: <Bot size={18} className="text-pink-500" />,
    },
  ];

  return (
<nav className="bg-[var(--background)] text-[var(--foreground)] shadow-md sticky top-0 z-50">
  <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
    <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2 hover:underline cursor-pointer">
      💻 Lendra's Portfolio
    </Link>
    ...

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 group hover:text-blue-500 transition"
            >
              {React.cloneElement(link.icon, {
                className: `${link.icon.props.className} group-hover:scale-110 transition-transform duration-200`,
              })}
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded-md flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-gray-700" />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 text-sm bg-[var(--background)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 hover:text-blue-500 transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="px-3 py-1 border rounded-md flex items-center gap-2 w-fit"
          >
            {theme === "dark" ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-gray-700" />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      )}
    </nav>
  );
}
