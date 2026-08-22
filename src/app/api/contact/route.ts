import { NextResponse } from "next/server";

interface RequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  const body: RequestBody = await request.json();
  const { name, email, subject, message } = body;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const notifyEmail =
    process.env.CONTACT_NOTIFY_EMAIL ?? "perry@wolfelegacies.com";

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2c2416;background:#ffffff;padding:32px;border-radius:12px;">
      <h1 style="font-size:24px;color:#b8834a;margin:0 0 4px;">Dad's Kitchen</h1>
      <p style="font-size:14px;color:#8a7e6e;margin:0 0 24px;">New contact form message</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;width:100px;">Name</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;">${name.trim()}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;">Email</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;"><a href="mailto:${email.trim()}" style="color:#b8834a;">${email.trim()}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;">Subject</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;">${subject.trim()}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;vertical-align:top;">Message</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;white-space:pre-wrap;">${message.trim()}</td>
        </tr>
      </table>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Dad's Kitchen <noreply@dadskitchen.org>",
      to: notifyEmail,
      replyTo: email.trim(),
      subject: `[Dad's Kitchen] ${subject.trim()} — ${name.trim()}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend contact error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
