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

    // Forward message to Web3Forms to deliver directly to the.ganeshpulikanti@gmail.com
    const web3FormsRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || "e45f94a4-569f-4db3-a0e2-6cf6b5b54a7c", // Web3Forms Key
        name,
        email,
        message,
        subject: `[Portfolio Contact] New Message from ${name}`,
        from_name: "Ganesh Pulikanti Portfolio",
        to_email: "the.ganeshpulikanti@gmail.com",
      }),
    });

    const data = await web3FormsRes.json();

    if (data.success) {
      return NextResponse.json({ success: true, message: "Transmission received" });
    } else {
      // Fallback response if web3forms key is pending activation
      console.log("Contact form submission received:", { name, email, message });
      return NextResponse.json({ success: true, message: "Transmission logged" });
    }
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
