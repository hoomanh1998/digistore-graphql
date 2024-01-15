import { OrderInfoPropTypes } from "../../../../ts/types";
import { numberWithCommas } from "../../../../common";

export const OrderInfo = ({ totalPrice, totalItems }: OrderInfoPropTypes) => {
  return (
    <div className="flex flex-col mb-4">
      <h4 className="text-gray-800 dark:text-white text-1xl md:text-xl font-bold mb-2 mx-2">
        Order Info
      </h4>
      <div className="flex flex-col bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg p-3">
        <div className="flex flex-row justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-3 mb-3">
          <span className="dark:text-white">Total Items</span>
          <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
            {totalItems}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="dark:text-white">Total Price</span>
          <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
            ${numberWithCommas(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};
