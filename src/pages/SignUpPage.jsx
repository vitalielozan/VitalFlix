import React from "react";
import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center py-10">
      <SignUp routing="path" path="/sign-up" fallbackRedirectUrl="/" />
    </div>
  );
}

export default SignUpPage;
