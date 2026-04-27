import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="my-5 flex h-full flex-col items-center justify-center bg-white py-5 dark:bg-gray-800">
      <h1 className="my-10 text-3xl font-bold text-gray-900 dark:text-white">
        Oops!
      </h1>
      <p className="my-10 max-w-md text-base text-gray-700 dark:text-gray-400">
        The page you're looking for doesn't exist...
      </p>
      <button
        color="danger"
        className="my-10 rounded-md bg-red-600 px-6 py-2 font-medium text-white transition hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </div>
  );
}

export default ErrorPage;
