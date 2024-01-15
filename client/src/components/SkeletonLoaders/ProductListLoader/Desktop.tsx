export const Desktop = () => {
  return (
    <div className="flex flex-col items-start w-full lg:flex-row min-h-screen transition-width duration-200 ease-in-out">
      <div className="h-auto lg:h-full rounded-xl w-full mb-3 lg:mb-0 select-none">
        <ul className="grid gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(15)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col flex-shrink-0 items-center rounded-xl bg-white dark:bg-gray-700 p-2"
            >
              <div className="animate-pulse-fast flex flex-col w-full">
                <div className="w-full rounded-lg bg-gray-300 dark:bg-gray-600 min-w-32 min-h-32 mb-3"></div>
                <div className="flex flex-col w-full space-y-6">
                  <div className="flex flex-col w-full space-y-2">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded h-3 w-full"></div>
                    <div className="bg-gray-200 dark:bg-gray-600 rounded h-3 w-3/4"></div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-6 w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
