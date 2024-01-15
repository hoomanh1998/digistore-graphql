import { CheckBoxPropTypes } from "../../../ts/types";
import { CheckIcon } from "../../../assets/svgs";

export const CheckBox = ({
  id,
  label,
  checked,
  onChange,
}: CheckBoxPropTypes) => {
  return (
    <div className="flex flex-row items-center relative">
      <input
        id={id.toString()}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute w-6 h-6 left-0 bottom-0 opacity-0 cursor-pointer"
      />
      <div
        className={`rounded-md w-6 h-6 flex flex-row flex-shrink-0 justify-center items-center ${
          checked
            ? "bg-blue-500"
            : "bg-white border dark:border-transparent border-gray-300"
        }`}
      >
        {checked && <CheckIcon />}
      </div>
      <label htmlFor="checkbox" className="select-none">
        {label}
      </label>
    </div>
  );
};
