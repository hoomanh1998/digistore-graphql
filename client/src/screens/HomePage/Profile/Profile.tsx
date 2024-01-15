import { useEffect } from "react";
import { useMediaQuery } from "../../../hooks";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { AdminRoute } from "../../../hoc/AdminRoute";
import { GoBack } from "../../../components/Navigation/GoBack";
import { AdminPanel } from "./AdminPanel";
import { OrderDetails } from "./Orders/OrderDetails";
import { Orders } from "./Orders";
import { Notifications } from "./Notifications";
import { WishList } from "./WishList";
import { Locations } from "./Locations";
import { ProfileNavigation } from "./ProfileNavigation";
import { ProfileInfo } from "./ProfileInfo";
import { NotFoundPage } from "../../NotFoundPage";
import { GoBackIcon } from "../../../assets/svgs";

export function Profile() {
  const history = useHistory();
  const { isMobile } = useMediaQuery();
  const { pathname } = useLocation();
  const match = useRouteMatch();
  const orderDetailsURL = useRouteMatch("/home/profile/orders/:id");

  const goBackButton =
    pathname !== "/home/profile" && pathname !== orderDetailsURL?.url ? (
      <GoBack backgroundColor="bg-gray-200">
        <div
          className="cursor-pointer"
          onClick={() => {
            history.replace("/home/profile");
          }}
        >
          <GoBackIcon />
        </div>
      </GoBack>
    ) : null;

  useEffect(() => {
    if (pathname === "/home/profile" && !isMobile)
      history.replace("/home/profile/orders");
  }, [isMobile, history, pathname]);

  return (
    <div className="flex flex-col md:flex-row md:items-start w-full min-h-screen bg-gray-200 dark:bg-gray-800 md:bg-gray-100 md:dark:bg-gray-700 md:p-4">
      {isMobile && goBackButton}
      {!isMobile && <ProfileNavigation />}
      <Switch>
        {isMobile && (
          <Route path={`${match.path}`} exact component={ProfileNavigation} />
        )}
        <AdminRoute path={`${match.path}/admin-panel`} component={AdminPanel} />
        <Route path={`${match.path}/orders/:id`} component={OrderDetails} />
        <Route path={`${match.path}/orders`} component={Orders} />
        <Route path={`${match.path}/notifications`} component={Notifications} />
        <Route path={`${match.path}/wishlist`} component={WishList} />
        <Route path={`${match.path}/locations`} component={Locations} />
        <Route path={`${match.path}/info`} component={ProfileInfo} />
        <Route component={NotFoundPage} path="*" />
      </Switch>
    </div>
  );
}
