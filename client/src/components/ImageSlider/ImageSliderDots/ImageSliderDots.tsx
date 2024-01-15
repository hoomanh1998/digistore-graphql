import { ImageSliderDot } from "./ImageSliderDot";
import { ImageSliderDotsPropTypes } from "../../../ts/types";

export const ImageSliderDots = ({
  slides,
  currentSlide,
}: ImageSliderDotsPropTypes) => {
  return (
    <div className="backdrop-filter backdrop-blur-sm relative md:absolute md:bottom-6 md:left-2/5 flex flex-row rounded-lg p-2">
      {slides.map((_, index) => (
        <ImageSliderDot
          key={index}
          active={index === currentSlide ? true : false}
        />
      ))}
    </div>
  );
};
