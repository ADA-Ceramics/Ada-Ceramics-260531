import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const {
      fullName,
      company,
      email,
      phone,
      category,
      quantity,
      details,
      attachments,
    } = await req.json();

    // 必传字段校验
    if (!fullName || !email) {
      return NextResponse.json({ success: false, error: "Name and email are required" });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("❌ Resend API key missing");
      return NextResponse.json({ success: false, error: "API key missing" });
    }

    // 处理附件：期望 attachments 为 [{ filename, content(base64) }]
    const emailAttachments = Array.isArray(attachments)
      ? attachments
          .filter((a: unknown): a is { filename: string; content: string } =>
            !!a && typeof (a as { filename?: unknown }).filename === "string" &&
            typeof (a as { content?: unknown }).content === "string"
          )
          .map((a: { filename: string; content: string }) => ({
            filename: a.filename,
            // content 只保留 base64 部分（去掉可能存在的 data URL 前缀）
            content: a.content.includes(",") ? a.content.split(",")[1] : a.content,
          }))
      : [];

    // 发送邮件
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ada Ceramics <info@adaceramics.com>',
        to: 'sukichoi@adaceramics.com',
        bcc: email,
        subject: `New Quote Request from ${fullName}`, // 这里是英文反引号
        html: `
<div style="font-family:Arial; font-size:16px; line-height:1.8;">
  <h3>New Request a Quote</h3>
  <p><strong>Full Name:</strong> ${fullName}</p>
  <p><strong>Company:</strong> ${company || 'N/A'}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone/WhatsApp:</strong> ${phone || 'N/A'}</p>
  <p><strong>Product Category:</strong> ${category || 'N/A'}</p>
  <p><strong>Estimated Quantity:</strong> ${quantity || 'N/A'}</p>
  <p><strong>Project Details:</strong><br>${details || 'N/A'}</p>
</div>
        `,
        ...(emailAttachments.length > 0 ? { attachments: emailAttachments } : {}),
      }),
    });

    const data = await res.json();

    if (res.ok && data.id) {
      return NextResponse.json({ success: true });
    } else {
      console.error("❌ Resend error:", data);
      return NextResponse.json({ success: false, error: data?.message || "Failed to send" });
    }

  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ success: false, error: "Server error" });
  }
}
