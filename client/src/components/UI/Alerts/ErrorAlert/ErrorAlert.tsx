import ReactDOM from "react-dom";
import { ErrorAlertPropTypes } from "../../../../ts/types";
import { ErrorIcon } from "../../../../assets/svgs";

export const ErrorAlert = ({ error, showAlert }: ErrorAlertPropTypes) => {
  const portalElement = document.getElementById("overlays")!;

  const errorAlert = (
    <div
      className={`fixed left-0 right-0 w-full flex justify-center transform transition-transform duration-300 ease-in-out z-50 ${
        error && showAlert ? "translate-y-0" : "-translate-y-48"
      }`}
    >
      <div className="flex items-center max-w-lg min-h-14 bg-red-100 m-3 p-3 sm:p-4 rounded-lg border-2 border-red-200 w-full sm:w-auto">
        <ErrorIcon />
        <p className="text-red-600 font-semibold ml-3 break-words">
          {error && error.message}
        </p>
      </div>
    </div>
  );
  return ReactDOM.createPortal(errorAlert, portalElement);
};
