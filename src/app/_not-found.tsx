// app/not-found.tsx

import Link from "next/link";

export const dynamic = "force-dynamic"; // optional, skips prerender

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
