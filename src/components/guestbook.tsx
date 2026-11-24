"use client";

import { useEffect, useState, type FormEvent } from "react";
import { MessageSquare, Send, User } from "lucide-react";
import {
  loadComments,
  submitComment,
  type GuestComment,
} from "@/lib/guestbook";

const notices = {
  ok: "Thank you! Your comment will appear once I’ve approved it.",
  limit: "The guestbook is busy right now. Please try again later.",
  links: "Please remove links from your comment and try again.",
  error: "Your comment couldn’t be sent. Please try again later.",
};

export function Guestbook() {
  const [comments, setComments] = useState<GuestComment[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    loadComments(controller.signal)
      .then(setComments)
      .catch(() => {
        if (!controller.signal.aborted) setLoadFailed(true);
      });
    return () => controller.abort();
  }, []);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (sending || !cleanName || cleanMessage.length < 2) return;
    setSending(true);
    setNotice("");
    // Bots fill in the hidden field; their submissions are dropped.
    const result = website ? "ok" : await submitComment(cleanName, cleanMessage);
    setSending(false);
    setNotice(notices[result]);
    if (result === "ok") {
      setName("");
      setMessage("");
    }
  }

  return (
    <div className="card guestbook-card">
      <div className="guestbook-heading">
        <span className="guestbook-icon">
          <MessageSquare size={21} />
        </span>
        <h3>
          Guestbook{" "}
          {comments && comments.length > 0 && <span>({comments.length})</span>}
        </h3>
      </div>
      <p className="guestbook-note">
        Leave a public comment. I approve each one before it appears here.
      </p>
      <form className="hub-form guestbook-form" onSubmit={send}>
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
        <div hidden>
          <input
            name="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-label="Leave this field empty"
          />
        </div>
        <button type="submit" className="button primary" disabled={sending}>
          <Send size={17} /> {sending ? "Sending…" : "Send comment"}
        </button>
        <p className="guestbook-notice" role="status">
          {notice}
        </p>
      </form>
      <div
        className="comment-list"
        role="region"
        aria-label="Guestbook comments"
        tabIndex={0}
      >
        {loadFailed && (
          <p className="guestbook-note">Comments couldn’t be loaded.</p>
        )}
        {!loadFailed && !comments && (
          <p className="guestbook-note">Loading comments…</p>
        )}
        {comments?.length === 0 && (
          <p className="guestbook-note">No comments yet.</p>
        )}
        {comments?.map((comment) => (
          <article className="guest-comment" key={comment.id}>
            <div className="comment-avatar">
              <User size={19} aria-hidden="true" />
            </div>
            <div className="comment-content">
              <div>
                <strong>{comment.name}</strong>
                <span>
                  {new Date(comment.created_at).toLocaleDateString("en-MY", {
                    dateStyle: "medium",
                  })}
                </span>
              </div>
              <p>{comment.message}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
