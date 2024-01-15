import { useState, useRef, MouseEvent } from "react";
import { useMediaQuery } from "../../hooks";
import { SliderItemsList } from "./SliderItemsList";
import { SliderButton } from "./SliderButton";
import { Direction, SliderPropTypes } from "../../ts/types";

export function Slider({ title, items, routeState }: SliderPropTypes) {
  const { isMobile } = useMediaQuery();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const mouseCoordinates = useRef({
    startX: 0,
    scrollLeft: 0,
  });

  const dragStartHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsMouseDown(true);
    if (!sliderWrapperRef.current) return;
    const sliderWrapper = sliderWrapperRef.current;
    const startX = e.pageX - sliderWrapper.offsetLeft;
    const scrollLeft = sliderWrapper.scrollLeft;
    sliderWrapperRef.current.style.cursor = "grabbing";
    mouseCoordinates.current = { startX, scrollLeft };
  };

  const dragEndHandler = () => {
    setIsMouseDown(false);
    if (!sliderWrapperRef.current) return;
    sliderWrapperRef.current.style.cursor = "default";
  };

  const dragHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !sliderWrapperRef.current) return;
    e.preventDefault();
    const slider = sliderWrapperRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walkX = (x - mouseCoordinates.current.startX) * 1.5;
    sliderWrapperRef.current.scrollLeft =
      mouseCoordinates.current.scrollLeft - walkX;
  };

  const clickArrowMoveHandler = (type: "next" | "prev") => {
    if (sliderWrapperRef.current && sliderRef.current) {
      const sliderItemWidth =
        sliderRef.current.children[0].getBoundingClientRect().width + 160;
      type === "next"
        ? (sliderWrapperRef.current.scrollLeft -= sliderItemWidth)
        : (sliderWrapperRef.current.scrollLeft += sliderItemWidth);
    }
  };

  return (
    <div className="flex flex-col w-full md:max-w-7xl bg-gray-300 dark:bg-gray-900 md:border md:dark:border-gray-800 shadow-inner md:rounded-xl my-5 md:my-10 md:mx-auto last:mb-0 -mx-5 relative">
      <h4 className="text-xl font-bold dark:text-white mt-5 mx-8">{title}</h4>
      <div
        ref={sliderWrapperRef}
        className="flex flex-row overflow-x-scroll hide-scrollbars"
        style={{ scrollBehavior: "smooth" }}
      >
        <div
          ref={sliderRef}
          className="flex flex-row p-5 md:p-8"
          onMouseDown={dragStartHandler}
          onMouseUp={dragEndHandler}
          onMouseMove={dragHandler}
        >
          <SliderItemsList
            items={items}
            sliderRef={sliderRef}
            routeState={routeState}
          />
          {!isMobile && (
            <>
              <SliderButton
                direction={Direction.Left}
                onClick={() => clickArrowMoveHandler("next")}
              />
              <SliderButton
                direction={Direction.Right}
                onClick={() => clickArrowMoveHandler("prev")}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
