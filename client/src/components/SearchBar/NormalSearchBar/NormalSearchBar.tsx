import { SearchInputPropTypes } from "../../../ts/types";
import { CloseIcon, SearchIcon } from "../../../assets/svgs";

export const NormalSearchBar = ({
  inputChangeHandler,
  onFocus,
  onBlur,
  value,
  isFocused,
  onClearInput,
}: SearchInputPropTypes) => {
  return (
    <div className="w-full relative md:my-5 md:max-w-xl">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 focus:outline-none">
        <SearchIcon isFocused={isFocused} forInput />
      </div>
      <input
        className="input text-lg text-gray-800 dark:bg-gray-600 dark:placeholder-white dark:placeholder-opacity-70 dark:text-white border-gray-300 dark:border-transparent focus:ring-gray-300 dark:focus:ring-gray-500 rounded-xl pl-11"
        onChange={(event) => inputChangeHandler(event)}
        onFocus={onFocus}
        onBlur={onBlur}
        type="text"
        placeholder="Search products..."
        value={value}
      />
      <div
        className={`absolute right-0 mr-3 p-1 top-1/2 transform -translate-y-1/2 rounded-full bg-gray-200 dark:bg-gray-500 active:bg-gray-100 cursor-pointer ${
          value.length > 0 ? "opacity-100 z-0" : "opacity-0 -z-10"
        }`}
        onClick={() => value.length > 0 && onClearInput && onClearInput()}
      >
        <CloseIcon smallIcon />
      </div>
    </div>
  );
};
