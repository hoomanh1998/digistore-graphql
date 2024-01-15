import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useShowAlert } from "../../../../../../hooks";
import { Prompt } from "react-router-dom";
import {
  GET_CURRENT_USER_LOCATIONS,
  UPDTAE_LOCATION,
} from "../../../../../../graphQL";
import { Formik } from "formik";
import { LocationItem } from "./LocationItem";
import {
  ButtonTypes,
  Location as LocationType,
  LocationsFormPropTypes,
} from "../../../../../../ts/types";
import { Button, SuccessAlert } from "../../../../../../components/UI";
import { EditPencilIcon, PlusIcon } from "../../../../../../assets/svgs";
import * as Yup from "yup";

const validation = Yup.object({
  locations: Yup.array().of(
    Yup.object().shape({
      city: Yup.string().required("City must not be empty"),
      address: Yup.string().required("Address must not be empty"),
    })
  ),
});

export function LocationsForm({
  userLocations,
  onShowModal,
}: LocationsFormPropTypes) {
  const [isEditing, setIsEditing] = useState(false);

  const locationsLength =
    userLocations && userLocations.currentUser.locations.length;

  const {
    showAlert: showUpdatedAlert,
    showAlertHandler: showUpdatedAlertHandler,
  } = useShowAlert({
    showTime: 1500,
  });

  const {
    showAlert: showDeletedAlert,
    showAlertHandler: showDeletedAlertHandler,
  } = useShowAlert({
    showTime: 1500,
  });

  const [updateLocation, { loading: updateLocationLoading }] = useMutation(
    UPDTAE_LOCATION,
    {
      refetchQueries: () => [{ query: GET_CURRENT_USER_LOCATIONS }],
      // update(cache) {
      //   cache.modify({
      //     id: `User:${currentUserDetails?.currentUser.id}`,
      //     fields: {
      //       locations: (currentLocations = []) => {
      //         const updatedLocations = cache.readQuery({
      //           query: GET_CURRENT_USER_LOCATIONS,
      //         });
      //         console.log(currentLocations);

      //         // return [...updatedLocations];
      //       },
      //     },
      //   });
      // },
      onCompleted() {
        showUpdatedAlertHandler();
        setIsEditing(false);
      },
    }
  );

  const onSubmit = async (values: LocationType[] | undefined) => {
    const initialLocationValues =
      userLocations && userLocations.currentUser.locations;
    const editedLocations =
      values &&
      values
        .filter((location, index) => {
          return (
            location.city !== initialLocationValues![index].city ||
            location.address !== initialLocationValues![index].address
          );
        })
        .map((location) => ({
          id: location.id,
          city: location.city,
          address: location.address.trim(),
        }));
    console.log("editedLocations: ", editedLocations);
    if (editedLocations && editedLocations.length !== 0) {
      updateLocation({
        variables: { locations: editedLocations },
      });
    }
  };

  return (
    <>
      <SuccessAlert
        alertMessage="Location updated"
        showAlert={showUpdatedAlert}
      />
      <SuccessAlert
        alertMessage="Location deleted"
        showAlert={showDeletedAlert}
      />
      <Prompt
        when={isEditing}
        message={() =>
          "Are you sure you want to leave? All your edited data will be lost!"
        }
      />
      <div className="flex flex-col items-center w-full pb-3 md:pb-0">
        <Formik
          initialValues={{
            locations: userLocations && userLocations.currentUser.locations,
          }}
          validationSchema={validation}
          onSubmit={async (values) => onSubmit(values.locations)}
          enableReinitialize={true}
        >
          {({ handleSubmit, dirty, isValid, values, resetForm }) => {
            return (
              <form className="w-full" onSubmit={handleSubmit}>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {values.locations &&
                    values.locations.length > 0 &&
                    values.locations.map(({ id, city }, index) => (
                      <LocationItem
                        key={id}
                        id={id}
                        index={index}
                        userId={userLocations && userLocations.currentUser.id}
                        onDelete={showDeletedAlertHandler}
                        locationsLength={locationsLength}
                        city={city}
                        disabled={!isEditing}
                      />
                    ))}
                </ul>
                {isEditing ? (
                  <div className="flex flex-row justify-start space-x-3 mt-5">
                    <Button
                      onClick={() => {
                        resetForm();
                        setIsEditing(false);
                      }}
                      narrow
                    >
                      Discard
                    </Button>
                    <Button
                      color="btn-green"
                      type={ButtonTypes.Submit}
                      disabled={!dirty || !isValid}
                      narrow
                    >
                      {updateLocationLoading ? (
                        <div className="w-6 h-6 animate-spin spinner-loader" />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap flex-row justify-start space-x-3 mt-5">
                    <Button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setIsEditing(true);
                      }}
                      color="btn-blue"
                      narrow
                    >
                      <span className="mr-1">Edit Location</span>
                      <EditPencilIcon smallIcon={true} />
                    </Button>
                    <Button
                      onClick={onShowModal}
                      color="btn-green"
                      narrow
                      extraClasses="md:mr-3 md:mb-0"
                    >
                      <span className="mr-1">New Location</span>
                      <PlusIcon />
                    </Button>
                  </div>
                )}
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
