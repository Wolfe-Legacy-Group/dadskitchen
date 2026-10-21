// Sends transactional email through Postmark.

const POSTMARK_URL = "https://api.postmarkapp.com/email";
const FROM = "Dad's Kitchen <noreply@dadskitchen.org>";

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export type SendResult = { ok: true } | { ok: false; error: string };

export function emailToken(): string | undefined {
  return process.env.POSTMARK_SERVER_TOKEN || undefined;
}

export async function sendEmail(
  token: string,
  message: EmailMessage
): Promise<SendResult> {
  const res = await fetch(POSTMARK_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify({
      From: FROM,
      To: message.to,
      Subject: message.subject,
      HtmlBody: message.html,
      ...(message.replyTo ? { ReplyTo: message.replyTo } : {}),
      MessageStream: "outbound",
    }),
  });

  if (res.ok) return { ok: true };

  const text = await res.text();
  let detail = text;
  try {
    const body = JSON.parse(text) as { ErrorCode?: number; Message?: string };
    detail = `ErrorCode ${body.ErrorCode}: ${body.Message}`;
  } catch {
    // keep the raw text
  }
  return { ok: false, error: `HTTP ${res.status} ${detail}` };
}
