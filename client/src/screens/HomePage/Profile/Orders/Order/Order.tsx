import { useRef } from "react";
import { Link } from "react-router-dom";
import { Order as OrderType } from "../../../../../ts/types";
import { ArrowRightIcon } from "../../../../../assets/svgs";
import Image from "../../../../../assets/images/ps5-controller.jpg";

interface PropTypes {
  order: OrderType | undefined;
  visitedOrderNumber: number | undefined;
}

export const Order = ({ order, visitedOrderNumber }: PropTypes) => {
  const liRef = useRef<HTMLLIElement>(null);

  const orderId = order && parseInt(order.id);

  return (
    <li
      ref={liRef}
      className={`flex flex-col justify-between relative bg-gray-100 dark:bg-gray-700 shadow-lg rounded-xl p-2 ${
        visitedOrderNumber === orderId
          ? "animate-transparent dark:animate-transparent-dark md:animate-none"
          : ""
      }`}
    >
      <h5 className="text-lg dark:text-white font-semibold mx-2 mb-2">
        {`Order Code.${order && order.id}`}
      </h5>
      <div className="flex hide-scrollbars overflow-x-auto items-start">
        <div className="relative flex flex-row flex-1 justify-between select-none w-full p-1">
          {order &&
            order.orderItems.map(({ product: { title, price } }, index) => {
              switch (index) {
                case 0:
                  return (
                    <div
                      key={index}
                      className="flex flex-col flex-shrink-0 items-center bg-gray-200 dark:bg-gray-800 rounded-xl w-28 space-y-1 p-1.5 z-20 h-40"
                    >
                      <div className="flex flex-shrink-0 justify-center w-24 h-18">
                        <img
                          src={Image}
                          draggable="false"
                          alt="product"
                          className="object-cover w-24 h- rounded-lg shadow-md overflow-hidden"
                        />
                      </div>
                      <div className="flex flex-col w-full h-full justify-between">
                        <div className="flex flex-col items-start justify-between h-full">
                          <span className="text-xs font-semibold dark:text-white line-clamp-2 leading-relaxed px-1 mt-0.5">
                            {title}
                          </span>
                          <span className="text-xs font-semibold text-white bg-blue-400 dark:bg-gray-900 rounded-lg py-1 px-2">
                            {"$" + price}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                case 1:
                  return (
                    <div
                      key={index}
                      className="absolute left-10 top-3 h-36 flex flex-col flex-shrink-0 items-center bg-white dark:bg-gray-800 rounded-xl w-24 overflow-hidden p-2 z-10"
                    >
                      <div className="absolute left-0 top-0 w-full h-full bg-gray-500 dark:bg-gray-700 opacity-40" />
                    </div>
                  );
                case 2:
                  return (
                    <div
                      key={index}
                      className="absolute left-18 top-5 h-32 flex flex-col flex-1 items-center bg-white dark:bg-gray-800 rounded-xl w-20 overflow-hidden p-2"
                    >
                      <div className="absolute left-0 top-0 w-full h-full bg-gray-500 dark:bg-gray-700 opacity-60" />
                    </div>
                  );
                default:
                  return null;
              }
            })}
        </div>
        <div className="flex flex-row flex-shrink justify-end bg-gray-100 dark:bg-gray-700 mb-0 mt-auto z-10 rounded-lg overflow-hidden pl-2 md:p-1 md:pl-2">
          <Link
            className="flex flex-row items-center"
            onClick={() => {
              sessionStorage.setItem(
                "scrollPosition",
                JSON.stringify({
                  number: orderId,
                  position: window.pageYOffset.toString(),
                })
              );
            }}
            to={{
              pathname: `/home/profile/orders/${order && order.id}`,
            }}
          >
            <span className="text-blue-400 font-semibold break-words">
              View Order
            </span>
            <ArrowRightIcon strokeColor="stroke-light-blue" />
          </Link>
        </div>
      </div>
    </li>
  );
};
