import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { GoBack } from "../../../../../components/Navigation/GoBack";
import { OrderProductCard } from "../../../../../components/ProductCard/OrderProductCard";
import { OrderDetailsLoader } from "../../../../../components/SkeletonLoaders/OrdersLoader/OrderDetailsLoader";
import { GET_ORDER } from "../../../../../graphQL";
import { ErrorAlert } from "../../../../../components/UI";
import { useMediaQuery, useShowAlert } from "../../../../../hooks";
import { OrderData, ReactRouterParam } from "../../../../../ts/types";
import {
  capitalizedFirstLetter,
  numberWithCommas,
} from "../../../../../common";
import {
  CloseIcon,
  GoBackIcon,
  LocationIcon,
} from "../../../../../assets/svgs";

export function OrderDetails() {
  const history = useHistory();
  const { isMobile } = useMediaQuery();
  const { id: orderId } = useParams<ReactRouterParam>();

  const { showAlert: showErrorAlert } = useShowAlert({
    showTime: 2000,
  });

  const { loading, error, data } = useQuery<OrderData>(GET_ORDER, {
    variables: { orderId: parseInt(orderId) },
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <ErrorAlert error={error} showAlert={showErrorAlert} />
      {isMobile && (
        <GoBack backgroundColor="bg-gray-200">
          <div
            className="cursor-pointer"
            onClick={() =>
              history.replace({
                pathname: "/home/profile/orders",
              })
            }
          >
            <GoBackIcon />
          </div>
        </GoBack>
      )}
      <div className="bg-gray-200 dark:bg-gray-800 relative flex flex-1 flex-col w-full h-full md:rounded-xl p-3 pb-navbar-height select-none">
        <h3 className="text-2xl md:text-xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-700 px-1.5 pb-3 mb-3">
          Order Details
          {loading ? (
            <div className="animate-pulse-fast h-5 bg-gray-400 dark:bg-gray-700 rounded w-24" />
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-base">{`Code.${orderId}`}</p>
          )}
        </h3>
        <div
          className="hidden md:block absolute top-3 right-3 bg-gray-100 dark:bg-gray-600 shadow-md rounded-full cursor-pointer p-1"
          onClick={() => history.replace("/home/profile/orders")}
        >
          <CloseIcon />
        </div>
        {loading ? (
          <OrderDetailsLoader />
        ) : (
          <div className="flex flex-1 flex-col lg:flex-row items-start lg:space-x-4">
            <ul className="w-full grid grid-cols-1 xl:grid-cols-2 gap-3 mb-3">
              {data &&
                data.order.orderItems.map(
                  ({ product: { id, title, price, category }, quantity }) => (
                    <OrderProductCard
                      key={id}
                      id={id}
                      title={title}
                      price={price}
                      category={category.name}
                      quantity={quantity}
                      routeState={`/home/profile/orders/${orderId}`}
                    />
                  )
                )}
            </ul>
            <div className="flex flex-col w-full lg:w-114 md:bg-blue-400 md:dark:bg-gray-700 md:shadow-md rounded-xl pb-3 md:p-3">
              <div className="flex flex-col md:max-w-xs mb-3">
                <h4 className="text-xl md:text-lg dark:text-white md:text-white font-semibold mb-2 mx-1">
                  Order Date
                </h4>
                <p className="bg-gray-100 dark:bg-gray-700 md:dark:bg-gray-800 rounded-xl shadow-lg py-2.5 px-3.5 dark:text-white">
                  {data && data.order.orderDate}
                </p>
              </div>
              <div className="flex flex-col mb-3">
                <h4 className="text-xl md:text-lg dark:text-white md:text-white font-semibold mb-2 mx-1">
                  Delivered Location
                </h4>
                <div className="flex bg-gray-100 dark:bg-gray-700 md:dark:bg-gray-800 p-2 rounded-xl items-start relative shadow-lg">
                  <div className="flex p-4 m-1 rounded-full bg-gray-300 dark:bg-gray-600">
                    <LocationIcon />
                  </div>
                  <div className="flex w-full justify-between items-center ml-2">
                    <div className="flex flex-col mr-10">
                      <span className="font-semibold dark:text-white">
                        {data &&
                          data.order.deliveryLocation.city &&
                          capitalizedFirstLetter(
                            data.order.deliveryLocation.city
                          )}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {data && data.order.deliveryLocation.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-xl md:text-lg dark:text-white md:text-white font-semibold mb-2 mx-1">
                  Payment Details
                </h4>
                <div className="flex flex-col bg-gray-100 dark:bg-gray-700 md:dark:bg-gray-800 rounded-xl shadow-lg p-3">
                  <div className="flex flex-row justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-3 mb-3">
                    <span className="dark:text-white">Total Items</span>
                    <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
                      {data && data.order.totalItems}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <span className="dark:text-white">Total Price</span>
                    <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
                      {numberWithCommas(data && data.order.totalPrice)}$
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
