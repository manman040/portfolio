"use client";

import { useState, type FormEvent } from "react";
import { Check, Mail, Send, User } from "lucide-react";
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
    <div className="contact-hub">
      <div className="card contact-form-card">
        <h3>Send a message</h3>
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
              placeholder="Your full name"
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
            placeholder="Role, project, or question"
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
      </div>
      {guestbookEnabled && <Guestbook />}
    </div>
  );
}
