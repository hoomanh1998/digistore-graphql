import clsx from "clsx";
import { useState, useEffect } from "react";

type AlertType = "success" | "error" | "notification";

interface PropTypes {
  show: boolean;
  message: string | undefined;
  type: AlertType;
}

export const AlertMessage = ({
  show,
  message,
  type = "notification",
}: PropTypes) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (show) {
      setIsShow(true);
      const timer = setTimeout(() => {
        setIsShow(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const alertWrapperClasses = clsx(
    "fixed flex left-0 right-0 justify-center transition-transform duration-150 ease-out z-50 font-semibold m-3 text-white ",
    {
      "translate-y-0 top-0": isShow,
      "-translate-y-full -top-6": !isShow,
    }
  );
  const alertClasses = clsx(
    "flex items-center w-[calc(100%-2rem)] md:max-w-lg lg:max-w-xl h-16 rounded shadow-lg p-5",
    {
      "bg-green-500": type === "success",
      "bg-red-400": type === "error",
      "bg-gray-500": type === "notification",
    }
  );
  return (
    <div className={alertWrapperClasses}>
      <div className={alertClasses}>{message}</div>
    </div>
  );
};
