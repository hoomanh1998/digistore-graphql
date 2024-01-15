import { useState } from "react";
import { useLockBodyScroll, useHandleScroll } from "../../../../hooks";
import { Link } from "react-router-dom";
import { Drawer } from "./Drawer";
import { NavigationItems } from "../../NavigationItems";
import { ToggleTheme } from "../../../ToggleTheme";
import { ProfileCard } from "../../../ProfileCard";
import { HamburgerMenuIcon, SearchIcon } from "../../../../assets/svgs";

export function TopNavBar() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { isOnTop } = useHandleScroll();

  const showDrawerHandler = () => {
    setShowDrawer((prevState) => !prevState);
  };

  const backdropClickHandler = () => {
    setShowDrawer(false);
  };

  useLockBodyScroll(showDrawer);

  // useEffect(() => {
  //   isLoggedOut && setShowDrawer(false);
  // }, [isLoggedOut]);
  return (
    <>
      <nav
        className={`sticky top-0 flex justify-between
  items-center h-16 bg-gray-200 dark:bg-gray-800 dark:text-white p-4 z-30 ${
    isOnTop ? "shadow-none" : "shadow-lg"
  }`}
        role="navigation"
      >
        <div
          onClick={showDrawerHandler}
          className="rounded-full focus:bg-gray-400 cursor-pointer mx-1"
        >
          <HamburgerMenuIcon />
        </div>
        <Link
          to="/home"
          className="px-2 font-semibold text-lg uppercase dark:text-white"
        >
          HOMI
        </Link>
      </nav>
      <Drawer
        showDrawer={showDrawer}
        backdropClickHandler={backdropClickHandler}
      >
        <ul className="flex flex-col w-full">
          <ProfileCard showProfileCard={true} />
          <li className="bg-gray-100 dark:bg-gray-800 dark:text-white ring-1 ring-gray-300 dark:ring-opacity-0 rounded-xl mb-3 pointer-events-auto">
            <Link
              className={`flex flex-row items-center relative p-4 rounded-xl`}
              to="/home/products"
            >
              <SearchIcon strokeColor="currentColor" />
              <span
                className={`inline-block font-semibold uppercase tracking-wide dark:text-white ml-5 leading-snug`}
              >
                Search
              </span>
            </Link>
          </li>
          <NavigationItems />
          <ToggleTheme />
        </ul>
      </Drawer>
    </>
  );
}
