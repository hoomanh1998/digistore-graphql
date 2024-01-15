import { useEffect } from "react";
import { useLockBodyScroll, useMediaQuery } from "../../../hooks";
import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";

export const CartItemsLoader = () => {
  const { isMobile } = useMediaQuery();
  useLockBodyScroll(true);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const cartLoader = isMobile ? <Mobile /> : <Desktop />;

  return cartLoader;
};
