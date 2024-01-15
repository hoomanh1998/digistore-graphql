import { useMemo } from "react";
import { useMediaQuery } from "../useMediaQuery";

const DOTS = "...";

export const usePagination = (
  currentPage: number,
  totalCount: number,
  pillNumber: number,
  siblingCount = 1
) => {
  const { isMobile } = useMediaQuery();

  const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange: (string | number)[] = useMemo(() => {
    // console.log("[paginationRange renderd...]");
    // fix the pagination bug for totalCount that under number 5 and fix unnecessary re-rendering.

    const totalPageCount = pillNumber;
    let maxTotalCount = totalCount <= 7 ? totalCount : 7;
    let betweenNumber = 1;

    if (isMobile) {
      maxTotalCount = 7;
      if (pillNumber < 4) {
        betweenNumber = -1;
      } else {
        betweenNumber = 0;
      }
    }

    let leftAndRightItemCount =
      pillNumber < maxTotalCount
        ? totalCount - (totalCount - pillNumber)
        : maxTotalCount - 1;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (isMobile) {
      if (pillNumber === totalCount && totalCount <= maxTotalCount) {
        return range(1, totalPageCount);
      }
    } else if (totalCount <= maxTotalCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalCount - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = leftAndRightItemCount * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = leftAndRightItemCount * siblingCount;
      let rightRange = range(totalCount - rightItemCount + 1, totalCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
        Case 4: Both left and right dots to be shown
     */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(
        leftSiblingIndex - betweenNumber,
        rightSiblingIndex + betweenNumber
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return range(1, totalPageCount);
  }, [totalCount, pillNumber, siblingCount, currentPage, isMobile]);

  return paginationRange;
};
