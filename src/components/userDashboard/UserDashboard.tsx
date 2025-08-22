"use client";
import Dashboard from "../dashboard/PredictionDashboard";
import ExportControls from "../exportControls/ExportControls";

interface User {
  id: string;
  email: string;
  // Add other user properties you might use
  name?: string;
  role?: string;
}

interface UserDashboardProps {
  user: User;
}

export default function UserDashboard({ user }: UserDashboardProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl mb-2 font-bold">Welcome, {user.email}</h1>
      <Dashboard userId={user.id} />
      <ExportControls userId={user.id} />
    </div>
  );
}
