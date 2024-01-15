import { useField } from "formik";
import { InputFieldPropTypes } from "../../../../ts/types";

export const TextAreaField = ({
  label,
  icon,
  disabled,
  ...props
}: InputFieldPropTypes) => {
  const [field, meta] = useField(props.name);

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={props.name}
        className="w-full dark:text-white font-semibold pl-1.5 mb-1"
      >
        {label}
      </label>
      <div className="flex flex-col relative">
        <textarea
          className={`input min-h-24 relative opacity-100 text-opacity-100 disabled:text-gray-700 dark:disabled:text-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-600 resize-none whitespace-pre-line transition-background-color duration-150 ease-in-out ${
            meta.touched && meta.error ? "input-error" : ""
          }`}
          {...field}
          {...props}
          disabled={disabled}
        />
        {icon}
      </div>
      {meta.touched && meta.error && (
        <div className="text-sm text-red-500 dark:text-red-400 w-full px-3 mt-2">
          {meta.error}
        </div>
      )}
    </div>
  );
};
