import ReactDOM from "react-dom";
import { Backdrop } from "./BackDrop";
import { ModalOverlay } from "./ModalOverlay";
import { ModalPropTypes } from "../../ts/types";
import { useLockBodyScroll } from "../../hooks";

const portalElement = document.getElementById("overlays")!;

export const Modal = ({ showModal, children }: ModalPropTypes) => {
  useLockBodyScroll(showModal);
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};
