export const OrderLoader = () => {
  return (
    <li className="flex flex-col justify-between relative bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg p-2">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-44 mt-1 m-2" />
      <div className="flex hide-scrollbars overflow-x-auto items-start">
        <div className="relative flex flex-row flex-1 p-1">
          <div className="flex flex-col flex-shrink-0 items-center h-40 bg-white dark:bg-gray-800 rounded-xl w-28 shadow-md space-y-1 p-2 z-20">
            <div className="flex flex-shrink-0 justify-center rounded-lg w-24 h-18 bg-gray-200 dark:bg-gray-500 mb-1" />
            <div className="flex flex-col justify-between w-full h-full">
              <div className="flex flex-col space-y-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
              </div>
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md w-2/3" />
            </div>
          </div>
          <div className="absolute left-10 top-3 flex flex-col flex-shrink-0 items-center bg-white dark:bg-gray-800 rounded-xl overflow-hidden w-24 shadow-md space-y-1 p-2 z-10 h-36">
            <div className="absolute left-0 top-0 w-full h-full bg-gray-400 dark:bg-gray-700 opacity-40" />
            <div className="flex flex-shrink-0 justify-center rounded-lg w-20 h-16 bg-gray-200 dark:bg-gray-500 mb-1" />
          </div>
          <div className="absolute left-14 top-5 flex flex-col flex-shrink-0 items-center bg-white dark:bg-gray-800 rounded-xl overflow-hidden w-24 shadow-md space-y-1 p-2 h-32">
            <div className="absolute left-0 top-0 w-full h-full bg-gray-400 dark:bg-gray-700 opacity-70" />
            <div className="flex flex-shrink-0 justify-center rounded-lg w-20 h-14 bg-gray-200 dark:bg-gray-500 mb-1" />
          </div>
        </div>
        <div className="absolute right-3 bottom-3 h-5 bg-gray-300 dark:bg-gray-600 rounded w-28 z-30" />
      </div>
    </li>
  );
};
