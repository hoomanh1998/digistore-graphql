import { Link } from "react-router-dom";
import { ShoppingIcon } from "../../../assets/svgs";
import { ProductCardPropTypes } from "../../../ts/types";
import Image from "../../../assets/images/ps5_placeholder.jpg";

export function MediumProductCard({
  title,
  price,
  path,
  reference,
  addToCart,
  addToCartLoading,
  fixedWidth = false,
}: ProductCardPropTypes) {
  return (
    <Link
      className={`flex flex-col bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md cursor-pointer p-1.5 ${
        fixedWidth ? "w-44 md:w-52 mx-2" : ""
      }`}
      onDragStart={(e) => e.preventDefault()}
      to={path!}
      ref={reference}
      draggable="false"
    >
      <img
        src={Image}
        alt="product"
        draggable="false"
        className="object-cover flex-shrink-0 w-full h-32 md:h-40 rounded-lg pointer-events-none shadow-md mb-2"
      />
      <div className="relative flex flex-col justify-between items-start h-full p-0.5">
        <div className="text-gray-800 dark:text-white font-semibold line-clamp-2 leading-snug mx-1 mb-2">
          {title}
        </div>
        <span className="md:text-sm font-semibold text-white bg-blue-400 dark:bg-gray-900 rounded-lg leading-snug py-1 px-2">
          {"$" + price}
        </span>
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
