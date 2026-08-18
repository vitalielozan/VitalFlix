import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      setToast({
        message: event.detail.message,
        type: event.detail.type || "info",
      });
    };

    window.addEventListener("app-toast", handler);

    return () => {
      window.removeEventListener("app-toast", handler);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <>
      <AppRoutes />
      {toast && (
        <div className="toast toast-center toast-top z-50">
          <div
            className={`alert ${
              toast.type === "error"
                ? "alert-error"
                : toast.type === "success"
                  ? "alert-success"
                  : "alert-info"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
