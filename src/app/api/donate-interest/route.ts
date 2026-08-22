import { NextResponse } from "next/server";

interface RequestBody {
  name: string;
  email: string;
  message?: string;
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
  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const firstName = name.trim().split(/\s+/)[0];

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
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;">${name.trim()}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;">Email</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;"><a href="mailto:${email.trim()}" style="color:#b8834a;">${email.trim()}</a></td>
        </tr>
        ${message?.trim() ? `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;font-weight:bold;color:#8a7e6e;vertical-align:top;">Message</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;">${message.trim()}</td>
        </tr>` : ""}
      </table>

      <p style="font-size:13px;color:#8a7e6e;margin:16px 0 0;">
        A confirmation email has been sent to the applicant.
      </p>
    </div>
  `;

  const notifyEmail = process.env.DONATE_NOTIFY_EMAIL ?? "perry@wolfelegacies.com";

  const [confirmRes, notifyRes] = await Promise.all([
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Dad's Kitchen <noreply@dadskitchen.org>",
        to: email.trim(),
        subject: "Thank you for your interest in supporting Dad's Kitchen",
        html: confirmationHtml,
      }),
    }),
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Dad's Kitchen <noreply@dadskitchen.org>",
        to: notifyEmail,
        replyTo: email.trim(),
        subject: `Donation interest: ${name.trim()}`,
        html: notificationHtml,
      }),
    }),
  ]);

  if (!confirmRes.ok) {
    const err = await confirmRes.text();
    console.error("Resend confirmation error:", err);
    return NextResponse.json(
      { error: "Failed to send confirmation" },
      { status: 500 }
    );
  }

  if (!notifyRes.ok) {
    console.error("Resend notification error:", await notifyRes.text());
  }

  return NextResponse.json({ ok: true });
}
