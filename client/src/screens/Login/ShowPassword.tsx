import { ShowPasswordPropTypes } from "../../ts/types";
import { EyeCloseIcon, EyeIcon } from "../../assets/svgs";

export const ShowPassword = ({ isEnabled, onClick }: ShowPasswordPropTypes) => {
  return (
    <div
      className="absolute right-0 mr-3 p-1 top-1/2 transform -translate-y-1/2 rounded-full cursor-pointer bg-white active:bg-gray-100"
      onClick={onClick}
    >
      {isEnabled ? <EyeIcon /> : <EyeCloseIcon />}
    </div>
  );
};
