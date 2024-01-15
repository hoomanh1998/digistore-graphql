import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper";
import { CarouselSliderItem } from "../CarouselSliderItem";
import { CarouselSliderButton } from "../CarouselSliderButton";
import { CarouselSliderPropTypes, Direction } from "../../../ts/types";
import "swiper/modules/effect-fade/effect-fade.min.css";

export function DesktopLayout({ slides }: CarouselSliderPropTypes) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="flex h-full w-full items-center justify-center mb-10">
      <Swiper
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        effect={"fade"}
        slidesPerView={1}
        loop
        speed={450}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current ? prevRef.current : undefined,
          nextEl: nextRef.current ? nextRef.current : undefined,
        }}
        pagination={{
          el: ".dots",
          clickable: true,
          bulletClass: "bullet",
          bulletActiveClass: "bullet-active",
          renderBullet: (_, className) => {
            return '<span class="' + className + '"></span>';
          },
        }}
        modules={[Pagination, Autoplay, Navigation, EffectFade]}
      >
        {slides.map(({ id, name, image }) => (
          <SwiperSlide key={id}>
            <CarouselSliderItem id={id} name={name} image={image} />
          </SwiperSlide>
        ))}
        <CarouselSliderButton reference={prevRef} direction={Direction.Left} />
        <CarouselSliderButton reference={nextRef} direction={Direction.Right} />
        <div className="dots absolute bottom-10 flex w-full justify-center items-center space-x-2 z-10" />
      </Swiper>
    </div>
  );
}
