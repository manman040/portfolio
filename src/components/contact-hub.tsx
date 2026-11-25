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
import {
  contactSendingEnabled,
  mailtoLink,
  sendMessage,
  type ContactMessage,
} from "@/lib/contact";
import { guestbookEnabled } from "@/lib/guestbook";

type Status = "idle" | "sending" | "sent" | "failed" | "mail";

export function ContactHub() {
  const [status, setStatus] = useState<Status>("idle");
  const [mailLink, setMailLink] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const entry: ContactMessage = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    if (status === "sending" || !portfolio.email) return;
    if (!entry.name || !entry.email || !entry.message) return;
    const link = mailtoLink(portfolio.email, entry);
    setMailLink(link);
    if (!contactSendingEnabled) {
      setStatus("mail");
      window.location.href = link;
      return;
    }
    setStatus("sending");
    // Bots fill in the hidden field; their submissions are dropped.
    const sent = data.get("website") ? true : await sendMessage(entry);
    setStatus(sent ? "sent" : "failed");
    if (sent) form.reset();
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
          onSubmit={submit}
          onChange={() => {
            if (status !== "sending") setStatus("idle");
          }}
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
          <div hidden>
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-label="Leave this field empty"
            />
          </div>
          <button
            type="submit"
            className="button primary"
            disabled={!portfolio.email || status === "sending"}
          >
            <Send size={17} />{" "}
            {!contactSendingEnabled
              ? "Open in email app"
              : status === "sending"
                ? "Sending…"
                : "Send message"}
          </button>
          <p className="form-help">
            {contactSendingEnabled
              ? "Your message is sent to my email through Web3Forms. I’ll reply to the address you enter."
              : "Opens your email app with this message filled in."}
          </p>
          <div role="status">
            {status === "sent" && (
              <div className="form-result">
                <p>
                  <Check size={16} /> Thank you! Your message has been sent.
                </p>
              </div>
            )}
            {(status === "failed" || status === "mail") && (
              <div className="form-result">
                <p>
                  {status === "failed"
                    ? "Sorry, I couldn’t confirm that your message was sent. Please try again, or email me directly."
                    : "Email app didn’t open? Email me directly."}
                </p>
                <a href={mailLink}>
                  <Mail size={16} /> {portfolio.email}
                </a>
              </div>
            )}
          </div>
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
