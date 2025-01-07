import { NextResponse } from "next/server";
import { Resend } from "resend";
import { writeFile } from "fs/promises";
import path from "path";

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

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await writeFile(path.join(uploadDir, ".gitkeep"), "");
    } catch (error) {
      // Directory already exists, continue
    }

    // Save the resume file
    const fileExtension = resumeFile.name.split(".").pop();
    const fileName = `${firstName}-${lastName}-resume-${Date.now()}.${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await resumeFile.arrayBuffer());
    await writeFile(filePath, buffer);

    // Send email notification
    await resend.emails.send({
      from: "Your Company <onboarding@resend.dev>", // Update with your verified domain
      to: ["your-email@example.com"], // Update with your receiving email
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
        <p>Resume file saved as: ${fileName}</p>
        <p>You can find the resume in the uploads directory of the application.</p>
      `,
    });

    return NextResponse.json({
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
