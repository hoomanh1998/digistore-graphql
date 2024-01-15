import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useMediaQuery } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { GET_PAGINATED_PRODUCTS, GET_SEARCH_PRODUCTS } from "../../../graphQL";
import { PageHeader } from "../../../components/PageHeader";
import { SearchBar } from "../../../components/SearchBar";
import { Filters } from "./Filters";
import { ProductsListView } from "./ProductsListView";
import { ProductCard } from "../../../components/ProductCard";
import { SearchedProducts } from "./SearchedProducts";
import { ProductListLoader } from "../../../components/SkeletonLoaders";
import { ScrollToTop } from "../../../components/UI";
import { FilteredProducts } from "./FilteredProducts";
import {
  Filter,
  PaginatedProductsData,
  Products as ProductsType,
  SearchProductsData,
  Size,
  UI,
  View,
} from "../../../ts/types";
import { useLocation } from "react-router-dom";
import { uiActions } from "../../../store/ui";
import { useSaveScrollPosition } from "../../../hooks/useSaveScrollPosition";
import { productsActions } from "../../../store/products";

export function Products() {
  const observer = useRef<any>(null);

  useSaveScrollPosition();

  const dispatch = useDispatch();

  const {
    products: productList,
    hasMoreProducts,
    pageNumber,
    currentPageNumber,
  } = useSelector((state: ProductsType) => state.products);

  const location = useLocation();

  const activeFilter = useSelector((state: Filter) => state.filter);

  const { isSearching, productsListView } = useSelector(
    (state: UI) => state.ui
  );

  const [initialLoading, setInitialLoading] = useState(true);

  const { isMobile } = useMediaQuery();

  const { loading } = useQuery<PaginatedProductsData>(GET_PAGINATED_PRODUCTS, {
    variables: {
      page: pageNumber - 1,
      size: 8,
    },
    onCompleted(data) {
      setInitialLoading(false);
      if (
        data.paginatedProducts.products.length > 0 &&
        pageNumber >= currentPageNumber
      ) {
        dispatch(productsActions.setProducts(data.paginatedProducts.products));
      } else if (data.paginatedProducts.products.length === 0) {
        dispatch(productsActions.setHasMoreProducts(false));
      }
    },
  });

  const [
    getSearchProducts,
    { loading: searchedProductsLoading, data: searchedProductsData },
  ] = useLazyQuery<SearchProductsData>(GET_SEARCH_PRODUCTS);

  //Implementing the infinite scroll
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && hasMoreProducts) {
          dispatch(productsActions.setPageNumber());
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreProducts, dispatch]
  );

  useEffect(() => {
    return () => {
      dispatch(uiActions.setIsSearching(false));
    };
  }, [location, dispatch]);

  let productsList = initialLoading ? (
    <ProductListLoader />
  ) : (
    <>
      <div
        className={`w-full grid gap-3 ${
          productsListView === View.Grid
            ? "grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {productList.map(({ id, title, price, category }) => (
          <ProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            category={category.name}
            reference={lastProductRef}
            routeState="/home/products"
            size={productsListView === View.Grid ? Size.Medium : Size.Wide}
          />
        ))}
      </div>
      {/* {!isMobile && (
        <Pagination
          totalCount={data && data.paginatedProducts.totalPages}
          pageNumber={currentPage}
          paginationHandler={setCurrentPage}
        />
      )} */}
    </>
  );

  if (activeFilter.active) {
    productsList = (
      <FilteredProducts
        activeFilter={activeFilter}
        productView={productsListView}
      />
    );
  }

  const products = isMobile ? (
    <div className="flex flex-col relative w-full min-h-screen bg-gray-200 dark:bg-gray-800 pb-navbar-height">
      <div className="flex flex-col h-full w-full p-3">
        <PageHeader />
        <div className="flex flex-row items-center w-full space-x-2.5">
          <SearchBar getSearchProducts={getSearchProducts} />
          <Filters activeFilter={activeFilter} />
        </div>
        <ProductsListView productView={productsListView} />
        {isSearching ? (
          <SearchedProducts
            data={searchedProductsData}
            loading={searchedProductsLoading}
            productView={productsListView}
          />
        ) : (
          productsList
        )}
        {loading && (
          <div className="flex justify-center w-full mt-5">
            <div className="w-7 h-7 animate-spin spinner-loader-dark dark:spinner-loader m-3" />
          </div>
        )}
        <ScrollToTop />
      </div>
    </div>
  ) : (
    <div className="flex flex-row items-start justify-center w-full min-h-screen bg-gray-200 dark:bg-gray-800 space-x-4 p-4">
      <div className="flex flex-col md:max-w-7xl items-center w-full space-y-5">
        <SearchBar getSearchProducts={getSearchProducts} />
        {isSearching ? (
          <SearchedProducts
            data={searchedProductsData}
            loading={searchedProductsLoading}
            productView={productsListView}
          />
        ) : (
          productsList
        )}
        {loading && (
          <div className="flex justify-center w-full mt-5">
            <div className="w-7 h-7 animate-spin spinner-loader-dark dark:spinner-loader m-3" />
          </div>
        )}
      </div>
      <div className="sticky w-80 top-4 flex flex-col bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md p-3 md:p-4">
        <ProductsListView productView={productsListView} />
        <Filters activeFilter={activeFilter} />
      </div>
    </div>
  );

  return products;
}
