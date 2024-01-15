export function Notifications() {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 flex flex-1 flex-col w-full h-full md:rounded-xl p-3 pb-navbar-height select-none">
      <h3 className="text-2xl md:text-xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-700 px-1.5 pb-3 mb-3">
        Notifications
      </h3>
      <p className="bg-gray-100 dark:bg-gray-700 dark:text-white p-3 rounded-xl">
        No notification received yet!
      </p>
    </div>
  );
}
