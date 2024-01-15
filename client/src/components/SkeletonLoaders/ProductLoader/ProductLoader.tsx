import { Mobile } from "./Mobile";
import { Desktop } from "./Desktop";
import { useLockBodyScroll, useMediaQuery } from "../../../hooks";

export const ProductLoader = () => {
  const { isMobile } = useMediaQuery();
  useLockBodyScroll(true);
  const productLoader = isMobile ? <Mobile /> : <Desktop />;
  return productLoader;
};
