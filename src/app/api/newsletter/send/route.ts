import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { subject, content, isTest } = await request.json();
  const supabase = await createServerSupabaseClient();

  try {
    // 1. Configure SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 2. Handle test send
    if (isTest) {
      await transporter.sendMail({
        from: `Your Brand <${process.env.SMTP_FROM_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `[TEST] ${subject}`,
        html: content
          .replace(/{{name}}/g, "Test Recipient")
          .replace(/{{email}}/g, process.env.ADMIN_EMAIL || "test@example.com"),
      });
      return NextResponse.json({ success: true });
    }

    // 3. Get confirmed subscribers (only once)
    const { data: subscribers, error } = await supabase
      .from("newsletter_subscribers")
      .select("email, name")
      .eq("confirmed", true);

    if (error) throw error;
    if (!subscribers?.length) {
      return NextResponse.json(
        { error: "No confirmed subscribers found" },
        { status: 400 }
      );
    }

    // Create a transform stream for progress updates
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    // Start sending in background
    (async () => {
      const batchSize = 10;
      let successfulSends = 0;
      const totalSubscribers = subscribers.length;

      for (let i = 0; i < totalSubscribers; i += batchSize) {
        const batch = subscribers.slice(i, i + batchSize);

        await Promise.all(
          batch.map(async (subscriber) => {
            try {
              await transporter.sendMail({
                from: `Your Brand <${process.env.SMTP_FROM_EMAIL}>`,
                to: subscriber.email,
                subject,
                html: content
                  .replace(/{{name}}/g, subscriber.name || "there")
                  .replace(/{{email}}/g, subscriber.email)
                  .replace(/{{couponCode}}/g, "COUPON-1234"),
                headers: {
                  "List-Unsubscribe": `<${
                    process.env.NEXT_PUBLIC_SITE_URL
                  }/unsubscribe?email=${encodeURIComponent(subscriber.email)}>`,
                },
              });
              successfulSends++;
            } catch (error) {
              console.error(`Failed to send to ${subscriber.email}:`, error);
            }
          })
        );

        // Update progress
        const progress = Math.round(((i + batchSize) / totalSubscribers) * 100);
        await writer.write(
          encoder.encode(`data: ${JSON.stringify({ progress })}\n\n`)
        );
      }

      await writer.write(
        encoder.encode(
          `data: ${JSON.stringify({
            done: true,
            sentTo: successfulSends,
          })}\n\n`
        )
      );
      await writer.close();
    })();

    return new NextResponse(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("Newsletter error:", error);

    let errorMessage = "Failed to send newsletter";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error
    ) {
      const errorObj = error as { message?: string };
      errorMessage = errorObj.message || "Unknown error";
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
