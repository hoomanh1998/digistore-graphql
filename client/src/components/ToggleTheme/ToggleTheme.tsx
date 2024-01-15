import { useDarkMode } from "../../hooks";
import { ToggleButton } from "../UI";
import { Themes } from "../../ts/types";
import { DarkModeIcon, LightModeIcon } from "../../assets/svgs";

export const ToggleTheme = () => {
  const { colorTheme, isEnabled, setTheme } = useDarkMode();

  return (
    <li className="bg-white dark:bg-gray-700 rounded-xl">
      <div
        className={`flex flex-row justify-between border border-gray-300 dark:border-transparent rounded-xl w-full px-3 py-2.5 ${
          colorTheme === Themes.Light ? "text-white" : "text-gray-800"
        }`}
      >
        <div className="flex flex-row items-center">
          {colorTheme === Themes.Light ? (
            <DarkModeIcon smallIcon={true} />
          ) : (
            <LightModeIcon smallIcon={true} />
          )}
          <p className="font-semibold tracking-wide leading-tight ml-3">
            {colorTheme === Themes.Light ? "Dark Mode" : "Light Mode"}
          </p>
        </div>
        <ToggleButton
          onToggleButton={() =>
            setTheme({ type: colorTheme, enabled: isEnabled })
          }
        />
      </div>
    </li>
  );
};
