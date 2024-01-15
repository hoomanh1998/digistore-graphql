import { Order } from "../Order";
import { useSaveScrollPosition } from "../../../../../hooks/useSaveScrollPosition";
import { OrdersListPropTypes } from "../../../../../ts/types";

export const OrdersList = ({ orders }: OrdersListPropTypes) => {
  const { visitedNumber } = useSaveScrollPosition();

  if (orders && orders.length === 0) {
    return (
      <p className="bg-gray-100 dark:bg-gray-700 dark:text-white p-3 rounded-xl">
        No Orders Registered Yet
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 pb-3 md:pb-0">
      {orders &&
        orders.map((order) => (
          <Order
            key={order.id}
            order={order}
            visitedOrderNumber={visitedNumber}
          />
        ))}
    </ul>
  );
};
