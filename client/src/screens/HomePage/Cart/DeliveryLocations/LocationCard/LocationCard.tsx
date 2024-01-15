import { CheckBox } from "../../../../../components/UI";
import { LocationCardPropTypes } from "../../../../../ts/types";
import { capitalizedFirstLetter } from "../../../../../common";
import { LocationIcon } from "../../../../../assets/svgs";

export const LocationCard = ({
  id,
  city,
  address,
  checked,
  onCheckedList,
}: LocationCardPropTypes) => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl items-start relative shadow-lg py-3 px-2">
      <div className="flex p-4 m-1 rounded-full bg-gray-300 dark:bg-gray-800">
        <LocationIcon />
      </div>
      <div className="flex w-full justify-between items-center ml-2">
        <div className="flex flex-col mr-10">
          <span className="font-semibold dark:text-white">
            {capitalizedFirstLetter(city)}
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-300">{address}</p>
        </div>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <CheckBox id={id} checked={checked} onChange={onCheckedList} />
      </div>
    </div>
  );
};
