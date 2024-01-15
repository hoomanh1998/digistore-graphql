import { useHandleScroll } from "../../../hooks";
import { GoBackNavbarPropTypes } from "../../../ts/types";

export const GoBack = ({
  children,
  backgroundColor,
  pathname,
  fixed,
}: GoBackNavbarPropTypes) => {
  const { visible, isOnTop } = useHandleScroll();

  let classes = `sticky w-full dark:bg-gray-800 top-0 left-0 flex flex-row justify-between transform transition-navbar duration-500 ease-in-out py-5 px-4 z-40 ${
    backgroundColor ? backgroundColor : "bg-white"
  } ${visible ? "translate-y-0" : "-translate-y-24"} ${
    isOnTop ? "shadow-none" : "shadow-md"
  }`;

  if (fixed) {
    classes = `fixed w-full dark:bg-gray-800 top-0 left-0 flex flex-row justify-between transform transition-navbar duration-500 ease-in-out py-5 px-4 z-40 ${
      backgroundColor ? backgroundColor : "bg-white"
    }`;
  }

  if (pathname) {
    classes = `fixed w-full top-0 left-0 flex flex-row justify-between transform transition-navbar duration-500 ease-in-out py-5 px-4 z-40 ${
      visible ? "translate-y-0" : "-translate-y-24"
    } ${
      isOnTop
        ? "bg-transparent shadow-none"
        : "bg-gray-200 dark:bg-gray-800 shadow-md"
    }`;
  }

  return <div className={classes}>{children}</div>;
};
