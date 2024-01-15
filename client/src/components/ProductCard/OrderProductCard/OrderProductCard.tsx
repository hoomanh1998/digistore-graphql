import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductCardPropTypes } from "../../../ts/types";
import Image from "../../../assets/images/ps5-controller.jpg";
import { pathActions } from "../../../store/path";

export const OrderProductCard = ({
  id,
  title,
  price,
  category,
  quantity,
  routeState,
}: ProductCardPropTypes) => {
  const dispatch = useDispatch();
  const routePath = routeState
    ? {
        pathname: `/home/products/${id}`,
        state: routeState ? routeState : null,
      }
    : `/home/products/${id}`;

  return (
    <Link
      onClick={() =>
        routeState && dispatch(pathActions.setProductPrevPath(routeState))
      }
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
      <div className="absolute right-1 bottom-1 flex justify-center items-center dark:text-white rounded-full font-semibold leading-3 p-2">
        x{quantity}
      </div>
      <div className="flex-1 relative w-full flex flex-col justify-between items-start">
        <div className="dark:text-white font-semibold line-clamp-2 leading-snug">
          {title}
        </div>
        <div className="flex flex-col items-start space-y-1">
          <div className="text-sm text-gray-500 dark:text-gray-400 ml-0.5">
            {category}
          </div>
          <span className="text-sm font-semibold text-white bg-blue-400 dark:bg-gray-900 rounded-lg leading-snug py-1 px-2">
            {"$" + price}
          </span>
        </div>
      </div>
    </Link>
  );
};
