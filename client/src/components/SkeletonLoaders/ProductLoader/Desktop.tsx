import { useEffect } from "react";
import { useMediaQuery } from "../../../hooks";

export const Desktop = () => {
  const { isLarge } = useMediaQuery();
  let numberOfLines = 8;
  if (isLarge) {
    numberOfLines = 3;
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="flex flex-col items-center lg:items-stretch min-w-full dark:bg-gray-700">
      <div className="flex flex-col items-center lg:flex-row lg:items-start w-full">
        <div className="animate-pulse-fast flex flex-grow-0 relative lg:sticky lg:top-3 w-150 h-96 bg-gray-200 dark:bg-gray-800 rounded-xl mb-3 lg:mr-3 lg:mb-0" />
        <div className="flex flex-1 flex-col justify-between min-w-80 w-full bg-blue-100 dark:bg-gray-800 rounded-xl p-3 h-full">
          <div className="lg:mb-3">
            <div className="animate-pulse-fast flex flex-col w-full space-y-2 mb-5">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-64" />
              <div className="h-6 bg-blue-300 dark:bg-gray-700 rounded-lg w-20" />
            </div>
            <div className="animate-pulse-fast flex flex-col w-full border-2 border-blue-200 dark:border-gray-700 rounded-xl space-y-2 p-3 mb-3">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-lg w-56 mb-2" />
              {[...Array(numberOfLines)].map((_, index) => (
                <div
                  key={index}
                  className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"
                />
              ))}
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            </div>
            <div className="hidden lg:flex flex-col animate-pulse-fast w-full border-2 border-blue-200 dark:border-gray-600 rounded-xl space-y-2 p-3">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-lg w-56 mb-2" />
              {[...Array(numberOfLines)].map((_, index) => (
                <div
                  key={index}
                  className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"
                />
              ))}
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            </div>
          </div>
          <div className="animate-pulse-fast h-10 bg-green-500 rounded-lg w-44 ml-auto mr-0" />
        </div>
      </div>
    </div>
  );
};
