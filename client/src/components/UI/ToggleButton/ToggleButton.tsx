import { useEffect, useState } from "react";
import { ToggleButtonPropTypes } from "../../../ts/types";

export function ToggleButton({ onToggleButton }: ToggleButtonPropTypes) {
  const [enabled, setEnabled] = useState<boolean>();

  const handleToggleSwitch = () => {
    setEnabled((prevState) => !prevState);
  };

  useEffect(() => {
    if (localStorage.theme) setEnabled(JSON.parse(localStorage.theme).enabled);
  }, [enabled]);

  return (
    <div
      onClick={() => {
        handleToggleSwitch();
        onToggleButton();
      }}
      className={`${
        JSON.parse(localStorage.theme).enabled ? "bg-blue-500" : "bg-gray-400"
      } w-11 md:w-12 relative inline-flex items-center flex-shrink-0 box-border border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`}
    >
      <span
        className={`${
          JSON.parse(localStorage.theme).enabled
            ? "translate-x-4.5 md:translate-x-5.5"
            : "translate-x-0"
        } m-px pointer-events-none h-5 w-5 rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out`}
      ></span>
    </div>
  );
}
