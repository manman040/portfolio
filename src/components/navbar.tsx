"use client";
import { useEffect, useState } from "react";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { navigation, portfolio } from "@/data/portfolio";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    navigation.forEach((item) => {
      const element = document.getElementById(item.toLowerCase());
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header home-nav">
      <div className="nav-shell">
        <a href="#home" className="logo">
          {portfolio.initials}
          <span>.</span>
          <span className="sr-only"> {portfolio.name}, home</span>
        </a>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "nav-links open" : "nav-links"}
        >
          {navigation.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              aria-current={
                active === item.toLowerCase() ? "location" : undefined
              }
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
        {portfolio.resume && (
          <a
            className="nav-contact"
            href={portfolio.resume}
            download={portfolio.resumeFileName}
          >
            Résumé <ArrowDownToLine size={15} />
          </a>
        )}
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
