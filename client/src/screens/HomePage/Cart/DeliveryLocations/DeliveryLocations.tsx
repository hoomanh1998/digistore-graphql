import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER_LOCATIONS } from "../../../../graphQL";
import { DeliveryLocationsList } from "./DeliveryLocationsList";
import { LocationCardLoader } from "../../../../components/SkeletonLoaders/LocationsLoader/LocationCardLoader";
import {
  CurrentUserLocation,
  DeliveryLocationsPropTypes,
  Location,
} from "../../../../ts/types";

export function DeliveryLocations({
  onSetOrderLocation,
  onSetDisableButton,
  openLocationModal,
}: DeliveryLocationsPropTypes) {
  const [locationsList, setLocationsList] = useState<Location[]>();

  const { loading, data } = useQuery<CurrentUserLocation>(
    GET_CURRENT_USER_LOCATIONS,
    {
      onCompleted: (data) => {
        setLocationsList(
          data.currentUser.locations.map((location, index) => {
            if (index === 0) {
              return {
                ...location,
                checked: true,
              };
            }
            return {
              ...location,
              checked: false,
            };
          })
        );
      },
    }
  );

  const checkedListHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationsList(
      (prevState) =>
        prevState &&
        prevState.map((location) => {
          if (location.id.toString() === event.target.id) {
            return { ...location, checked: true };
          }
          return { ...location, checked: false };
        })
    );
  };

  //Question: Is this currect way to use setState in another setState?
  useEffect(() => {
    locationsList &&
      locationsList.forEach((location) => {
        if (location.checked) {
          return onSetOrderLocation(location.id.toString());
        }
      });
  }, [locationsList, onSetOrderLocation]);

  useEffect(() => {
    onSetDisableButton(data && data.currentUser.locations.length === 0);
  }, [data, onSetDisableButton]);

  const deliveryLocations = loading ? (
    <LocationCardLoader />
  ) : (
    <DeliveryLocationsList
      locations={locationsList}
      onCheckedList={checkedListHandler}
      openLocationModal={openLocationModal}
    />
  );

  return (
    <div className="flex flex-col mb-3">
      <h4 className="text-gray-800 dark:text-white text-1xl md:text-xl font-bold mb-2 mx-2">
        Delivery Locations
      </h4>
      {deliveryLocations}
    </div>
  );
}
