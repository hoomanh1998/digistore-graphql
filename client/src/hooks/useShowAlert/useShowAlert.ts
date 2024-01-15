import { useEffect, useState } from "react";
import { ShowAlertPropTypes } from "../../ts/types";

export const useShowAlert = ({
  showTime,
  permanent = false,
}: ShowAlertPropTypes) => {
  const [showAlert, setShowAlert] = useState(false);

  const showAlertHandler = () => {
    setShowAlert(true);
  };

  const hideAlertHandler = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    function handleShowAlert() {
      if (showAlert && !permanent) {
        timer = setTimeout(() => {
          hideAlertHandler();
        }, 1500);
      }
    }
    handleShowAlert();
    return () => {
      clearTimeout(timer);
    };
  }, [showTime, showAlert, permanent]);

  return { showAlert, showAlertHandler, hideAlertHandler };
};
