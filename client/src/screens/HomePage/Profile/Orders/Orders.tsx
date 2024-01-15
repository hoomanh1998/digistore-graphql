import { useQuery } from "@apollo/client";
import { OrdersList } from "./OrdersList";
import { OrdersLoader } from "../../../../components/SkeletonLoaders/OrdersLoader";
import { GET_CURRENT_USER_ORDERS } from "../../../../graphQL";
import { CurrentUserOrders } from "../../../../ts/types";

export function Orders() {
  const { loading, data } = useQuery<CurrentUserOrders>(
    GET_CURRENT_USER_ORDERS
  );

  const orders = loading ? (
    <OrdersLoader />
  ) : (
    <OrdersList orders={data && data.currentUser.orders} />
  );

  return (
    <div className="bg-gray-200 dark:bg-gray-800 flex flex-1 flex-col w-full h-full md:rounded-xl p-3 pb-navbar-height select-none">
      <h3 className="text-2xl md:text-xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-700 px-1.5 pb-3 mb-3">
        Orders
      </h3>
      {orders}
    </div>
  );
}
