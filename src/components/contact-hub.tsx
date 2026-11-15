"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  ImagePlus,
  Mail,
  MessageSquare,
  Send,
  User,
  X,
} from "lucide-react";
import { Github, Linkedin } from "./brand-icons";
import { portfolio } from "@/data/portfolio";

type DemoComment = {
  id: string;
  name: string;
  message: string;
  avatar: string | null;
  sample: boolean;
};
const samples: DemoComment[] = [
  {
    id: "sample-1",
    name: "Demo visitor",
    message:
      "A sample guestbook message. Your visitors’ thoughts could appear here.",
    avatar: null,
    sample: true,
  },
  {
    id: "sample-2",
    name: "Sample reader",
    message: "This is a layout preview, not a real visitor testimonial.",
    avatar: null,
    sample: true,
  },
  {
    id: "sample-3",
    name: "Demo developer",
    message: "Try adding a comment below to see how the guestbook feels.",
    avatar: null,
    sample: true,
  },
];

export function ContactHub() {
  const [emailDraft, setEmailDraft] = useState<string | null>(null);
  const [comments, setComments] = useState<DemoComment[]>(samples);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [photoLoading, setPhotoLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const photoInput = useRef<HTMLInputElement>(null);
  const photoUrls = useRef(new Set<string>());
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    const urls = photoUrls.current;
    return () => {
      alive.current = false;
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

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

  async function selectPhoto(file: File | undefined) {
    setPhotoError("");
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setPhotoError("Choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Choose an image smaller than 5 MB.");
      return;
    }
    setPhotoLoading(true);
    try {
      const bitmap = await createImageBitmap(file);
      const tooLarge = bitmap.width * bitmap.height > 16_000_000;
      bitmap.close();
      if (!alive.current) return;
      if (tooLarge) {
        setPhotoError("Choose a smaller image (up to 16 megapixels).");
        return;
      }
      const url = URL.createObjectURL(file);
      photoUrls.current.add(url);
      setAvatar(url);
      setFileName(file.name);
    } catch {
      if (alive.current)
        setPhotoError(
          "This image could not be read. Please choose another file.",
        );
    } finally {
      if (alive.current) setPhotoLoading(false);
    }
  }

  function addDemoComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !name.trim() ||
      !message.trim() ||
      photoLoading ||
      comments.filter((comment) => !comment.sample).length >= 20
    )
      return;
    setComments((current) => [
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        message: message.trim(),
        avatar,
        sample: false,
      },
      ...current,
    ]);
    setName("");
    setMessage("");
    setAvatar(null);
    setFileName("");
    setPhotoError("");
    if (photoInput.current) photoInput.current.value = "";
    setNotice(
      "Added to this preview only. Your comment is not published or saved.",
    );
  }

  return (
    <div className="contact-hub">
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
      <div className="card guestbook-card">
        <div className="guestbook-heading">
          <span className="guestbook-icon">
            <MessageSquare size={21} />
          </span>
          <h3>
            Guestbook <span>({comments.length})</span>
          </h3>
          <span className="demo-label">DEMO</span>
        </div>
        <p className="guestbook-demo-note">
          A guestbook preview with fictional sample entries. Anything you add
          stays on this page and disappears when you reload or leave.
        </p>
        <form className="hub-form guestbook-form" onSubmit={addDemoComment}>
          <label htmlFor="guest-name">Your name</label>
          <input
            id="guest-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Leave your name"
            required
            maxLength={60}
            autoComplete="nickname"
          />
          <label htmlFor="guest-message">Comment</label>
          <textarea
            id="guest-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="A thought, a hello, or a little feedback…"
            required
            minLength={2}
            maxLength={500}
            rows={4}
          />
          <span className="message-counter">{message.length} / 500</span>
          <label htmlFor="guest-photo">
            Profile photo <span className="optional-label">(optional)</span>
          </label>
          <div className="guest-photo-control">
            <input
              ref={photoInput}
              id="guest-photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => void selectPhoto(event.target.files?.[0])}
              aria-describedby="photo-help photo-error"
            />
            <span>
              <ImagePlus size={18} />{" "}
              {photoLoading
                ? "Checking image…"
                : fileName || "Choose profile photo"}
            </span>
          </div>
          {avatar && (
            <div className="photo-preview">
              <Image
                src={avatar}
                alt="Your selected profile photo preview"
                width={38}
                height={38}
                unoptimized
              />
              <span>Preview photo selected</span>
              <button
                type="button"
                aria-label="Remove profile photo"
                onClick={() => {
                  setAvatar(null);
                  setFileName("");
                  if (photoInput.current) photoInput.current.value = "";
                }}
              >
                <X size={16} />
              </button>
            </div>
          )}
          <p className="form-help" id="photo-help">
            JPG, PNG, or WebP · Up to 5 MB · Stays in your browser
          </p>
          <p id="photo-error" role="alert" className="form-error">
            {photoError}
          </p>
          <button
            type="submit"
            className="button primary"
            disabled={
              photoLoading ||
              comments.filter((comment) => !comment.sample).length >= 20
            }
          >
            <Send size={17} /> Add demo comment
          </button>
          {notice && (
            <p className="guestbook-notice" role="status">
              {notice}
            </p>
          )}
        </form>
        <div
          className="comment-list"
          role="region"
          aria-label="Demo guestbook comments"
          tabIndex={0}
        >
          {comments.map((comment) => (
            <article className="guest-comment" key={comment.id}>
              <div className="comment-avatar">
                {comment.avatar ? (
                  <Image
                    src={comment.avatar}
                    alt=""
                    width={38}
                    height={38}
                    unoptimized
                  />
                ) : (
                  <User size={19} aria-hidden="true" />
                )}
              </div>
              <div className="comment-content">
                <div>
                  <strong>{comment.name}</strong>
                  <span>
                    {comment.sample ? "Sample entry" : "This session"}
                  </span>
                </div>
                <p>{comment.message}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
