import { CarouselSliderButtonPropTypes, Direction } from "../../../ts/types";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../assets/svgs";

export const CarouselSliderButton = ({
  reference,
  direction,
}: CarouselSliderButtonPropTypes) => {
  return (
    <button
      ref={reference}
      aria-label={direction === Direction.Left ? "left" : "right"}
      className={`absolute slider-icon-top focus:outline-none outline-none focus:ring-0 rounded-full shadow-md p-3 z-10 bg-blue-500 cursor-pointer transition-all transform hover:scale-110 hover:shadow-lg  duration-200 ease-in-out ${
        direction === Direction.Left ? "left-8" : "right-8"
      }`}
    >
      {direction === Direction.Left ? (
        <ArrowLeftIcon strokeColor="stroke-white" />
      ) : (
        <ArrowRightIcon strokeColor="stroke-white" />
      )}
    </button>
  );
};
