import { useMediaQuery } from "../../hooks";
import { carouselSliderImgaes } from "./carouselSliderImages";
import { MobileLayout, DesktopLayout } from "./Views";
import "swiper/swiper.min.css";
import "./CarouselSlider.css";

export function CarouselSlider() {
  const { isMobile } = useMediaQuery();
  const carouselSlider = isMobile ? (
    <MobileLayout slides={carouselSliderImgaes} />
  ) : (
    <DesktopLayout slides={carouselSliderImgaes} />
  );

  return carouselSlider;
}
