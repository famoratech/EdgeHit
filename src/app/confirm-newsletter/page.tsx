import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ConfirmNewsletter({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/");
  }

  const supabase = await createServerSupabaseClient();

  try {
    const { data: subscriber } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("confirmation_token", token)
      .maybeSingle();

    if (!subscriber) {
      throw new Error("Invalid or expired token");
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({
        confirmed: true,
        confirmation_token: null,
      })
      .eq("email", subscriber.email);

    if (error) throw error;

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Subscription Confirmed!
          </h1>
          <p className="text-gray-700">
            Thank you for subscribing to our newsletter. You&apos;ll now receive
            our latest updates directly to your inbox.
          </p>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Invalid or Expired Link
          </h1>
          <p className="text-gray-700">
            The confirmation link is invalid or has expired. Please try
            subscribing again.
          </p>
        </div>
      </div>
    );
  }
}
