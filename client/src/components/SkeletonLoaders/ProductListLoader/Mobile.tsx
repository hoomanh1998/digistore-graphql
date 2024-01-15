import { useEffect } from "react";

export const Mobile = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-col h-full w-full">
        <ul className="grid gap-3 grid-cols-2 xs:grid-cols-3">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col flex-shrink-0 items-center rounded-xl bg-gray-100 dark:bg-gray-700 shadow-lg p-2"
            >
              <div className="animate-pulse-fast flex flex-col w-full">
                <div className="rounded-lg bg-gray-300 dark:bg-gray-600 w-full min-h-24 xxs:min-w-32 xxs:min-h-28 xs:min-h-28 mb-2"></div>
                <div className="flex flex-col w-full space-y-4">
                  <div className="flex flex-col w-full space-y-2">
                    <div className="bg-gray-300 dark:bg-gray-600 rounded h-4 w-full"></div>
                    <div className="bg-gray-300 dark:bg-gray-600 rounded h-4 w-3/4"></div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-6 w-3/5"></div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
