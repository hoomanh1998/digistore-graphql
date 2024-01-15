import { useLockBodyScroll } from "../../../hooks";

export const LocationsLoader = () => {
  useLockBodyScroll(true);
  return (
    <div className="flex flex-col dark:bg-gray-800">
      <div className="animate-pulse-fast flex flex-col w-full overflow-hidden">
        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className="bg-gray-100 dark:bg-gray-700 overflow-hidden rounded-xl shadow-lg"
            >
              <div className="flex flex-row justify-between border-b-2 border-gray-200 dark:border-gray-600 items-start m-3 mb-0 pb-3">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 p-3">
                <div className="flex flex-col justify-start space-y-2 w-full">
                  <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-md w-20" />
                  <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-full" />
                </div>
                <div className="flex flex-col justify-start space-y-2 w-full">
                  <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-md w-20" />
                  <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-full" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
