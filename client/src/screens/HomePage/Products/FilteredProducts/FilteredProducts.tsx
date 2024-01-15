import { ProductListLoader } from "../../../../components/SkeletonLoaders";
import { ProductCard } from "../../../../components/ProductCard";
import {
  ActiveFilter,
  FilteredProductsData,
  Size,
  View,
} from "../../../../ts/types";
import { GET_FILTER_PRODUCTS } from "../../../../graphQL";
import { useQuery } from "@apollo/client";

interface PropTypes {
  activeFilter: ActiveFilter;
  productView: View;
}

export function FilteredProducts({ activeFilter, productView }: PropTypes) {
  const { loading, data } = useQuery<FilteredProductsData>(
    GET_FILTER_PRODUCTS,
    {
      variables: { category_id: activeFilter.id },
    }
  );

  const filteredProductsLength = data && data.filterProducts.products.length;

  const filteredProducts = loading ? (
    <ProductListLoader />
  ) : (
    <div className="flex flex-col w-full space-y-2">
      <div className="flex flex-row items-center mx-1 mb-2">
        <p className="font-semibold text-lg text-gray-500 dark:text-gray-400 mr-2">
          Category:
        </p>
        <div className="font-bold text-xl dark:text-white mr-1">
          {data && data.filterProducts.categoryName}
        </div>
        <div className="font-semibold text-lg text-gray-500 dark:text-gray-400 leading-tight">
          ({filteredProductsLength})
        </div>
      </div>
      {data &&
      data.filterProducts.products &&
      data.filterProducts.products.length > 0 ? (
        <div
          className={`grid gap-3 ${
            productView === View.Grid
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {data.filterProducts.products.map(({ id, title, price }) => (
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
          No product found!
        </p>
      )}
    </div>
  );
  return filteredProducts;
}
