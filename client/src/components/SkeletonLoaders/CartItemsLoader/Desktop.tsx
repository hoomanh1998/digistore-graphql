export const Desktop = () => {
  return (
    <ul className="animate-pulse-fast grid grid-cols-1 xl:grid-cols-2 gap-3">
      {[...Array(7)].map((_, index) => (
        <li
          key={index}
          className="relative flex flex-row bg-gray-100 dark:bg-gray-700 shadow-lg rounded-xl p-2 pb-7"
        >
          <div className="w-28 h-20 flex-shrink-0 bg-gray-300 dark:bg-gray-600 rounded-xl" />
          <div className="w-full flex flex-col space-y-2 px-2">
            <div className="flex flex-col items-baseline w-full space-y-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mb-2" />
            </div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-32" />
          </div>
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </li>
      ))}
    </ul>
  );
};
