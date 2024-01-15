import { LocationsForm } from "./LocationsForm";
import { Button } from "../../../../../components/UI";
import { PlusIcon } from "../../../../../assets/svgs";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER_LOCATIONS } from "../../../../../graphQL";
import { LocationsLoader } from "../../../../../components/SkeletonLoaders";
import { CurrentUserLocation } from "../../../../../ts/types";

interface PropTypes {
  onShowModal: () => void;
}

export function LocationsList({ onShowModal }: PropTypes) {
  const { loading, data } = useQuery<CurrentUserLocation>(
    GET_CURRENT_USER_LOCATIONS
  );

  if (loading) {
    return <LocationsLoader />;
  }

  if (data && data.currentUser.locations.length === 0) {
    return (
      <div className="flex flex-col justify-start items-start">
        <p className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white p-3 rounded-xl mb-5">
          No location registerd yet, add a new location:
        </p>
        <Button
          onClick={onShowModal}
          color="btn-green"
          extraClasses="w-full md:w-auto md:py-2"
        >
          <span className="mr-1">Add Location</span>
          <PlusIcon />
        </Button>
      </div>
    );
  }

  return <LocationsForm userLocations={data} onShowModal={onShowModal} />;
}
