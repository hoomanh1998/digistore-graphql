import { ArrowLeftIcon, ArrowRightIcon } from "../../../assets/svgs";
import { Direction, SliderButtonPropTypes } from "../../../ts/types";

export const SliderButton = ({ direction, onClick }: SliderButtonPropTypes) => {
  return (
    <button
      type="button"
      aria-label={direction === Direction.Left ? "left" : "right"}
      className={`absolute slider-icon-top focus:outline-none outline-none bg-blue-500 focus:ring-0 rounded-full shadow-md p-3 z-1 ${
        direction === Direction.Left ? "left-2" : "right-2"
      }`}
      onClick={onClick}
    >
      {direction === Direction.Left ? (
        <ArrowLeftIcon strokeColor="stroke-white" />
      ) : (
        <ArrowRightIcon strokeColor="stroke-white" />
      )}
    </button>
  );
};
