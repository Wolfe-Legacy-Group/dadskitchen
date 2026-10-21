import { NextResponse } from "next/server";
import { escapeHtml } from "@/lib/escape-html";
import { emailToken, sendEmail } from "@/lib/email";
import { clientIp, createRateLimiter, isValidEmail, singleLine } from "@/lib/email-guards";

interface RequestBody {
  name: string;
  email: string;
  message?: string;
}

const NAME_MAX = 100;
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
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  if (
    name.length > NAME_MAX ||
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

  const firstName = escapeHtml(name.split(/\s+/)[0]);

  const confirmationHtml = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2c2416;background:#ffffff;padding:32px;border-radius:12px;">
      <h1 style="font-size:24px;color:#b8834a;margin:0 0 4px;">Dad's Kitchen</h1>
      <p style="font-size:14px;color:#8a7e6e;margin:0 0 24px;">Mens Philanthropy Foundation</p>

      <h2 style="font-size:20px;color:#2c2416;margin:0 0 16px;">Thank you, ${firstName}.</h2>

      <p style="font-size:15px;color:#6b5d4f;line-height:1.7;margin:0 0 16px;">
        We've received your interest in supporting Dad's Kitchen. It means a lot that you want to be part of what we're building.
      </p>

      <p style="font-size:15px;color:#6b5d4f;line-height:1.7;margin:0 0 16px;">
        We'll be sending you our 501(c)(3) documentation along with details on how your contribution will be used. Expect to hear from us soon.
      </p>

      <p style="font-size:15px;color:#6b5d4f;line-height:1.7;margin:0 0 24px;">
        In the meantime, feel free to explore our recipes and try one with your family.
      </p>

      <div style="text-align:center;margin:24px 0;">
        <a href="https://dadskitchen.org/recipes" style="display:inline-block;background:#b8834a;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">
          Browse recipes
        </a>
      </div>

      <hr style="border:none;border-top:1px solid #e0d6c8;margin:24px 0;" />
      <p style="font-size:11px;color:#8a7e6e;text-align:center;margin:0;">
        Dad's Kitchen — A program of the Mens Philanthropy Foundation<br/>
        Strengthening fathers through the kitchen
      </p>
    </div>
  `;

  const notificationHtml = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2c2416;background:#ffffff;padding:32px;border-radius:12px;">
      <h1 style="font-size:24px;color:#b8834a;margin:0 0 4px;">Dad's Kitchen</h1>
      <p style="font-size:14px;color:#8a7e6e;margin:0 0 24px;">New donation interest</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;width:100px;">Name</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;">Email</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;"><a href="mailto:${escapeHtml(email)}" style="color:#b8834a;">${escapeHtml(email)}</a></td>
        </tr>
        ${message ? `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;vertical-align:top;">Message</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;">${escapeHtml(message)}</td>
        </tr>` : ""}
      </table>

      <p style="font-size:13px;color:#8a7e6e;margin:16px 0 0;">
        A confirmation email has been sent to the applicant.
      </p>
    </div>
  `;

  const notifyEmail = process.env.DONATE_NOTIFY_EMAIL ?? "perry@wolfelegacies.com";

  const [confirmResult, notifyResult] = await Promise.all([
    sendEmail(token, {
      to: email,
      subject: "Thank you for your interest in supporting Dad's Kitchen",
      html: confirmationHtml,
    }),
    sendEmail(token, {
      to: notifyEmail,
      replyTo: email,
      subject: `Donation interest: ${name}`,
      html: notificationHtml,
    }),
  ]);

  // A lost notification is the Operator's problem, not the applicant's: log
  // it with enough to recover the lead from the logs, whatever happens next.
  if (!notifyResult.ok) {
    console.error(
      `donate-interest notification failed: ${notifyResult.error} | applicant name=${JSON.stringify(name)} email=${JSON.stringify(email)}`
    );
  }

  // The applicant's result follows the applicant's own email.
  if (!confirmResult.ok) {
    console.error(
      `donate-interest confirmation failed: ${confirmResult.error}`
    );
    return NextResponse.json(
      { error: "Failed to send confirmation" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
