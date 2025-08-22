import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { email, name } = await request.json();

  try {
    // Validate input
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Check for existing subscriber
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }

    // Generate confirmation token
    const confirmationToken = crypto.randomUUID();

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email,
        name: name || null,
        subscribed_at: new Date().toISOString(),
        confirmation_token: confirmationToken,
        confirmed: false,
      });

    if (insertError) throw insertError;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send confirmation email
    await transporter.sendMail({
      from: `"Your Brand" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: "Confirm your newsletter subscription",
      html: `
        <h2>Almost there!</h2>
        <p>Please confirm your subscription to our newsletter by clicking the link below:</p>
        <p><a href="${
          process.env.NEXT_PUBLIC_BASE_URL || "http://edgehit.ca"
        }/confirm-newsletter?token=${confirmationToken}">Confirm Subscription</a></p>
        ${name ? `<p>Thanks, ${name}!</p>` : ""}
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Newsletter error:", error);

    const errorMessage = "Subscription failed";
    let errorDetails = "An unexpected error occurred";

    if (error instanceof Error) {
      errorDetails = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error
    ) {
      const errorObj = error as { message?: string };
      errorDetails = errorObj.message || "Unknown error";
    }

    return NextResponse.json(
      { error: errorMessage, details: errorDetails },
      { status: 500 }
    );
  }
}
