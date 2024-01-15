import { LocationCard } from "../LocationCard";
import { Button } from "../../../../../components/UI";
import { PlusIcon } from "../../../../../assets/svgs";
import {
  ButtonTypes,
  DeliveryLocationsListPropTypes,
} from "../../../../../ts/types";

export function DeliveryLocationsList({
  locations,
  onCheckedList,
  openLocationModal,
}: DeliveryLocationsListPropTypes) {
  if (locations && locations.length === 0) {
    return (
      <div className="flex justify-start">
        <Button
          type={ButtonTypes.Button}
          onClick={openLocationModal}
          color="btn-green"
          extraClasses="w-full md:w-auto"
        >
          <span className="mr-1">Add New Location</span>
          <PlusIcon />
        </Button>
      </div>
    );
  }

  return (
    <ul className="flex flex-col space-y-3">
      {locations &&
        locations.map(({ id, city, address, checked }) => (
          <LocationCard
            key={id}
            id={id}
            city={city}
            address={address}
            checked={checked}
            onCheckedList={onCheckedList}
          />
        ))}
    </ul>
  );
}
