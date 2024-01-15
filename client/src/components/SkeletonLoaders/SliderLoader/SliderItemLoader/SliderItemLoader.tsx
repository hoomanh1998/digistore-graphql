export const SliderItemLoader = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 flex flex-col flex-shrink-0 w-44 md:w-46 h-56 md:h-60 rounded-xl shadow-lg p-2">
      <div className="flex flex-col w-full h-full animate-pulse-fast">
        <div className="flex flex-1 w-full rounded-lg bg-gray-300 dark:bg-gray-600 h-28 mb-3" />
        <div className="flex flex-1 flex-col w-full h-full justify-between">
          <div className="flex flex-col w-full space-y-2">
            <div className="bg-gray-300 dark:bg-gray-600 rounded h-4 w-full" />
            <div className="bg-gray-300 dark:bg-gray-600 rounded h-4 w-3/4" />
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-7 w-1/2" />
        </div>
      </div>
    </div>
  );
};
