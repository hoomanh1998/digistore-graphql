import { useMediaQuery } from "../../../hooks";
import { SliderItemLoader } from "./SliderItemLoader";

interface PropTypes {
  mobileFullWidth?: boolean;
}

export function SliderLoader({ mobileFullWidth }: PropTypes) {
  const { isMobile } = useMediaQuery();
  const sliderItemsNumber = isMobile ? 4 : 8;

  return (
    <div
      className={`max-w-7xl flex flex-col md:w-full bg-gray-300 dark:bg-gray-900 md:border dark:border-gray-800 md:rounded-xl my-3 md:mx-auto last:mb-0 ${
        mobileFullWidth ? "-mx-3" : "mx-0"
      }`}
    >
      <div className="animate-pulse-fast rounded-md bg-gray-400 dark:bg-gray-700 h-7 w-56 md:w-96 m-4 mb-0" />
      <div className="flex flex-row overflow-hidden space-x-3 md:space-x-4 p-3">
        {[...Array(sliderItemsNumber)].map((_, index) => (
          <SliderItemLoader key={index} />
        ))}
      </div>
    </div>
  );
}
