import { ProductCard } from "../../../../components/ProductCard";
import { ProductListLoader } from "../../../../components/SkeletonLoaders";
import { SearchProductsData, Size, View } from "../../../../ts/types";

interface PropTypes {
  data: SearchProductsData | undefined;
  loading: boolean;
  productView: View;
}

export function SearchedProducts({ data, loading, productView }: PropTypes) {
  const searchedProducts = loading ? (
    <ProductListLoader />
  ) : (
    <div className="flex flex-col w-full space-y-2">
      <h4 className="font-semibold text-lg dark:text-white mx-1">
        Search Results:
      </h4>
      {data && data.searchProducts && data.searchProducts.length > 0 ? (
        <div
          className={`w-full grid gap-3 ${
            productView === View.Grid
              ? "grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {data.searchProducts.map(({ id, title, price }) => (
            <ProductCard
              key={id}
              id={id}
              title={title}
              price={price}
              routeState="/home/products"
              size={productView === View.Grid ? Size.Medium : Size.Wide}
            />
          ))}
        </div>
      ) : (
        <p className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl py-3 px-4">
          No matches found!
        </p>
      )}
    </div>
  );

  return searchedProducts;
}
