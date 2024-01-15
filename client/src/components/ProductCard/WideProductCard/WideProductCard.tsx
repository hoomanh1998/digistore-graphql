import { Link } from "react-router-dom";
import { ShoppingIcon } from "../../../assets/svgs";
import { ProductCardPropTypes } from "../../../ts/types";
import Image from "../../../assets/images/ps5_placeholder.jpg";

export function WideProductCard({
  title,
  price,
  category,
  path,
  reference,
  addToCart,
  addToCartLoading,
}: ProductCardPropTypes) {
  return (
    <Link
      className="w-full flex flex-row bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md cursor-pointer space-x-3 p-2"
      to={path!}
      ref={reference}
      draggable="false"
    >
      <img
        src={Image}
        alt="product"
        draggable="false"
        className="object-cover w-28 h-24 shadow-md rounded-lg"
      />
      <div className="relative w-full flex flex-col justify-between items-start">
        <div className="dark:text-white font-semibold line-clamp-2 leading-snug">
          {title}
        </div>
        <div className="flex flex-col items-start space-y-0.5">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {category}
          </div>
          <span className="text-sm font-semibold text-white bg-blue-400 dark:bg-gray-900 rounded-lg leading-snug py-1 px-2">
            {"$" + price}
          </span>
        </div>
        <div
          onClick={(event) => addToCart && addToCart(event)}
          className="absolute right-1 bottom-1"
        >
          {addToCartLoading ? (
            <div className="w-6 h-6 animate-spin spinner-loader-dark dark:spinner-loader m-3" />
          ) : (
            <ShoppingIcon />
          )}
        </div>
      </div>
    </Link>
  );
}
