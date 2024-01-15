import { Size, SliderItemsListPropTypes } from "../../../ts/types";
import { ProductCard } from "../../ProductCard";

export const SliderItemsList = ({
  items,
  sliderRef,
  routeState,
}: SliderItemsListPropTypes) => {
  if (items && items.length === 0) {
    return (
      <p className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl p-5 m-3">
        No related products found
      </p>
    );
  }

  return (
    <>
      {items &&
        items.map(({ id, title, price, image }) => (
          <ProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            image={image}
            routeState={routeState}
            size={Size.Medium}
            fixedWidth
          />
        ))}
    </>
  );
};
