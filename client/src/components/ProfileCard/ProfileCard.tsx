import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { AuthContext } from "../../hoc/store";
import { GET_CURRENT_USER_DETAILS } from "../../graphQL";
import { LogoutModal } from "../Navigation/LogoutModal";
import { useDidMount, useMediaQuery } from "../../hooks";
import { MobileProfileCard, DesktopProfileCard } from "./Views";
import { uiActions } from "../../store/ui";
import {
  CurrentUserDetails,
  ProfileCardParentPropTypes,
  UI,
} from "../../ts/types";

export const ProfileCard = ({
  showProfileCard,
  closeProfileCard,
}: ProfileCardParentPropTypes) => {
  const dispatch = useDispatch();

  const showSidebar = useSelector((state: UI) => state.ui.showSidebar);

  const { isMobile } = useMediaQuery();

  const { isAuthenticated, onLogout } = useContext(AuthContext);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [render, setRender] = useState(true);

  const [getCurrentUser, { loading, data }] = useLazyQuery<CurrentUserDetails>(
    GET_CURRENT_USER_DETAILS
  );

  const closeLogoutModalHandler = () => {
    setShowLogoutModal(false);
  };

  const openLogoutModalHandler = () => {
    setShowLogoutModal(true);
  };

  const closeSidebarHandler = () => {
    dispatch(uiActions.closeSideBar());
  };

  useDidMount(setRender, showSidebar);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const profileCard = isMobile ? (
    <MobileProfileCard
      isAuthenticated={isAuthenticated}
      showProfileCard={showProfileCard!}
      loading={loading}
      data={data}
      openLogoutModal={openLogoutModalHandler}
      closeProfileCard={closeProfileCard}
    />
  ) : (
    <DesktopProfileCard
      isAuthenticated={isAuthenticated}
      renderOnfirstMount={render}
      loading={loading}
      data={data}
      openLogoutModal={openLogoutModalHandler}
      sidebarOpen={showSidebar}
      closeSidebar={closeSidebarHandler}
    />
  );

  return (
    <>
      {showLogoutModal && (
        <LogoutModal
          showLogoutModal={showLogoutModal}
          onCloseLogoutModal={closeLogoutModalHandler}
          onLogout={onLogout}
        />
      )}
      {profileCard}
    </>
  );
};
