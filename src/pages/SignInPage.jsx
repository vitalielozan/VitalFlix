import React from "react";
import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center py-10">
      <SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/" />
    </div>
  );
}

export default SignInPage;
