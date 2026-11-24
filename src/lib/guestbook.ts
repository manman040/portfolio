// Both values are public by design: row-level security in supabase/guestbook.sql
// controls access. Never put a secret or service_role key here.
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
const endpoint = `${url}/rest/v1/guestbook_comments`;

export const guestbookEnabled = Boolean(url && key);

export type GuestComment = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

export async function loadComments(
  signal: AbortSignal,
): Promise<GuestComment[]> {
  const response = await fetch(
    `${endpoint}?select=id,name,message,created_at&approved=is.true&order=created_at.desc&limit=50`,
    { headers: { apikey: key }, signal },
  );
  if (!response.ok) throw new Error("Could not load comments");
  return response.json();
}

export async function submitComment(
  name: string,
  message: string,
): Promise<"ok" | "limit" | "links" | "error"> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: key,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ name, message }),
    });
    if (response.ok) return "ok";
    const body = await response.text();
    if (body.includes("guestbook_limit")) return "limit";
    if (body.includes("guestbook_links")) return "links";
    return "error";
  } catch {
    return "error";
  }
}
