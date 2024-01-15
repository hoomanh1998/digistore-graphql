import { Link } from "react-router-dom";
import { ProfileCardPropTypes } from "../../../ts/types";
import { LogoutIcon } from "../../../assets/svgs";
import UserProfileImage from "../../../assets/images/user-profile.jpg";

export const MobileProfileCard = ({
  isAuthenticated,
  showProfileCard,
  loading,
  data,
  openLogoutModal,
  closeProfileCard,
}: ProfileCardPropTypes) => {
  return (
    <div
      className={`absolute -right-1 top-14 flex flex-row min-w-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-gray-700 dark:to-gray-800 dark:text-white ring-1 ring-blue-400 dark:ring-gray-700 rounded-xl shadow-xl mb-3 p-3 pr-11 transition-opacity duration-300 ease-in-out ${
        showProfileCard ? "opacity-100 z-40" : "opacity-0 -z-10"
      }`}
    >
      <Link className="flex flex-row overflow-x-hidden" to="/home/profile">
        <div className="flex-shrink-0 rounded-full w-10 h-10 ring-1 ring-gray-300 dark:ring-gray-700 m-0.5">
          <img
            src={UserProfileImage}
            alt="user-profile"
            className="object-cover w-10 h-10 rounded-full"
          />
        </div>
        {loading ? (
          <div className="animate-pulse-fast flex flex-col items-baseline w-full space-y-2 px-3">
            <div className="h-6 bg-gray-300 dark:bg-gray-500 rounded w-full" />
            <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-full" />
          </div>
        ) : (
          <div className="w-36 xs:w-full font-semibold text-white dark:text-white overflow-x-hidden leading-snug pl-3">
            {isAuthenticated() &&
              data &&
              data.currentUser.firstName + " " + data.currentUser.lastName}
            <div className="text-sm text-gray-300 dark:text-gray-400 truncate">
              {isAuthenticated() && data && data.currentUser.email}
            </div>
          </div>
        )}
      </Link>
      <div
        onClick={(event) => {
          event.stopPropagation();
          openLogoutModal();
          closeProfileCard && closeProfileCard();
        }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
      >
        <LogoutIcon strokeColor="white" />
      </div>
    </div>
  );
};
