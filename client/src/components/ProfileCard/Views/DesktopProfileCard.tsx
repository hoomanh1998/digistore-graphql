import { Link } from "react-router-dom";
import { Tooltip } from "../../UI";
import { ProfileCardPropTypes } from "../../../ts/types";
import { LogoutIcon, ProfileIcon } from "../../../assets/svgs";
import UserProfileImage from "../../../assets/images/user-profile.jpg";

export const DesktopProfileCard = ({
  isAuthenticated,
  renderOnfirstMount,
  loading,
  data,
  openLogoutModal,
  sidebarOpen,
  closeSidebar,
}: ProfileCardPropTypes) => {
  if (isAuthenticated() && data) {
    const { firstName, lastName, email } = data.currentUser;
    return (
      <div
        onClick={() => {
          sidebarOpen && closeSidebar && closeSidebar();
        }}
        className={`flex flex-row relative dark:text-white rounded-xl transition-navigation-items duration-150 ease-in-out group cursor-pointer ${
          renderOnfirstMount
            ? "bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-700 dark:to-gray-800 ring-1 ring-gray-300 dark:ring-transparent p-3 pr-11"
            : "bg-blue-500 dark:bg-gray-900 items-center"
        } ${sidebarOpen ? "w-full" : "w-12"}`}
      >
        <Link
          className="flex flex-row justify-start w-full md:overflow-x-hidden transition-navigation-items"
          to="/home/profile"
        >
          <div className="flex flex-shrink-0 rounded-full overflow-hidden w-11 h-11 ring-2 ring-gray-300 dark:ring-gray-700 m-0.5">
            <img
              src={UserProfileImage}
              alt="user-profile"
              className="object-cover w-11 h-11"
            />
          </div>
          {sidebarOpen &&
            (loading ? (
              <div className="animate-pulse-fast flex flex-col items-baseline w-full space-y-2 px-3">
                <div className="h-6 bg-gray-300 dark:bg-gray-500 rounded w-full" />
                <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-full" />
              </div>
            ) : (
              <div
                className={`font-bold text-gray-800 dark:text-white overflow-x-hidden transition-navigation-items duration-200 ease-in-out transform line-clamp-2 pl-3 ${
                  renderOnfirstMount ? "opacity-100 w-auto" : "opacity-0 w-0"
                }`}
              >
                <div className="leading-5 overflow-y-hidden line-clamp-2">
                  {firstName + " " + lastName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {email}
                </div>
              </div>
            ))}
        </Link>
        {sidebarOpen && (
          <div
            onClick={(event) => {
              event.stopPropagation();
              openLogoutModal();
            }}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded-lg transition-navigation-items duration-150 ease-in-out cursor-pointer ${
              renderOnfirstMount ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            <LogoutIcon />
          </div>
        )}
        {!sidebarOpen && <Tooltip title="Profile" />}
      </div>
    );
  }
  return (
    <Link
      className={`flex flex-row relative h-12 bg-blue-400 dark:bg-gray-700 dark:text-white transition-width duration-150 ease-in-out rounded-xl group p-3 ${
        sidebarOpen ? "w-full" : "w-12"
      }`}
      to="/home/profile"
    >
      <ProfileIcon />
      <span
        className={`text-white text-lg font-semibold transition-navigation-items transform-gpu duration-150 ease-in-out ml-5 leading-snug ${
          sidebarOpen
            ? "opacity-100 scale-100 w-auto ml-5"
            : "opacity-0 scale-0 w-0 ml-0"
        }`}
      >
        Profile
      </span>
      {!sidebarOpen && <Tooltip title="Profile" />}
    </Link>
  );
};
