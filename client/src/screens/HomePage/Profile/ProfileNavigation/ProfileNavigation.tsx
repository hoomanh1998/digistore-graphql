import { useContext, useState } from "react";
import { LogoutModal } from "../../../../components/Navigation/LogoutModal";
import { AuthContext } from "../../../../hoc/store";
import { ProfileNavigationHeader } from "./ProfileNavigationHeader";
import { ProfileNavigationList } from "./ProfileNavigationList";

export function ProfileNavigation() {
  const { onLogout } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const closeLogoutModalHandler = () => {
    setShowLogoutModal(false);
  };

  const openLogoutModalHandler = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      {showLogoutModal && (
        <LogoutModal
          showLogoutModal={showLogoutModal}
          onCloseLogoutModal={closeLogoutModalHandler}
          onLogout={onLogout}
        />
      )}
      <div className="flex flex-col min-h-screen md:min-h-0 bg-gray-200 dark:bg-gray-800 md:rounded-xl overflow-hidden md:w-64 md:sticky md:top-4 md:mb-4 md:mr-4 pb-navbar-height md:p-0">
        <ProfileNavigationHeader />
        <ProfileNavigationList openLogoutModal={openLogoutModalHandler} />
      </div>
    </>
  );
}
