import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { ImageSliderButton } from "./ImageSliderButtons";
import { ImageSliderDots } from "./ImageSliderDots";
import { ImageSliderLoader } from "../SkeletonLoaders";
import { ImageSliderPropTypes, ImageSlide, Direction } from "../../ts/types";

export function ImageSlider({ slides }: ImageSliderPropTypes) {
  const [showArrows, setShowArrows] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [slideNumbers, setSlideNumbers] = useState<number[]>([]);

  const imageSwipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      nextSlide();
      setShowArrows(false);
    },
    onSwipedRight: () => {
      prevSlide();
      setShowArrows(false);
    },
  });

  const nextSlide = () => {
    if (!slideNumbers.includes(currentSlide)) {
      setSlideNumbers((prevState) => [...prevState, currentSlide]);
      setImageLoading(true);
    }
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    if (!slideNumbers.includes(currentSlide)) {
      setSlideNumbers((prevState) => [...prevState, currentSlide]);
      setImageLoading(true);
    }
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  useEffect(() => {
    let arrow: NodeJS.Timeout;
    arrow = setTimeout(() => {
      setShowArrows(true);
    }, 3000);
    window.addEventListener("scroll", () => setShowArrows(true));
    return () => {
      window.removeEventListener("scroll", () => setShowArrows(false));
      clearTimeout(arrow);
      setCurrentSlide(0);
    };
  }, []);

  return (
    <div className="min-w-full relative flex flex-col items-center">
      <div className="flex flex-row justify-center w-full relative md:border-2 border-gray-200 dark:border-gray-600 rounded-xl mb-3">
        <ImageSliderButton
          direction={Direction.Left}
          showArrows={showArrows}
          sliderHandler={prevSlide}
        />
        {slides.map(({ image }: ImageSlide, index) => {
          return (
            <div
              onDragStart={(event: React.DragEvent<HTMLDivElement>) =>
                event.preventDefault()
              }
              onClick={() => setShowArrows(true)}
              className={`h-52 xs:h-80 md:h-96 transform transition-all duration-300 ease-in-out overflow-hidden rounded-xl ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-98"
              }`}
              key={index}
            >
              {index === currentSlide && (
                <>
                  {imageLoading && <ImageSliderLoader />}
                  <img
                    {...imageSwipeHandlers}
                    src={image}
                    alt="product"
                    className={`object-cover w-full sm:w-150 h-full ${
                      imageLoading ? "hidden" : "block"
                    }`}
                    onLoad={() => setImageLoading(false)}
                  />
                </>
              )}
            </div>
          );
        })}
        <ImageSliderButton
          direction={Direction.Right}
          showArrows={showArrows}
          sliderHandler={nextSlide}
        />
      </div>
      <ImageSliderDots currentSlide={currentSlide} slides={slides} />
    </div>
  );
}
