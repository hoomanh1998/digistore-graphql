import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Pagination, Autoplay, Navigation } from "swiper";
import { CarouselSliderItem } from "../CarouselSliderItem";
import { CarouselSliderPropTypes } from "../../../ts/types";

export function MobileLayout({ slides }: CarouselSliderPropTypes) {
  return (
    <div className="flex w-full items-center justify-center mb-5">
      <Swiper
        onInit={(swiper) => {
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        loop
        speed={450}
        spaceBetween={16}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
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
        modules={[Pagination, Autoplay, Navigation]}
      >
        {slides.map(({ id, name, image }) => (
          <SwiperSlide key={id}>
            <CarouselSliderItem id={id} name={name} image={image} />
          </SwiperSlide>
        ))}
        <div className="dots flex w-full justify-center items-center mt-4 mb-1 space-x-2" />
      </Swiper>
    </div>
  );
}
