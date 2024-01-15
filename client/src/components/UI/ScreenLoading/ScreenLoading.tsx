export const ScreenLoading = () => {
  return (
    <div className="fixed flex flex-col w-full h-full justify-center items-center bg-gray-300 dark:bg-gray-800 bg-opacity-80 z-10 select-none">
      <div className="w-12 h-12 animate-spin spinner-loader-dark dark:spinner-loader m-3" />
    </div>
  );
};
