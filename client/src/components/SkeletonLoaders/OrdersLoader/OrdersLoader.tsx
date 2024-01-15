import { useLockBodyScroll } from "../../../hooks";
import { OrderLoader } from "./OrderLoader";

export const OrdersLoader = () => {
  useLockBodyScroll(true);
  return (
    <div className="flex flex-col dark:bg-gray-800">
      <div className="animate-pulse-fast flex flex-col w-full h-screen overflow-hidden">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {[...Array(7)].map((_, index) => (
            <OrderLoader key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};
