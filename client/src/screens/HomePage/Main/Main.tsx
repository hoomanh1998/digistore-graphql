import { useQuery } from "@apollo/client";
import { GET_FILTER_PRODUCTS, GET_LATEST_PRODUCTS } from "../../../graphQL";
import { PageHeader } from "../../../components/PageHeader";
import { CarouselSlider } from "../../../components/CarouselSlider/CarouselSlider";
import { Slider } from "../../../components/Slider";
import { SliderLoader } from "../../../components/SkeletonLoaders";
import { Banner } from "../../../components/Banner";
import { LatestProductsData, FilteredProductsData } from "../../../ts/types";

export function Main() {
  const { loading, data } = useQuery<LatestProductsData>(GET_LATEST_PRODUCTS, {
    fetchPolicy: "cache-first",
  });

  const { loading: filteredProductsLoading, data: filteredProductsData } =
    useQuery<FilteredProductsData>(GET_FILTER_PRODUCTS, {
      variables: { category_id: "1" },
      fetchPolicy: "cache-first",
    });

  return (
    <div className="flex flex-col items-center w-full min-h-full md:min-h-screen bg-gray-200 dark:bg-gray-800 transition-width duration-200 ease-in-out pb-navbar-height">
      <PageHeader />
      <CarouselSlider />
      {loading ? (
        <SliderLoader mobileFullWidth />
      ) : (
        <Slider
          title="New Products"
          items={data && data.latestProducts}
          routeState="/home"
        />
      )}
      <div className="md:max-w-7xl grid grid-cols-2 grid-rows-2 gap-5 px-5 md:px-0">
        <Banner />
        <Banner />
        <Banner />
        <Banner />
      </div>
      {filteredProductsLoading ? (
        <SliderLoader mobileFullWidth={true} />
      ) : (
        <Slider
          title={
            filteredProductsData &&
            filteredProductsData.filterProducts.categoryName
          }
          items={
            filteredProductsData && filteredProductsData.filterProducts.products
          }
          routeState="/home"
        />
      )}
    </div>
  );
}
