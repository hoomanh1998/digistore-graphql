import { ModalPropTypes } from "../../../ts/types";

export const ModalOverlay = ({ children }: ModalPropTypes) => {
  return (
    <div className="animate-appear flex justify-center items-center fixed top-0 left-0 hide-scrollbars overflow-y-auto h-full w-full z-50">
      {children}
    </div>
  );
};
