import { Mobile } from "./Mobile";
import { Desktop } from "./Desktop";
import { useLockBodyScroll, useMediaQuery } from "../../../hooks";

export const ProductListLoader = () => {
  const { isMobile } = useMediaQuery();
  useLockBodyScroll(true);
  const productListLoader = isMobile ? <Mobile /> : <Desktop />;
  return productListLoader;
};
