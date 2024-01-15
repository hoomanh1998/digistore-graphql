import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  GET_CURRENT_USER_DETAILS,
  REMOVE_FROM_WISH_LIST,
} from "../../../graphQL";
import { CurrentUserDetails, ProductCardPropTypes } from "../../../ts/types";
import { TrashIcon } from "../../../assets/svgs";
import Image from "../../../assets/images/ps5-controller.jpg";

export function WishListProductCard({
  id,
  title,
  price,
  category,
  routeState,
  actionHandler,
}: ProductCardPropTypes) {
  const { data: currentUserDetails } = useQuery<CurrentUserDetails>(
    GET_CURRENT_USER_DETAILS
  );

  const [removeFromWishList, { loading }] = useMutation(REMOVE_FROM_WISH_LIST, {
    update(cache, { data: { removeFromWishList } }) {
      cache.modify({
        id: `User:${currentUserDetails?.currentUser.id}`,
        fields: {
          wishList(wishListRef) {
            cache.modify({
              id: wishListRef.__ref,
              fields: {
                items: (existingItems) => {
                  return existingItems.filter(
                    (product: any) =>
                      product.__ref !== `Product:${removeFromWishList.id}`
                  );
                },
              },
            });
          },
        },
      });
    },
    onCompleted() {
      actionHandler && actionHandler();
    },
  });

  const routePath = routeState
    ? {
        pathname: `/home/products/${id}`,
        state: routeState ? routeState : null,
      }
    : `/home/products/${id}`;

  return (
    <Link
      className="relative w-full flex flex-row bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md cursor-pointer space-x-3 p-2"
      to={routePath}
      draggable="false"
    >
      <img
        src={Image}
        alt="product"
        draggable="false"
        className="object-cover w-28 h-24 shadow-md rounded-lg"
      />
      <div className="flex-1 relative w-full flex flex-col justify-between items-start">
        <div className="dark:text-white font-semibold line-clamp-2 leading-snug">
          {title}
        </div>
        <div className="flex flex-col items-start space-y-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {category}
          </div>
          <span className="text-sm font-semibold text-white bg-blue-400 dark:bg-gray-900 rounded-lg leading-snug py-1 px-2">
            {"$" + price}
          </span>
        </div>
        <div
          onClick={(event) => {
            event.preventDefault();
            removeFromWishList({ variables: { product_id: id } });
          }}
          className="absolute bottom-0 right-0 bg-red-400 hover:bg-red-500 transition duration-150 ease-in-out rounded-full shadow-sm cursor-pointer p-2"
        >
          {loading ? (
            <div className="w-4 h-4 animate-spin spinner-loader" />
          ) : (
            <TrashIcon smallIcon={true} />
          )}
        </div>
      </div>
    </Link>
  );
}
