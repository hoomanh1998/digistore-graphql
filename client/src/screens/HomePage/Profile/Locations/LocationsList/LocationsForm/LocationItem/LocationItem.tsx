import { useState } from "react";
import { useMediaQuery } from "../../../../../../../hooks";
import { TextAreaField, SelectField } from "../../../../../../../components/UI";
import {
  Direction,
  LocationItemPropTypes,
} from "../../../../../../../ts/types";
import { TrashIcon } from "../../../../../../../assets/svgs";
import { locations } from "../../../../../../../common/inputData";
import { useMutation } from "@apollo/client";
import { REMOVE_LOCATION } from "../../../../../../../graphQL";

export const LocationItem = ({
  id,
  index,
  userId,
  locationsLength,
  onDelete,
  city,
  disabled,
}: LocationItemPropTypes) => {
  const { isLarge } = useMediaQuery();
  const [isSelected, setIsSelected] = useState(false);

  const [removeLocation, { loading }] = useMutation(REMOVE_LOCATION, {
    update(cache, { data: { removeLocation } }) {
      cache.evict({ id: `Location:${removeLocation.id}` });
      cache.modify({
        id: `User:${userId}`,
        fields: {
          locations: (existingLocations) => {
            return existingLocations.filter(
              (loc: any) => loc.__ref !== `Location:${removeLocation}`
            );
          },
        },
      });
    },
    onCompleted() {
      onDelete();
    },
  });

  return (
    <li className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg p-3">
      <div className="relative flex flex-row justify-between border-b border-gray-200 dark:border-gray-600 mb-3 pb-3">
        <p className="font-semibold text-lg text-black dark:text-white rounded-lg mx-1">
          Location No.{index + 1}
        </p>
        {!disabled && (
          <button
            className={`btn absolute right-0 top-0 bg-red-400 hover:bg-red-500 transition duration-150 ease-in-out rounded-lg shadow-sm cursor-pointer px-2  ${
              isSelected && loading ? "py-2" : "py-1"
            }`}
            type="button"
            onClick={() => {
              setIsSelected(true);
              removeLocation({ variables: { location_id: id.toString() } });
            }}
          >
            {isSelected && loading ? (
              <div className="w-4 h-4 animate-spin spinner-loader" />
            ) : (
              <div className="flex flex-row justify-center items-center">
                <span className="mr-1 text-white font-semibold">Remove</span>
                <TrashIcon smallIcon={true} />
              </div>
            )}
          </button>
        )}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
        <SelectField
          id={id}
          name={`locations[${index}].city`}
          label="City"
          disabled={disabled}
          list={locations}
          defaultValue={city}
          dropDownListPosition={
            isLarge && locationsLength === index + 1
              ? Direction.Up
              : Direction.Down
          }
        />
        <TextAreaField
          name={`locations[${index}].address`}
          label="Address"
          type="text"
          disabled={disabled}
        />
      </div>
    </li>
  );
};
