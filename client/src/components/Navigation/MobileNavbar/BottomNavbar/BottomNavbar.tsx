import { NavigationItems } from "../../NavigationItems";

export function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 bg-gray-200 dark:bg-gray-700 navbar-shadow pb-navbar p-2 border-t border-gray-300 dark:border-gray-600 ">
      <ul className="flex flex-row h-full justify-center space-x-3 items-center">
        <NavigationItems />
      </ul>
    </nav>
  );
}
