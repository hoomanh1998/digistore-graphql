export const LocationCardLoader = () => {
  return (
    <div className="animate-pulse-fast flex flex-row w-full bg-gray-100 dark:bg-gray-700 rounded-xl relative shadow-lg px-3 py-4 mb-3">
      <div className="flex w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-500" />
      <div className="flex  h-full flex-1 flex-col w-full justify-start items-start space-y-2 ml-2">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-1/3 mb-px" />
        <div className="flex flex-col w-full space-y-1.5">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
};
