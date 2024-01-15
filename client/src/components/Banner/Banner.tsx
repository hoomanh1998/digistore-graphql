import { useCallback, useEffect, useState } from "react";

const randomBackgroundColors = [
  { from: "from-purple-500", to: "to-green-500" },
  { from: "from-red-500", to: "to-blue-500" },
  { from: "from-green-500", to: "to-purple-500" },
  { from: "from-yellow-500", to: "to-red-500" },
  { from: "from-purple-500", to: "to-yellow-500" },
];

export const Banner = () => {
  const [backgroundColor, setBackgroundColor] = useState("");

  const selectRandomColor = useCallback(() => {
    const random = Math.floor(Math.random() * randomBackgroundColors.length);
    const { from, to } = randomBackgroundColors[random];
    const color = from + " " + to;
    setBackgroundColor(color);
  }, []);

  useEffect(() => {
    selectRandomColor();
  }, [selectRandomColor]);

  return (
    <div
      className={`flex flex-col justify-center md:h-72 items-center md:container mx-auto rounded-lg p-6 md:p-14 select-none bg-gradient-to-r ${backgroundColor}`}
    >
      <p className="text-sm md:text-base font-semibold text-white text-center line-clamp-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,
        sed? Necessitatibus nemo, eaque, tempore perspiciatis dolorum impedit
        dolorem quod officia ut aspernatur maxime molestiae ipsam corporis error
        asperiores. Dignissimos alias provident veniam, officiis dolorum
        nesciunt excepturi, ipsam itaque possimus minima molestiae voluptatem
        odit quis iure fuga accusantium assumenda magnam eveniet voluptatum
        tempora harum repellendus facilis perspiciatis vitae! Totam, optio amet.
        Quaerat ullam velit reiciendis omnis laborum odio exercitationem.
        Aperiam id nobis laborum excepturi at blanditiis quae magni, veniam
        dicta nesciunt minima possimus reiciendis nemo temporibus aut
        laboriosam, debitis distinctio accusamus ratione modi? Exercitationem,
        cupiditate? Assumenda deleniti debitis magni quibusdam corrupti?
      </p>
    </div>
  );
};
