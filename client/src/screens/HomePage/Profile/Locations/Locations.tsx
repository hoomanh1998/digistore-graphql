import React, { useEffect, useState } from "react";
import { useShowAlert } from "../../../../hooks";
import { LocationModal } from "./LocationModal";
import { LocationsList } from "./LocationsList";
import { SuccessAlert } from "../../../../components/UI";

export function Locations() {
  const [showLocationModal, setShowLocationModal] = useState(false);

  const { showAlert, showAlertHandler } = useShowAlert({
    showTime: 1500,
  });

  const closeModalHandler = () => {
    setShowLocationModal(false);
  };

  const openModalHandler = () => {
    setShowLocationModal(true);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <SuccessAlert alertMessage="Location Added" showAlert={showAlert} />
      {showLocationModal && (
        <LocationModal
          showModal={showLocationModal}
          onClose={closeModalHandler}
          onAdd={showAlertHandler}
        />
      )}
      <div className="bg-gray-200 dark:bg-gray-800 flex flex-1 flex-col w-full h-full md:rounded-xl p-3 pb-navbar-height select-none">
        <h3 className="text-2xl md:text-xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-700 px-1.5 pb-3 mb-3">
          Location Information
        </h3>
        <LocationsList onShowModal={openModalHandler} />
      </div>
    </>
  );
}
