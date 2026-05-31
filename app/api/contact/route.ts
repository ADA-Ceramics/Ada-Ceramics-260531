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

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("❌ Resend API key missing");
      return NextResponse.json({ success: false, error: "API key missing" });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'info@adaceramics.com',
        to: 'sukichoi@adaceramics.com',
        subject: `New Inquiry from ${fullName}`,
        html: `
          <div style="font-family:Arial; font-size:16px; line-height:1.8;">
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
    if (data.id) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: data });
    }

  } catch (err) {
    console.error("❌ Send error:", err);
    return NextResponse.json({ success: false, error: "Server error" });
  }
}
