"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { Progress } from "@/components/ui/progress";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

export default function NewsletterDashboard() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState(`
  <p>Hello {{name}}!</p>
 <p>Your coupon: {{couponCode}}</p>
`);
  const [isSending, setIsSending] = useState(false);
  const [isTestSending, setIsTestSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user, loading, role } = useSupabaseUser({
    redirectTo: "/auth",
  });

  if (loading) return <p>Loading...</p>;
  if (!user || role !== "superadmin") return <p>Access denied</p>;

  const handleSend = async (isTest = false) => {
    if (!subject || !content) {
      toast.error("Subject and content are required");
      return;
    }

    if (isTest) {
      setIsTestSending(true);
    } else {
      setIsSending(true);
    }
    setProgress(0);

    try {
      const response = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          content,
          isTest,
        }),
      });

      const responseText = await response.text();

      // Try to parse as JSON first
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        // If it's not JSON, check if it's SSE format
        if (responseText.startsWith("data: {")) {
          // Extract JSON from SSE format: data: {...}
          const jsonMatch = responseText.match(/^data: (\{.*\})$/m);
          if (jsonMatch && jsonMatch[1]) {
            data = JSON.parse(jsonMatch[1]);
          } else {
            throw new Error(
              `Unexpected response format: ${responseText.slice(0, 100)}...`
            );
          }
        } else {
          // If it's plain text but not an error status, use it as success
          if (response.ok) {
            data = { message: responseText, sentTo: "subscribers" };
          } else {
            throw new Error(
              responseText || `HTTP error! status: ${response.status}`
            );
          }
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `HTTP error! status: ${response.status}`
        );
      }

      setProgress(100);

      if (isTest) {
        toast.success("Test email sent successfully!");
      } else {
        toast.success(
          `Newsletter sent to ${data.sentTo || data.count || "subscribers"}!`
        );
      }
    } catch (error: unknown) {
      console.error("Newsletter send error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send newsletter";
      toast.error(errorMessage);
    } finally {
      if (isTest) {
        setIsTestSending(false);
      } else {
        setIsSending(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Send Newsletter</h1>

      <div className="space-y-4">
        <Input
          placeholder="Subject line"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <RichTextEditor content={content} onChange={setContent} />

        {(isSending || isTestSending) && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">
              {isTestSending
                ? "Sending test email..."
                : `Sending to subscribers... ${progress}%`}
            </p>
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            onClick={() => handleSend(true)}
            disabled={isSending || isTestSending}
          >
            {isTestSending ? "Sending Test..." : "Send Test Email"}
          </Button>
          <Button
            onClick={() => handleSend(false)}
            disabled={isSending || isTestSending}
          >
            {isSending ? "Sending..." : "Send to All Subscribers"}
          </Button>
        </div>
      </div>
    </div>
  );
}
