import { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery, useOutsideAlerter } from "../../hooks";
import { Link, useLocation } from "react-router-dom";
import { pathActions } from "../../store/path";
import { ProfileCard } from "../../components/ProfileCard";
import { AuthContext } from "../../hoc/store";
import { ProfileIcon } from "../../assets/svgs";
import UserProfileImage from "../../assets/images/user-profile.jpg";

export const PageHeader = () => {
  const dispatch = useDispatch();

  const { isMobile } = useMediaQuery();

  const divRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();

  const { isAuthenticated } = useContext(AuthContext);

  const [showProfileCard, setShowProfileCard] = useState(false);

  useOutsideAlerter(divRef, setShowProfileCard);

  const loginPathHandler = () => {
    dispatch(
      pathActions.setLoginFullPath({
        prev: pathname,
        next: "/home/profile",
      })
    );
  };

  const showProfileCardHandler = () => {
    setShowProfileCard((prevState) => !prevState);
  };

  const closeProfileCardHandler = () => {
    setShowProfileCard(false);
  };

  const profileIcon = isAuthenticated() ? (
    <div
      ref={divRef}
      onClick={() => showProfileCardHandler()}
      className="relative flex justify-center items-center flex-shrink-0 rounded-full w-11 h-11 ring-1 ring-gray-300 dark:ring-gray-500 shadow-md cursor-pointer"
    >
      <div className="relative flex">
        <img
          src={UserProfileImage}
          alt="user-profile"
          className="object-contain w-11 h-11 rounded-full"
        />
        {showProfileCard && (
          <div className="absolute w-full h-full top-0 left-0 rounded-full bg-black bg-opacity-30" />
        )}
      </div>
      <ProfileCard
        showProfileCard={showProfileCard}
        closeProfileCard={closeProfileCardHandler}
      />
    </div>
  ) : (
    <Link
      to="/home/profile"
      onClick={loginPathHandler}
      className="flex justify-center items-center rounded-full w-11 h-11 shadow-md ring-1 ring-gray-200 dark:ring-transparent bg-gray-100 dark:bg-gray-600 p-2"
    >
      <ProfileIcon />
    </Link>
  );

  return (
    <div className="flex flex-row justify-between items-center w-full mb-3 md:mb-10 p-3 md:p-5">
      <h3 className="font-bold text-3xl dark:text-white ml-1">DigiStore</h3>
      {isMobile && profileIcon}
    </div>
  );
};
