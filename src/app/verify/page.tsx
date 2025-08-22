"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/auth"); // Redirect to sign-in after delay
    }, 10000); // 10 seconds

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Confirm Your Email</h1>
        <p className="mb-2">
          We&apos;ve sent a confirmation link to your email. Please check your
          inbox (and spam folder) to complete the sign-up process.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You will be redirected to the login page shortly.
        </p>
      </div>
    </div>
  );
}
