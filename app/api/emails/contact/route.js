import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { fullName, email, contactNumber, message } = await request.json();


    const data = await resend.emails.send({
      from: "Supreme Infrastructure <contact@supremeinfrastructure.in>", // Update this with your verified domain
      to: "hrsupremewebsite@gmail.com", // Update this with your receiving email
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

  
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
