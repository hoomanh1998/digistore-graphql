import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center dark:bg-gray-800">
      <h3 className="dark:text-white text-9xl font-bold rounded-xl p-5">404</h3>
      <p className="text-center text-gray-600 dark:text-white text-2xl font-semibold rounded-xl p-5">
        Opps, Page Not Found!
      </p>
      <Link
        className="text-lg font-semibold my-5 text-blue-500 dark:text-blue-400"
        to="/home"
      >
        Back to Home
      </Link>
    </div>
  );
};
