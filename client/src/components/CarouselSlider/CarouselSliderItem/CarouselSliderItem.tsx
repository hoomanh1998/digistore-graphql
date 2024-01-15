import { Link } from "react-router-dom";

interface PropTypes {
  id: string;
  name: string;
  image: string;
}

export const CarouselSliderItem = ({ id, name, image: Image }: PropTypes) => {
  return (
    <Link
      to={{
        pathname: "/home/products",
        search: `?filterId=${id}`,
      }}
      className="relative flex flex-row h-full ring-1 ring-gray-100 dark:ring-gray-800 md:shadow-none rounded-xl"
    >
      <div className="absolute md:relative left-2 md:left-0 bottom-2 md:bottom-0 md:p-10 md:h-full flex justify-start bg-gray-700 text-lg md:text-2xl text-white font-semibold rounded-xl md:rounded-none md:border-r-4 md:border-blue-500 px-3 py-1">
        {name}
      </div>
      <img
        src={Image}
        alt="sliderImage"
        className="object-cover w-full h-48 xs:h-80 sm:h-80 md:h-96 md:w-full"
      />
    </Link>
  );
};
