import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl mt-4 text-gray-600">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-400 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
