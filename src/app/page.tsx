import { ArrowUp } from "lucide-react";
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
import { ProfileSchema } from "@/components/profile-schema";

export default function Home() {
  return (
    <>
      <ProfileSchema />
      <ScrollProgress />
      <Navbar />
      <main id="main" className="page-shell">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="footer page-shell">
        <a className="logo" href="#home">
          {portfolio.initials}
          <span>.</span>
          <span className="sr-only"> {portfolio.name}, home</span>
        </a>
        <p>
          © {new Date().getFullYear()} {portfolio.name}
        </p>
        <a href="#home">
          Back to top <ArrowUp size={14} />
        </a>
      </footer>
    </>
  );
}
