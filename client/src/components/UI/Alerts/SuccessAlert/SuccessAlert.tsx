import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { CircleCheckIcon } from "../../../../assets/svgs";
import { SuccessAlertPropTypes } from "../../../../ts/types";
import { Button } from "../../Button";

export const SuccessAlert = ({
  alertMessage,
  showAlert,
  btnMessage,
  btnLink,
  webPageLink,
  onCloseAlert,
}: SuccessAlertPropTypes) => {
  const portalElement = document.getElementById("overlays")!;

  let button = null;
  if (btnMessage) {
    button = btnLink ? (
      <Link
        className="btn btn-green py-3 px-5 font-semibold my-0 mx-auto"
        to={btnLink!}
      >
        {btnMessage}
      </Link>
    ) : (
      <a
        className="btn btn-green py-3 px-5 font-semibold my-0"
        href={webPageLink}
      >
        {btnMessage}
      </a>
    );
  }

  const successAlert = (
    <div
      className={`flex flex-col items-start justify-center w-auto md:max-w-lg fixed left-0 right-0 bg-green-100 border-2 border-green-200 m-2 p-3 md:p-4 md:my-3 md:mx-auto rounded-lg transform transition-transform duration-300 ease-in-out z-50 ${
        showAlert ? "translate-y-0" : "-translate-y-48"
      }`}
    >
      <div className="flex flex-col justify-between items-start w-full">
        <div
          className={`flex items-center min-h-14 ${
            btnMessage ? "mb-3" : "mb-0"
          }`}
        >
          <CircleCheckIcon />
          <p className="text-green-700 font-semibold line-clamp-3 ml-3">
            {alertMessage}
          </p>
        </div>
        <div className="flex flex-row w-full justify-between">
          {btnMessage && (
            <Button
              onClick={() => onCloseAlert && onCloseAlert()}
              hasBorder={false}
              narrow
            >
              Close
            </Button>
          )}
          {button}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(successAlert, portalElement);
};
