import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../hoc/store";
import { useMediaQuery } from "../../../hooks";
import { useLazyQuery } from "@apollo/client";
import { uiActions } from "../../../store/ui";
import { NavigationItem } from "./NavigationItem";
import { GET_CURRENT_USER_CART } from "../../../graphQL";
import { Badge, CurrentUserCart, LocalCart, UI } from "../../../ts/types";
import { navItems, mobileNavItems } from "../navItems";

export function NavigationItems() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useContext(AuthContext);

  const cartItems = useSelector((state: LocalCart) => state.cart);

  const showSidebar = useSelector((state: UI) => state.ui.showSidebar);

  const { isMobile } = useMediaQuery();

  const [badge, setBadge] = useState<Badge>({
    show: false,
    number: 0,
  });

  const [getCurrentUserCart, { data }] = useLazyQuery<CurrentUserCart>(
    GET_CURRENT_USER_CART
  );

  const closeSidebarHandler = () => {
    dispatch(uiActions.closeSideBar());
  };

  useEffect(() => {
    getCurrentUserCart();
  }, [getCurrentUserCart]);

  useEffect(() => {
    isAuthenticated()
      ? setBadge(() => ({
          show: data && data.currentUser.cart.items.length > 0 ? true : false,
          number: data && data.currentUser.cart.items.length,
        }))
      : setBadge(() => ({
          show: cartItems.length > 0 ? true : false,
          number: cartItems.length,
        }));
  }, [isAuthenticated, data, cartItems.length]);

  const navigationItems = isMobile ? mobileNavItems : navItems;

  return (
    <>
      {navigationItems.map(
        (
          { title, path, isPrivateRoute, isExactPath, hasBadge, icon },
          index
        ) => (
          <NavigationItem
            key={index}
            title={title}
            path={path}
            icon={icon}
            isPrivateRoue={isPrivateRoute}
            isExactPath={isExactPath}
            hasBadge={hasBadge}
            badge={badge}
            showSidebar={showSidebar}
            onCloseSidebar={closeSidebarHandler}
          />
        )
      )}
    </>
  );
}
