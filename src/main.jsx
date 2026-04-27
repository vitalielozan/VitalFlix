import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App.jsx";
import MovieProvider from "./context/MovieProvider.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        baseTheme: "dark",
        variables: {
          colorPrimary: "#22c55e",
          colorText: "#f8fafc",
          colorBackground: "#0f172a",
          colorInputBackground: "#0f172a",
          colorInputBorder: "#334155",
          colorInputText: "#f8fafc",
          colorInputPlaceholder: "#94a3b8",
          colorBorder: "#334155",
          colorButtonText: "#ffffff",
          colorButtonTextSecondary: "#cbd5e1",
          colorError: "#f87171",
          borderRadius: "0.75rem",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        },
      }}
    >
      <MovieProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MovieProvider>
    </ClerkProvider>
  </StrictMode>,
);
