"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type View = "login" | "signup" | "forgot" | "update_password" | "verify_email";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<View>("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = searchParams.get("access_token");
  const type = searchParams.get("type");

  useEffect(() => {
    if (window?.location?.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (token && type === "recovery") {
      setView("update_password");
    }
  }, [token, type]);

  const resetState = () => {
    setEmail("");
    setPassword("");
    setConfirm("");
    setError("");
    setMessage("");
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else router.push("/dashboard");

    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    setLoading(true);

    if (!email || !password || !confirm) {
      setError("All fields are required.");
      return setLoading(false);
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return setLoading(false);
    }

    const { data: existingUser } = await supabase
      .from("users") // change if using custom table
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      setError("Email already in use.");
      return setLoading(false);
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setView("verify_email");

    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/reset-password`,
    });

    if (error) setError(error.message);
    else setMessage("Check your email to reset your password.");

    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) setError(error.message);
    else {
      setMessage("Password updated. You can now sign in.");
      setView("login");
    }

    setLoading(false);
  };

  const renderForm = () => {
    switch (view) {
      case "login":
        return (
          <form onSubmit={handleLogin} className="space-y-4">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <input
              className="w-full p-2 border rounded"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <button
                onClick={() => setView("signup")}
                className="text-blue-600 underline"
              >
                Sign up
              </button>
            </p>
            <p className="text-sm text-center">
              <button
                onClick={() => setView("forgot")}
                className="text-blue-600 underline"
              >
                Forgot password?
              </button>
            </p>
          </form>
        );
      case "signup":
        return (
          <form onSubmit={handleSignup} className="space-y-4">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
            <input
              className="w-full p-2 border rounded"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Confirm Password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full  bg-blue-600 text-white py-2 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <button
                onClick={() => setView("login")}
                className="text-blue-600 underline"
              >
                Sign in
              </button>
            </p>
          </form>
        );
      case "forgot":
        return (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <h1 className="text-2xl font-bold text-center">Reset Password</h1>
            <input
              className="w-full p-2 border rounded"
              placeholder="Your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending reset..." : "Send Reset Link"}
            </button>
            <p className="text-sm text-center">
              Remembered it?{" "}
              <button
                onClick={() => setView("login")}
                className="text-blue-600 underline"
              >
                Back to login
              </button>
            </p>
          </form>
        );
      case "update_password":
        return (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <h1 className="text-2xl font-bold text-center">Set New Password</h1>
            <input
              className="w-full p-2 border rounded"
              placeholder="New password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        );
      case "verify_email":
        return (
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className="text-sm text-gray-600">
              A verification link will be sent if <strong>email</strong> is not
              in use. Please check your inbox.
            </p>
            <button
              onClick={() => setView("login")}
              className="text-blue-600 underline text-sm"
            >
              Back to login
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-500 p-4">
      <div className="w-full max-w-md bg-gray-50 rounded shadow p-6">
        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {renderForm()}
      </div>
    </div>
  );
}
