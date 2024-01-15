import { useEffect, useMemo, useRef, useState } from "react";
import { usePagination } from "../../../hooks";
import { PaginationButton } from "./PaginationButton";
import { Direction, PaginationPropTypes } from "../../../ts/types";

const DOTS = "...";

export function Pagination({
  totalCount,
  pageNumber,
  paginationHandler,
  parentWidth,
}: PaginationPropTypes) {
  const ulRef = useRef<HTMLDivElement>(null);
  const ulWidthStack: number[] = useMemo(() => [], []);
  const [pillNumber, setPillNumber] = useState(totalCount!);
  const paginationRange = usePagination(pageNumber!, totalCount!, pillNumber);
  let lastPage = paginationRange[paginationRange.length - 1];

  const onNextPage = () => {
    paginationHandler((prevState) =>
      prevState + 1 > totalCount! ? totalCount! : prevState + 1
    );
  };

  const onPrevPage = () => {
    paginationHandler((prevState) => (prevState - 1 > 0 ? prevState - 1 : 1));
  };

  useEffect(() => {
    if (ulRef.current?.scrollWidth! > parentWidth!) {
      setPillNumber((prevState) => prevState - 1);
      ulWidthStack.push(ulRef.current?.scrollWidth!);
    }
  }, [parentWidth, ulWidthStack, pillNumber, pageNumber]);

  useEffect(() => {
    if (ulWidthStack[ulWidthStack.length - 1] < parentWidth!) {
      setPillNumber((prevState) => {
        if (ulWidthStack.length > 0) {
          return prevState + 1;
        }
        return prevState;
      });
      ulWidthStack.pop()!;
    }
  }, [parentWidth, ulWidthStack]);

  return (
    <div className="flex flex-row justify-center items-center mt-8 m-3">
      <div ref={ulRef} className="flex flex-row justify-center items-center">
        <ul className="flex flex-row items-center rounded-lg space-x-3 py-2 px-1">
          <PaginationButton
            disabled={pageNumber === 1}
            direction={Direction.Left}
            pageNumberHandler={onPrevPage}
          />
          {paginationRange.map((page: number | string, index) => {
            if (page === DOTS) {
              return (
                <li key={index} className="text-black dark:text-white">
                  &#8230;
                </li>
              );
            }
            return (
              <li
                key={index}
                onClick={() => paginationHandler(parseInt(page.toString()))}
                className={`w-10 h-10 flex items-center justify-center rounded-full transform transition-transform duration-75 ease-in-out cursor-default md:cursor-pointer ${
                  page === pageNumber
                    ? "scale-110 bg-blue-400 text-white font-bold"
                    : "scale-100 bg-gray-100 dark:bg-gray-500 text-black dark:text-white"
                }`}
              >
                {page}
              </li>
            );
          })}
          <PaginationButton
            disabled={pageNumber === lastPage}
            direction={Direction.Right}
            pageNumberHandler={onNextPage}
          />
        </ul>
      </div>
    </div>
  );
}
