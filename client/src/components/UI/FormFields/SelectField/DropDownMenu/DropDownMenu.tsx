import { useEffect, useRef } from "react";
import { useOutsideAlerter } from "../../../../../hooks";
import { ArrowDownIcon } from "../../../../../assets/svgs";
import {
  Direction,
  DropDownMenuPropTypes,
  SelectItem,
} from "../../../../../ts/types";
import { capitalizedFirstLetter } from "../../../../../common";

export function DropDownMenu({
  id,
  items,
  disabled,
  defaultValue,
  listPosition,
  selectController,
  setSelectController,
  setValue,
  setTouched,
  updateItems,
  inputChangeHandler,
  editDataHandler,
}: DropDownMenuPropTypes) {
  const { isListOpen, itemSelected, inputValue, headerTitle, dropDownError } =
    selectController;
  const DropdownMenu = useRef<HTMLDivElement>(null);

  const closeList = () => {
    setSelectController((prevState) => ({
      ...prevState,
      isListOpen: false,
    }));
  };

  const toggleList = () => {
    if (isListOpen && !itemSelected) {
      setTouched(true);
    }
    setSelectController((prevState) => ({
      ...prevState,
      isListOpen: !prevState.isListOpen,
    }));
  };

  // This function will select the clicked li element and get the item info and then destruct the props from that specific item and update the DropDownMenu list with updateItems function.
  const selectItem = (item: any) => {
    const { label, id, key } = item;
    setSelectController((prevState) => ({
      ...prevState,
      inputValue: "",
      isListOpen: false,
      itemSelected: true,
      headerTitle: label,
    }));
    updateItems(id, key);
  };

  const selectChangeHandler = (item: SelectItem) => {
    editDataHandler && editDataHandler({ locationId: id!, value: item.value });
    selectItem(item);
    setValue(item.value);
    // setState((prevState) => ({ ...prevState, inputValue: "" }));
  };

  useOutsideAlerter(
    DropdownMenu,
    closeList,
    setTouched,
    itemSelected,
    isListOpen
  );

  useEffect(() => {
    if (disabled && itemSelected) {
      setSelectController((prevState) => ({
        ...prevState,
        inputValue: "",
        isListOpen: false,
        itemSelected: false,
        headerTitle: capitalizedFirstLetter(defaultValue!),
      }));
    }
  }, [disabled, itemSelected, setSelectController, defaultValue]);

  return (
    <div ref={DropdownMenu} className="flex flex-col w-full select-none">
      <div
        className={`btn flex w-full justify-between transition-background-color duration-150 ease-in-out px-4 py-3 ${
          dropDownError && !itemSelected
            ? "select-error"
            : "border border-gray-300 dark:border-transparent focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-200"
        } ${
          disabled
            ? "bg-gray-300 dark:bg-gray-600 pointer-events-none"
            : "bg-white pointer-events-auto"
        }`}
        onClick={() => toggleList()}
        onKeyPress={(e) => e.key === "Enter" && toggleList()}
        tabIndex={0}
      >
        <span
          className={`
            ${disabled ? "text-gray-500 dark:text-gray-200" : "text-black"}
          `}
        >
          {headerTitle}
        </span>
        <ArrowDownIcon strokeColor={disabled ? "gray" : "black"} />
      </div>
      <div className="relative">
        {isListOpen && (
          <ul
            className={`overflow-y-auto absolute left-0 w-full h-52 flex flex-col items-center bg-white  border-2 border-gray-300 rounded-lg shadow-md mt-2 z-10 ${
              listPosition === Direction.Up ? "bottom-14" : "top-0"
            }`}
          >
            <li className="p-3 w-full cursor-pointer">
              <input
                onKeyPress={(event) => {
                  event.key === "Enter" && event.preventDefault();
                }}
                onChange={(event) => {
                  inputChangeHandler && inputChangeHandler(event);
                }}
                className="w-full input ring-1 ring-gray-300"
                placeholder="Search location"
                type="text"
                value={inputValue}
              />
            </li>
            {items.length > 0 ? (
              items.map((item) => (
                <li
                  className={`focus:outline-none hover:bg-gray-100 text-left w-full cursor-pointer px-3 py-2 ${
                    item.selected
                      ? "bg-gray-200 text-gray-500 hover:bg-gray-200 pointer-events-none"
                      : ""
                  }`}
                  key={item.id}
                  value={item.value}
                  onClick={() => selectChangeHandler(item)}
                >
                  {item.label}
                </li>
              ))
            ) : (
              <li className="bg-gray-200 text-left w-full px-3 py-2">
                Location not found!
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
