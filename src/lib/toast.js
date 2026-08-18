export const showToast = (message, type = "info") => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("app-toast", {
      detail: { message, type },
    }),
  );
};
