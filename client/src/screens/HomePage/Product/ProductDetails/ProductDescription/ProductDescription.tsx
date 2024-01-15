interface PropTypes {
  description: string | undefined;
}

export const ProductDescription = ({ description }: PropTypes) => {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-gray-700 dark:text-gray-200 rounded-2xl border border-gray-200 dark:border-transparent shadow-lg md:shadow-none px-1.5 py-3 mb-4">
      <span className="block text-1xl md:text-xl font-bold dark:text-white border-b border-gray-200 dark:border-gray-600 mx-2 mb-1.5 pb-1">
        Description
      </span>
      <p className="p-2 text-gray-800 dark:text-white">{description}</p>
    </div>
  );
};
