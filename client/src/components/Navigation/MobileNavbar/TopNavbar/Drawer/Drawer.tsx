import { DrawerPropTypes } from "../../../../../ts/types";

export const Drawer = ({
  children,
  showDrawer,
  backdropClickHandler,
}: DrawerPropTypes) => {
  return (
    <>
      <div
        className={`flex flex-col justify-between items-center fixed left-0 top-0 h-full w-9/12 bg-white dark:bg-gray-700 transform-gpu transition-transform duration-300 ease-out shadow-xl p-3 z-40 overflow-y-auto ${
          showDrawer ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-60 dark:bg-opacity-70 md:hidden transition-opacity duration-100 ease-in-out ${
          showDrawer ? "opacity-100 z-30" : "opacity-0 -z-10"
        }`}
        onClick={() => backdropClickHandler()}
      />
    </>
  );
};
