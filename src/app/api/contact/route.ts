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

    // Direct FormSubmit delivery to the.ganeshpulikanti@gmail.com
    const res = await fetch("https://formsubmit.co/ajax/the.ganeshpulikanti@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `[Portfolio Inquiry] New message from ${name}`,
        _captcha: "false",
        _template: "table",
      }),
    });

    const data = await res.json();

    if (data.success === "true" || data.success === true) {
      return NextResponse.json({ success: true });
    } else {
      // If activation link is pending
      return NextResponse.json({
        success: true,
        notice: data.message || "Activation required",
      });
    }
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


