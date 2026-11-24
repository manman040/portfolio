"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Mail,
  Send,
  User,
} from "lucide-react";
import { Github, Linkedin } from "./brand-icons";
import { Guestbook } from "./guestbook";
import { portfolio } from "@/data/portfolio";
import { guestbookEnabled } from "@/lib/guestbook";

export function ContactHub() {
  const [emailDraft, setEmailDraft] = useState<string | null>(null);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sender = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const content = String(data.get("message") ?? "").trim();
    if (!sender || !email || !content || !portfolio.email) return;
    setEmailDraft(
      `mailto:${portfolio.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${sender}`)}&body=${encodeURIComponent(`Name: ${sender}\nEmail: ${email}\n\n${content}`)}`,
    );
  }

  return (
    <div
      className={`contact-hub ${guestbookEnabled ? "" : "contact-hub-single"}`}
    >
      <div className="card contact-form-card">
        <span className="eyebrow">START A CONVERSATION</span>
        <h3>Let’s talk.</h3>
        <p>
          Have an opportunity, a project idea, or a question? I’d love to hear
          from you.
        </p>
        <form
          className="hub-form"
          onSubmit={prepareEmail}
          onChange={() => setEmailDraft(null)}
        >
          <label htmlFor="contact-name">Your name</label>
          <div className="input-with-icon">
            <User size={17} aria-hidden="true" />
            <input
              id="contact-name"
              name="name"
              placeholder="What should I call you?"
              autoComplete="name"
              required
              maxLength={80}
            />
          </div>
          <label htmlFor="contact-email">Email address</label>
          <div className="input-with-icon">
            <Mail size={17} aria-hidden="true" />
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              maxLength={254}
            />
          </div>
          <label htmlFor="contact-message">Your message</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell me what you have in mind…"
            required
            minLength={5}
            maxLength={3000}
            rows={5}
          />
          <button
            type="submit"
            className="button primary"
            disabled={!portfolio.email}
          >
            <Send size={17} /> Prepare email
          </button>
          <p className="form-help">
            Creates a draft for your email app. Nothing is sent from this page.
          </p>
          {emailDraft && (
            <div className="email-draft-result" role="status">
              <p>
                <Check size={15} /> Your draft is ready.
              </p>
              <a href={emailDraft}>
                Open email draft <ArrowUpRight size={16} />
              </a>
              <span>You’ll review and send it in your email app.</span>
            </div>
          )}
        </form>
        <div className="hub-socials">
          <h4>Find me online</h4>
          {portfolio.github && (
            <a
              href={portfolio.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-tile-icon">
                <Github size={23} />
              </span>
              <span>
                <strong>GitHub</strong>
                <small>manman040</small>
              </span>
              <ArrowUpRight size={17} />
            </a>
          )}
          {portfolio.linkedin && (
            <a
              href={portfolio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-tile-icon">
                <Linkedin size={22} />
              </span>
              <span>
                <strong>LinkedIn</strong>
                <small>{portfolio.name}</small>
              </span>
              <ArrowUpRight size={17} />
            </a>
          )}
          {portfolio.resume && (
            <a href={portfolio.resume} download>
              <span className="social-tile-icon">
                <ArrowDownToLine size={22} />
              </span>
              <span>
                <strong>Résumé</strong>
                <small>Get to know my experience</small>
              </span>
              <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </div>
      {guestbookEnabled && <Guestbook />}
    </div>
  );
}
