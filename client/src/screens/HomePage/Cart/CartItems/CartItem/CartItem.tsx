import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { CartItemPropTypes } from "../../../../../ts/types";
import { TrashIcon, PlusIcon, MinusIcon } from "../../../../../assets/svgs";
import { useMutation } from "@apollo/client";
import {
  DECREASE_CART_ITEM_QUANTITY,
  GET_CURRENT_USER_CART,
  INCREASE_CART_ITEM_QUANTITY,
  REMOVE_ITEM_FROM_CART,
} from "../../../../../graphQL";
import Image from "../../../../../assets/images/ps5-controller.jpg";
import { AuthContext } from "../../../../../hoc/store";

export const CartItem = ({
  id,
  title,
  price,
  category,
  quantity,
  onRemove,
  routeState,
}: CartItemPropTypes) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [cartItemDeleted, setCartItemDeleted] = useState(false);

  const routePath = routeState
    ? {
        pathname: `/home/products/${id}`,
        state: routeState ? routeState : null,
      }
    : `/home/products/${id}`;

  const [increaseCartItemQuantity, { loading: increaseLoading }] = useMutation(
    INCREASE_CART_ITEM_QUANTITY,
    {
      refetchQueries: [{ query: GET_CURRENT_USER_CART }],
    }
  );

  const [decreaseCartItemQuantity, { loading: decreaseLoading }] = useMutation(
    DECREASE_CART_ITEM_QUANTITY,
    {
      refetchQueries: [{ query: GET_CURRENT_USER_CART }],
    }
  );

  const [removeItemFromCart, { loading: removeItemFromCartLoading }] =
    useMutation(REMOVE_ITEM_FROM_CART, {
      update(cache, { data: { removeItemFromCart } }) {
        cache.evict({ id: `CartItem:${removeItemFromCart.id}` });
        cache.modify({
          id: `User:${authState.userInfo && authState.userInfo.id}`,
          fields: {
            cart(currentCartRef) {
              cache.modify({
                id: currentCartRef.__ref,
                fields: {
                  items: (existingCartItems) => {
                    return existingCartItems.filter(
                      (cartItem: any) =>
                        cartItem.__ref !== `CartItem:${removeItemFromCart.id}`
                    );
                  },
                },
              });
            },
          },
        });
      },
      onCompleted() {
        onRemove();
        setCartItemDeleted(true);
      },
    });

  return (
    <li
      className={`relative flex flex-col bg-gray-100 dark:bg-gray-700 rounded-xl items-start overflow-y-auto transition-cart-item duration-300 ease-in-out shadow-lg last:mb-0 md:last:mb-3 space-y-3 p-2 ${
        cartItemDeleted
          ? "opacity-0 max-h-0 mb-0"
          : "opacity-100 max-h-150 mb-3 lg:odd:mr-3"
      }`}
    >
      <div
        onClick={() => {
          history.push(routePath);
        }}
        className="flex flex-row space-x-3 cursor-pointer"
      >
        <img
          src={Image}
          alt="product"
          draggable="false"
          className="object-cover w-28 h-24 shadow-md rounded-lg"
        />
        <div className="relative flex flex-col justify-between items-start h-full">
          <div className="flex flex-col justify-between items-start h-full">
            <div className="dark:text-white font-semibold line-clamp-2 leading-snug">
              {title}
            </div>
            <div className="flex flex-col items-start space-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {category}
              </div>
              <span className="text-sm font-bold text-white bg-blue-400 dark:bg-gray-900 rounded-lg leading-snug py-1 px-2">
                {"$" + price}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row relative w-full justify-between">
        <div className="flex items-center">
          <button
            className="btn bg-gray-300 active:bg-gray-300 disabled:opacity-30 p-2 rounded-full mr-2 cursor-pointer"
            disabled={quantity === 1 || decreaseLoading}
            onClick={(event) => {
              event.stopPropagation();
              decreaseCartItemQuantity({ variables: { product_id: id } });
            }}
          >
            {decreaseLoading ? (
              <div className="w-4 h-4 animate-spin spinner-loader-dark" />
            ) : (
              <MinusIcon smallIcon={true} />
            )}
          </button>
          <span className="dark:text-white font-semibold">{quantity}</span>
          <button
            className="btn bg-gray-300 active:bg-gray-300 disabled:opacity-30 p-2 rounded-full ml-2 cursor-pointer"
            disabled={increaseLoading}
            onClick={(event) => {
              event.stopPropagation();
              increaseCartItemQuantity({ variables: { product_id: id } });
            }}
          >
            {increaseLoading ? (
              <div className="w-4 h-4 animate-spin spinner-loader-dark" />
            ) : (
              <PlusIcon smallIcon={true} />
            )}
          </button>
        </div>
        <button
          className="btn bg-red-400 hover:bg-red-500 transition duration-150 ease-in-out rounded-lg shadow-sm cursor-pointer px-2 py-1"
          onClick={(event) => {
            event.stopPropagation();
            removeItemFromCart({ variables: { product_id: id } });
          }}
        >
          {removeItemFromCartLoading ? (
            <div className="w-4 h-4 animate-spin spinner-loader" />
          ) : (
            <div className="flex flex-row justify-center items-center">
              <span className="mr-1 text-white font-semibold">Remove</span>
              <TrashIcon smallIcon={true} />
            </div>
          )}
        </button>
      </div>
    </li>
  );
};
