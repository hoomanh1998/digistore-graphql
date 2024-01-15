import { Product } from "../../../../../ts/types";
import { WishListProductCard } from "../../../../../components/ProductCard/WishListProductCard";

interface PropTypes {
  wishListItems: Product[] | undefined;
  removeWishListItem: () => void;
}

export function WishListItems({
  wishListItems,
  removeWishListItem,
}: PropTypes) {
  if (wishListItems && wishListItems.length === 0) {
    return (
      <p className="bg-gray-100 dark:bg-gray-700 dark:text-white p-3 rounded-xl">
        No items added yet!
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 pb-3 md:pb-0">
      {wishListItems &&
        wishListItems.map(({ id, title, price, category }) => (
          <WishListProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            category={category.name}
            routeState="/home/profile/wishlist"
            actionHandler={removeWishListItem}
          />
        ))}
    </ul>
  );
}
