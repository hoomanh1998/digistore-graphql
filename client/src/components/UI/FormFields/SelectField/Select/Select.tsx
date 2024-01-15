import { useEffect } from "react";
import { capitalizedFirstLetter } from "../../../../../common";
import { ArrowDownIcon } from "../../../../../assets/svgs";
import { SelectPropTypes } from "../../../../../ts/types";

export const Select = ({
  id,
  items,
  title,
  field,
  disabled,
  defaultValue,
  setValue,
  selectController,
  setSelectController,
  editDataHandler,
}: SelectPropTypes) => {
  const { itemSelected, isListOpen } = selectController;

  const selectItem = (value: string) => {
    setSelectController((prevState) => ({
      ...prevState,
      isListOpen: false,
      itemSelected: true,
      headerTitle: capitalizedFirstLetter(value),
    }));
  };

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (editDataHandler) {
      editDataHandler({ locationId: id!, selectEvent: event });
    }
    selectItem(event.target.value);
    setValue(event.target.value);
    field.onChange(event);
  };

  useEffect(() => {
    if (disabled && itemSelected && !isListOpen) {
      setSelectController((prevState) => ({
        ...prevState,
        itemSelected: true,
        headerTitle: capitalizedFirstLetter(defaultValue!),
      }));
    }
  }, [disabled, isListOpen, itemSelected, defaultValue, setSelectController]);

  return (
    <div className="inline-block relative w-full">
      <select
        className="appearance-none input flex justify-between w-full border dark:border-transparent border-gray-300 bg-white focus:ring-2 focus:ring-gray-700 disabled:border-none dark:focus:ring-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-600 dark:disabled:text-white transition-background-color duration-150 ease-in-out px-4 py-3"
        name={field.name}
        disabled={disabled}
        value={defaultValue}
        onBlur={field.onBlur}
        onChange={selectChangeHandler}
      >
        <option value="" disabled>
          {title}
        </option>
        {items.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
        <ArrowDownIcon strokeColor={disabled ? "gray" : "black"} />
      </div>
    </div>
  );
};
