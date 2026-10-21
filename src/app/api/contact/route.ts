import { NextResponse } from "next/server";
import { escapeHtml } from "@/lib/escape-html";
import { emailToken, sendEmail } from "@/lib/email";
import { clientIp, createRateLimiter, isValidEmail, singleLine } from "@/lib/email-guards";

interface RequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const NAME_MAX = 100;
const SUBJECT_MAX = 200;
const MESSAGE_MAX = 5000;

const limiter = createRateLimiter();

export async function POST(request: Request) {
  const token = emailToken();
  if (!token) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  let body: Partial<RequestBody>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = typeof body?.name === "string" ? singleLine(body.name) : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const subject = typeof body?.subject === "string" ? singleLine(body.subject) : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (
    name.length > NAME_MAX ||
    subject.length > SUBJECT_MAX ||
    message.length > MESSAGE_MAX ||
    !isValidEmail(email)
  ) {
    return NextResponse.json(
      { error: "Please check your entries and try again" },
      { status: 400 }
    );
  }

  const ip = clientIp(request);
  const now = Date.now();
  if (limiter.isLimited(ip, now)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }
  limiter.record(ip, now);

  const notifyEmail =
    process.env.CONTACT_NOTIFY_EMAIL ?? "perry@wolfelegacies.com";

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2c2416;background:#ffffff;padding:32px;border-radius:12px;">
      <h1 style="font-size:24px;color:#b8834a;margin:0 0 4px;">Dad's Kitchen</h1>
      <p style="font-size:14px;color:#8a7e6e;margin:0 0 24px;">New contact form message</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;width:100px;">Name</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;">Email</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;"><a href="mailto:${escapeHtml(email)}" style="color:#b8834a;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;">Subject</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;">${escapeHtml(subject)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;vertical-align:top;">Message</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;white-space:pre-wrap;">${escapeHtml(message)}</td>
        </tr>
      </table>
    </div>
  `;

  const result = await sendEmail(token, {
    to: notifyEmail,
    replyTo: email,
    subject: `[Dad's Kitchen] ${subject} — ${name}`,
    html,
  });

  if (!result.ok) {
    console.error("Postmark contact error:", result.error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
