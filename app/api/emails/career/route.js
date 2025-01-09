import { NextResponse } from "next/server";
import { Resend } from "resend";
import { put } from "@vercel/blob";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const position = formData.get("position");
    const experience = formData.get("experience");
    const additionalInfo = formData.get("additionalInfo");
    const resumeFile = formData.get("resume");

    // Upload resume to Vercel Blob storage
    const fileExtension = resumeFile.name.split(".").pop();
    const fileName = `${firstName}-${lastName}-resume-${Date.now()}.${fileExtension}`;

    const blob = await put(fileName, resumeFile, {
      access: "public",
      addRandomSuffix: true, // Adds a random suffix to ensure uniqueness
    });

    console.log(blob.url);

    // Send email notification
    await resend.emails.send({
      from: "Career <career@supremeinfrastructure.in>", // Update with your verified domain
      to: "hrsupremewebsite@gmail.com", // Update with your receiving email
      subject: `New Career Application: ${position}`,
      html: `
        <h2>New Career Application</h2>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        
        <h3>Position Details</h3>
        <p><strong>Position Applied For:</strong> ${position}</p>
        <p><strong>Years of Experience:</strong> ${experience}</p>
        
        <h3>Additional Information</h3>
        <p>${additionalInfo || "No additional information provided."}</p>
        
        <h3>Resume</h3>
        <p><a href="${
          blob.url
        }" target="_blank">Click here to view resume</a></p>
        <p>The resume will be available for download using the link above.</p>
      `,
    });

    return NextResponse.json({
      message: "Application submitted successfully",
      resumeUrl: blob.url,
    });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
