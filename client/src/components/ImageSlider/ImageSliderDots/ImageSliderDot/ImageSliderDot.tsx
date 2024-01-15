import { ImageSliderDotPropTypes } from "../../../../ts/types";

export const ImageSliderDot = ({ active }: ImageSliderDotPropTypes) => {
  return (
    <div
      className={`${
        active ? "transform scale-150 bg-blue-400" : "bg-gray-400"
      } rounded-full w-2 h-2 mx-1 transition-transform duration-300 ease-in-out`}
    />
  );
};
