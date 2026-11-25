// Web3Forms emails each message to the address registered with this access key.
// The key is used in the browser and only allows submitting to that address.
const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export const contactSendingEnabled = Boolean(key);

export type ContactMessage = { name: string; email: string; message: string };

export async function sendMessage({
  name,
  email,
  message,
}: ContactMessage): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `Portfolio enquiry from ${name}`,
        name,
        email,
        message,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
}

export function mailtoLink(
  address: string,
  { name, email, message }: ContactMessage,
) {
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`,
  );
  return `mailto:${address}?subject=${subject}&body=${body}`;
}
