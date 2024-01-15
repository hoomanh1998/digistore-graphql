import { Direction, PaginationButtonPropTypes } from "../../../../ts/types";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../assets/svgs";

export const PaginationButton = ({
  disabled,
  direction,
  pageNumberHandler,
}: PaginationButtonPropTypes) => {
  return (
    <li
      className={`btn select-none rounded-full z-10 ${
        direction === Direction.Left ? "left-2" : "right-2"
      }`}
      onClick={() => !disabled && pageNumberHandler()}
    >
      {direction === Direction.Left ? (
        <ArrowLeftIcon disabled={disabled} />
      ) : (
        <ArrowRightIcon disabled={disabled} />
      )}
    </li>
  );
};
