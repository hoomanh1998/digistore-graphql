import { useRouteMatch } from "react-router-dom";
import { useMediaQuery } from "../../hooks";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileNavbar } from "./MobileNavbar";

export function Navigation() {
  const { isMobile } = useMediaQuery();
  const match = useRouteMatch("/home/products/:id");

  let navigation = null;
  if (isMobile) {
    navigation = match ? null : <MobileNavbar />;
  } else {
    navigation = <DesktopSidebar />;
  }

  return navigation;
}
