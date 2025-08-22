import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const formData = await request.json();

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to business
    const businessMail = {
      from: `"Website Contact Form" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_FORM_RECIPIENT,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    };

    // Email to customer (confirmation)
    const customerMail = {
      from: `"${process.env.BUSINESS_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: formData.email,
      subject: "Thank you for contacting us",
      html: `
        <h2>Thank you for reaching out, ${formData.name}!</h2>
        <p>We've received your message and will get back to you soon.</p>
        <p>Here's what you submitted:</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
        <p>Best regards,</p>
        <p>The ${process.env.BUSINESS_NAME} Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(businessMail);
    await transporter.sendMail(customerMail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
