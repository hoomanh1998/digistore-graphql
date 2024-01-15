import { useRef } from "react";
import {
  useHandleScroll,
  useMediaQuery,
  useShowAlert,
} from "../../../../hooks";
import { SuccessAlert } from "../../../../components/UI";
import { CartItemsList } from "./CartItemsList";
import { CartItemsLoader } from "../../../../components/SkeletonLoaders/CartItemsLoader";
import { CartItemsPropTypes } from "../../../../ts/types";

export const CartItems = ({ cart, loading }: CartItemsPropTypes) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const { isMobile } = useMediaQuery();
  const { isOnTop } = useHandleScroll();

  const {
    showAlert: showRemoveItemAlert,
    showAlertHandler: showRemoveItemAlertHandler,
  } = useShowAlert({ showTime: 1500 });

  return (
    <>
      <SuccessAlert
        alertMessage="Cart Item Removed"
        showAlert={showRemoveItemAlert}
      />
      <div className="bg-gray-200 dark:bg-gray-800 w-full md:min-h-full md:rounded-xl p-3 select-none">
        {isMobile ? (
          <h3
            ref={headerRef}
            className="text-2xl md:text-xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-700 px-1.5 pb-3 mb-3"
          >
            Cart Items
          </h3>
        ) : (
          <h3
            ref={headerRef}
            className={`text-xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-700 transition-positions duration-200 ease-in-out pb-2 ${
              isOnTop
                ? "relative top-0 mb-2 mx-2"
                : "sticky w-max top-3 bg-gray-200 dark:bg-gray-800 ring-2 ring-gray-300 dark:ring-gray-700 p-3 rounded-xl z-10 shadow-lg"
            }`}
          >
            Cart Items
          </h3>
        )}
        {loading ? (
          <CartItemsLoader />
        ) : (
          <CartItemsList
            cartItems={cart}
            onRemove={showRemoveItemAlertHandler}
          />
        )}
      </div>
    </>
  );
};
