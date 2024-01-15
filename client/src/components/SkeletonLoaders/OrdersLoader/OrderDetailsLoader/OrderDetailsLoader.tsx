import { useLockBodyScroll } from "../../../../hooks";

export const OrderDetailsLoader = () => {
  useLockBodyScroll(true);
  return (
    <div className="flex flex-col dark:bg-gray-800">
      <div className="animate-pulse-fast flex flex-col w-full h-full overflow-hidden">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-3">
          {[...Array(10)].map((_, index) => (
            <li
              key={index}
              className="relative flex flex-row bg-gray-100 dark:bg-gray-700 rounded-xl p-2"
            >
              <div className="w-28 h-24 flex-shrink-0 bg-gray-300 dark:bg-gray-600 rounded-xl" />
              <div className="w-full h-full flex flex-col justify-between px-3">
                <div className="flex flex-col items-baseline w-full space-y-1.5">
                  <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-full" />
                  <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
                </div>
                <div className="h-7 bg-gray-300 dark:bg-gray-800 rounded-lg w-18" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
