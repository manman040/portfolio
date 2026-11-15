import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import {
  About,
  Contact,
  Experience,
  Hero,
  Projects,
  Skills,
} from "@/components/sections";
import { portfolio } from "@/data/portfolio";
import { ScrollProgress } from "@/components/reveal";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main" className="page-shell">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="footer page-shell">
        <a className="logo" href="#home">
          {portfolio.initials}
          <span>.</span>
        </a>
        <p>
          © {new Date().getFullYear()} {portfolio.name}. Built with intention.
        </p>
        <a href="#home">
          Back to top <ArrowUpRight size={14} />
        </a>
      </footer>
    </>
  );
}
