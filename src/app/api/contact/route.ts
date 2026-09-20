import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      const web3FormsRes = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message,
          subject: `[Portfolio Contact] New Message from ${name}`,
          from_name: "Ganesh Pulikanti Portfolio",
        }),
      });

      const data = await web3FormsRes.json();
      if (data.success) {
        return NextResponse.json({ success: true });
      }
    }

    // Fallback: Generate direct mailto link for client opening
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:the.ganeshpulikanti@gmail.com?subject=${subject}&body=${body}`;

    return NextResponse.json({
      success: true,
      fallback: true,
      mailtoUrl,
    });
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

