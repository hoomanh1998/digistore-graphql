import { Modal } from "../../../hoc/Modal";
import { Button } from "../../UI";
import { ButtonTypes, LogoutModalPropTypes } from "../../../ts/types";

export const LogoutModal = ({
  showLogoutModal,
  onCloseLogoutModal,
  onLogout,
}: LogoutModalPropTypes) => {
  return (
    <Modal showModal={showLogoutModal}>
      <div className="min-w-2/5 md:w-72 bg-gray-200 dark:bg-gray-700 rounded-xl p-3">
        <h3 className="text-xl md:text-lg font-semibold dark:text-white mb-4 mx-3 md:mx-0 md:px-3">
          Do you want to logout?
        </h3>
        <div className="flex flex-wrap flex-row w-full md:justify-between space-x-3">
          <Button
            onClick={onCloseLogoutModal}
            type={ButtonTypes.Button}
            extraClasses="flex-1 w-full md:w-auto active:bg-gray-600"
            narrow
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onCloseLogoutModal();
              onLogout();
            }}
            color="btn-red"
            type={ButtonTypes.Button}
            extraClasses="flex-1 w-full md:w-auto active:bg-red-700"
            narrow
          >
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
};
