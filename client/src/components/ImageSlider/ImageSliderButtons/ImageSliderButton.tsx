import { ArrowLeftIcon, ArrowRightIcon } from "../../../assets/svgs";
import { Direction, ImageSliderButtonPropTypes } from "../../../ts/types";

export const ImageSliderButton = ({
  direction,
  showArrows,
  sliderHandler,
}: ImageSliderButtonPropTypes) => {
  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 select-none z-10 btn rounded-full p-2 transition-all duration-300 ease-in-out bg-blue-400 md:hover:scale-110 outline-none ${
        direction === Direction.Left ? "left-2" : "right-2"
      } ${showArrows ? "opacity-100 z-10" : "opacity-0 -z-10"}`}
      onClick={sliderHandler}
    >
      {direction === Direction.Left ? (
        <ArrowLeftIcon strokeColor="stroke-white" />
      ) : (
        <ArrowRightIcon strokeColor="stroke-white" />
      )}
    </div>
  );
};
