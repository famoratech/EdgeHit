// src/app/auth/page.tsx
import React, { Suspense } from "react";
import AuthContent from "./AuthContent";

const AuthPage = () => {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
};

export default AuthPage;
