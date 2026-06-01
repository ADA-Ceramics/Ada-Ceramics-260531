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

    // 发送邮件
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY},
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ada Ceramics <info@adaceramics.com>', // 更规范
        to: 'sukichoi@adaceramics.com', // 你收到
        bcc: email, // 客户同时收到确认信（超级重要）
        subject: `New Quote Request from ${fullName}`,
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
