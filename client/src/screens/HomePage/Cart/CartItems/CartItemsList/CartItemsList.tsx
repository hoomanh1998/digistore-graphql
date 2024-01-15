import { CartItem } from "../CartItem";
import { CartItemsListPropTypes } from "../../../../../ts/types";

export function CartItemsList({ cartItems, onRemove }: CartItemsListPropTypes) {
  if (cartItems && cartItems.length === 0) {
    return (
      <p className="bg-gray-100 dark:bg-gray-700 dark:text-white p-3 rounded-xl">
        No items added yet!
      </p>
    );
  }

  return (
    <ul className="grid grid-flow-row grid-cols-1 lg:grid-cols-2">
      {cartItems &&
        cartItems.map(
          ({ product: { id, title, price, category }, quantity }) => (
            <CartItem
              key={id}
              id={id}
              title={title}
              price={price}
              category={category.name}
              quantity={quantity}
              onRemove={onRemove}
              routeState="/home/cart"
            />
          )
        )}
    </ul>
  );
}
