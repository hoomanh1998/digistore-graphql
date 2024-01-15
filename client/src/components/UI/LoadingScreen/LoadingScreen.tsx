export const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="flex flex-row justify-around w-40 p-3 bg-gray-700 my-5 rounded-full">
        <div className="w-6 h-6 rounded-full bg-gray-300 animate-bounce" />
        <div className="w-6 h-6 rounded-full bg-gray-300 animate-bounce" />
        <div className="w-6 h-6 rounded-full bg-gray-300 animate-bounce" />
      </div>
    </div>
  );
};
