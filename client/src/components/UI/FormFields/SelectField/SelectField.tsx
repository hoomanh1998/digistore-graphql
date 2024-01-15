import { useEffect, useState } from "react";
import { DropDownMenu } from "./DropDownMenu/DropDownMenu";
import { useMediaQuery } from "../../../../hooks";
import { useField } from "formik";
import { Select } from "./Select";
import { SelectFieldPropTypes, SelectControl } from "../../../../ts/types";
import { capitalizedFirstLetter } from "../../../../common";

export function SelectField({
  id,
  list,
  name,
  label,
  disabled,
  placeholder,
  dropDownListPosition,
  defaultValue,
  editDataHandler,
}: SelectFieldPropTypes) {
  const { isMobile } = useMediaQuery();
  const [field, meta, helpers] = useField(name!);
  const { setValue, setTouched } = helpers;
  const [selectController, setSelectController] = useState<SelectControl>({
    items: list,
    inputValue: "",
    isListOpen: false,
    itemSelected: false,
    dropDownError: false,
    defaultValue,
    headerTitle: defaultValue
      ? capitalizedFirstLetter(defaultValue)
      : placeholder!,
  });
  const { items, inputValue } = selectController;

  const _filteredItems = items.filter((item) => {
    return item.value
      .toLocaleLowerCase()
      .includes(inputValue.toLocaleLowerCase());
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectController((prevState) => ({
      ...prevState,
      inputValue: event.target.value,
    }));
  };

  // This function will update list with the clicked item and set the selected prop to true and make rest of list to be false.
  const updateItems = (id: number) => {
    setSelectController((prevState) => ({
      ...prevState,
      items: prevState.items
        .map((item) => ({ ...item, selected: false }))
        .map((item) => {
          if (id === item.id) {
            return { ...item, selected: true };
          }
          return item;
        }),
    }));
  };

  useEffect(() => {
    setSelectController((prevState) => ({
      ...prevState,
      items: prevState.items
        .map((item) => ({ ...item, selected: false }))
        .map((item) => {
          if (defaultValue === item.value) {
            return { ...item, selected: true };
          }
          return item;
        }),
    }));
  }, [defaultValue]);

  useEffect(() => {
    if (meta.touched && meta.error) {
      setSelectController((prevState) => ({
        ...prevState,
        dropDownError: true,
      }));
    }
  }, [meta.touched, meta.error]);

  // There are 2 type of select field for mobile and desktop.
  const selectField = isMobile ? (
    <Select
      id={id}
      items={items}
      title={placeholder!}  
      field={field}
      disabled={disabled}
      defaultValue={defaultValue}
      setValue={setValue}
      selectController={selectController}
      setSelectController={setSelectController}
      editDataHandler={editDataHandler}
    />
  ) : (
    <DropDownMenu
      id={id}
      items={_filteredItems}
      disabled={disabled}
      defaultValue={defaultValue}
      listPosition={dropDownListPosition}
      selectController={selectController}
      setSelectController={setSelectController}
      setValue={setValue}
      setTouched={setTouched}
      updateItems={updateItems}
      inputChangeHandler={inputChangeHandler}
      editDataHandler={editDataHandler}
    />
  );

  return (
    <div className="flex flex-col relative">
      <label
        className="w-full pl-2 mb-1 text-left dark:text-white font-semibold"
        htmlFor={name}
      >
        {label}
      </label>
      {selectField}
      {meta.touched && meta.error && (
        <div className="text-red-500 dark:text-red-400 px-2 w-full mt-2">
          {meta.error}
        </div>
      )}
    </div>
  );
}
