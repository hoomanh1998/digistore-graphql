interface ProductSpecificationPropTypes {
  categoryName: string | undefined;
  brandName: string | undefined;
}

export const ProductSpecification = ({
  categoryName,
  brandName,
}: ProductSpecificationPropTypes) => {
  return (
    <div className="flex flex-1 flex-col w-full bg-blue-400 dark:bg-gray-700 dark:text-gray-200 rounded-2xl overflow-hidden p-1.5 pt-3 md:mb-4">
      <span className="block text-1xl md:text-xl font-bold text-white mx-2.5 mb-1.5">
        Specifications
      </span>
      <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-xl p-3 space-y-2 mt-1">
        <div className="flex flex-row text-lg">
          <div className="text-gray-700 dark:text-gray-400 mr-2">Category:</div>
          <div className="font-bold text-gray-700 dark:text-white">
            {categoryName}
          </div>
        </div>
        <div className="flex flex-row text-lg">
          <div className="text-gray-700 dark:text-gray-400 mr-2">Brand:</div>
          <div className="font-bold text-gray-700 dark:text-white">
            {brandName}
          </div>
        </div>
      </div>
    </div>
  );
};
