"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function NewsletterForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Subscription failed");
      }

      toast.success("Confirmation email sent! Please check your inbox.");
      onClose();
      setEmail("");
      setName("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Subscription failed";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close newsletter form"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6">
            Get the latest news and updates delivered to your inbox
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-left ml-0.5 font-medium text-gray-700 mb-1"
              >
                Name (Optional)
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="focus:ring-2 focus:ring-[#FFA500]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-left ml-0.5 font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="focus:ring-2 focus:ring-[#FFA500]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FFA500] hover:bg-[#FFB733] text-white font-bold  py-2 px-4 rounded-md transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center font-bold">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75 "
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Subscribe Now"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
