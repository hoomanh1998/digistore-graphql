import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckoutProductCard } from "../../../../components/ProductCard/CheckoutProductCard";
import { Modal } from "../../../../hoc/Modal";
import { CheckoutPropTypes, OrderData } from "../../../../ts/types";
import { capitalizedFirstLetter, numberWithCommas } from "../../../../common";
import { Button } from "../../../../components/UI";
import { CloseIcon, LocationIcon } from "../../../../assets/svgs";

export function Checkout({ showCheckout, onHideCheckout }: CheckoutPropTypes) {
  const history = useHistory();
  const order = useSelector((state: OrderData) => state.order);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 200);
  }, []);

  return (
    <Modal showModal={showCheckout}>
      <div
        className={`absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 my-10 flex flex-col w-full min-h-full md:min-h-full md:max-w-xl bg-gray-200 dark:bg-gray-800 rounded-t-3xl transform transition-transform duration-300 ease-in-out p-3 pb-safe-inset-bottom pt-5 z-50 ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h3 className="text-2xl md:text-xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-700 px-2 pb-3 mb-3">
          Order Details
        </h3>
        <div
          className="absolute top-5 md:top-4 right-5 bg-gray-100 dark:bg-gray-600 shadow-md rounded-full cursor-pointer p-1"
          onClick={() => {
            setShow(false);
            setTimeout(() => {
              onHideCheckout();
            }, 200);
          }}
        >
          <CloseIcon />
        </div>

        <div className="flex flex-col bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg py-2 px-3 mb-3">
          <h4 className="text-gray-800 dark:text-white text-lg font-bold">
            Order Date
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {order.orderDate}
          </p>
        </div>
        <div className="flex flex-col mb-3">
          <h4 className="text-gray-800 dark:text-white text-1xl md:text-xl font-bold mb-2 mx-2">
            Products
          </h4>
          <ul className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {order.orderItems.map(
              ({ product: { id, title, price, category }, quantity }) => (
                <CheckoutProductCard
                  key={id}
                  title={title}
                  price={price}
                  category={category.name}
                  quantity={quantity}
                />
              )
            )}
          </ul>
        </div>
        <div className="flex flex-col mb-3">
          <h4 className="text-gray-800 dark:text-white text-1xl md:text-xl font-bold mb-2 mx-2">
            Location
          </h4>
          <div className="flex bg-gray-100 dark:bg-gray-700 p-2 rounded-xl items-start relative  shadow-lg">
            <div className="flex p-4 m-1 rounded-full bg-gray-300">
              <LocationIcon strokeColor="black" />
            </div>
            <div className="flex w-full justify-between items-center ml-2">
              <div className="flex flex-col mr-10">
                <span className="font-semibold dark:text-white">
                  {capitalizedFirstLetter(order.deliveryLocation.city)}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {order.deliveryLocation.address}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <h4 className="text-gray-800 dark:text-white text-1xl md:text-xl font-bold mb-2 mx-2">
            Payment Details
          </h4>
          <div className="flex flex-col bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg p-3">
            <div className="flex flex-row justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-3 mb-3">
              <span className="dark:text-white">Total Items</span>
              <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
                {order.totalItems}
              </span>
            </div>
            <div className="flex flex-row justify-between items-center">
              <span className="dark:text-white">Total Price</span>
              <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
                {numberWithCommas(order.totalPrice)}$
              </span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => history.replace("/home/profile/orders")}
          color="btn-blue"
        >
          Show recent orders
        </Button>
      </div>
    </Modal>
  );
}
