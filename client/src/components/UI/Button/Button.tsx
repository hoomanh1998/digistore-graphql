import { ButtonPropTypes, ButtonTypes } from "../../../ts/types";

export const Button = ({
  onClick,
  children,
  color,
  disabled,
  narrow,
  type = ButtonTypes.Button,
  positionFixed = false,
  hasBorder = true,
  extraClasses,
}: ButtonPropTypes) => {
  let buttonClasses = "";
  if (positionFixed) {
    buttonClasses = color
      ? `btn flex flex-row justify-center font-semibold disabled:bg-gray-300 dark:disabled:bg-gray-600 md:disabled:opacity-50 text-white w-full p-3 select-none ${color}`
      : `btn ring-1 ring-gray-500 dark:text-white dark:hover:bg-gray-600 hover:bg-gray-400 transition-background-color duration-150 ease-in-out p-3 select-none`;
  } else {
    buttonClasses = color
      ? `btn flex flex-row justify-center items-center font-semibold disabled:bg-gray-300 md:disabled:bg-gray-400 dark:disabled:bg-gray-600 dark:disabled:text-opacity-30 disabled:cursor-default md:disabled:opacity-50 text-base dark:text-white px-4 py-3 select-none ${color} ${
          narrow ? "md:py-2" : "md:py-3"
        } ${extraClasses}`
      : `btn flex flex-row justify-center items-center dark:text-white dark:hover:bg-gray-600 md:hover:bg-gray-300 md:transition-background-color md:duration-150 md:ease-in-out px-4 py-3 select-none ${
          narrow ? "md:py-2" : "md:py-3"
        } ${hasBorder ? "ring-1 ring-gray-500" : ""} ${extraClasses}`;
  }

  const button = positionFixed ? (
    <div className="fixed w-full bottom-0 left-0 ring-0 bg-gradient-to-t from-white dark:from-gray-800 z-40">
      <div className="block p-3 pb-safe-inset-bottom pt-10">
        <button
          onClick={(event) => {
            event.currentTarget.blur();
            onClick && onClick();
          }}
          disabled={disabled}
          className={buttonClasses}
        >
          {children}
        </button>
      </div>
    </div>
  ) : (
    <button
      onClick={(event) => {
        type === ButtonTypes.Button && event.preventDefault();
        event.currentTarget.blur();
        onClick && onClick();
      }}
      className={buttonClasses}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );

  return button;
};
