import { useEffect } from "react";

export const Mobile = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="flex flex-col w-full dark:bg-gray-800">
      <div className="animate-pulse-fast flex flex-col w-full h-screen pb-0 overflow-hidden">
        <div className="flex flex-col items-baseline w-full space-y-2 px-3 mb-1">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-5/6" />
          <div className="h-7 bg-gray-400 dark:bg-gray-700 rounded-lg w-36" />
        </div>
        <div className="flex flex-col items-center mb-4 px-3">
          <div className="w-full my-3 rounded-xl h-52 xs:h-80 sm:h-96 bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md w-2/5" />
        </div>
        <div className="flex flex-col flex-grow h-full bg-blue-100 dark:bg-gray-600 rounded-t-3xl p-4">
          <div className="relative flex flex-col space-y-2 my-2">
            <div className="h-7 bg-gray-300 dark:bg-gray-500 rounded-md w-2/3 mb-1" />
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-full"
              />
            ))}
            <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-3/4" />
          </div>
          <div className="w-full fixed left-0 bottom-0 p-3 pb-safe-inset-bottom pt-0">
            <div className="w-full h-12 bg-green-500 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
