import { useContext } from "react";
import { AuthContext } from "../../../../../hoc/store";
import { Formik } from "formik";
import { gql, useMutation } from "@apollo/client";
import { Modal } from "../../../../../hoc/Modal";
import { SelectField, TextAreaField } from "../../../../../components/UI";
import { Button } from "../../../../../components/UI/Button";
import { ADD_LOCATION } from "../../../../../graphQL";
import {
  ButtonTypes,
  Direction,
  FCModalPropTypes,
  LocationValues,
} from "../../../../../ts/types";
import { locations } from "../../../../../common/inputData";
import * as Yup from "yup";

const validation = Yup.object({
  city: Yup.string().required("City must not be empty"),
  address: Yup.string().required("Address must not be empty"),
});

const initialValues: LocationValues = {
  city: "",
  address: "",
};

export function LocationModal({ showModal, onClose, onAdd }: FCModalPropTypes) {
  const {
    authState: { userInfo },
  } = useContext(AuthContext);

  const [addLocation, { loading }] = useMutation(ADD_LOCATION, {
    update(cache, { data: { addLocation } }) {
      cache.modify({
        id: `User:${userInfo && userInfo.id}`,
        fields: {
          locations: (currentLocations = []) => {
            const newLocRef = cache.writeFragment({
              data: addLocation,
              fragment: gql`
                fragment NewLocation on Location {
                  id
                  city
                  address
                }
              `,
            });
            return [...currentLocations, newLocRef];
          },
        },
      });
    },
    onCompleted() {
      onAdd();
      onClose();
    },
  });

  const onSubmit = async ({ city, address }: LocationValues) => {
    try {
      addLocation({
        variables: { city, address: address.trim() },
      });
    } catch {}
  };

  return (
    <Modal showModal={showModal}>
      <div className="min-w-max w-11/12 md:w-full md:max-w-md bg-gray-200 dark:bg-gray-800 rounded-xl p-4 pt-5 md:p-5">
        <h3 className="text-xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-700 mb-4 px-3 pb-3">
          Add New Location
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, dirty, isValid, values }) => {
            return (
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-3 mb-5">
                  <SelectField
                    name="city"
                    label="City"
                    placeholder="Select your city"
                    list={locations}
                    dropDownListPosition={Direction.Down}
                    defaultValue={values.city}
                  />
                  <TextAreaField
                    name="address"
                    label="Address"
                    type="text"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="flex flex-wrap flex-row justify-between md:space-x-3 items-center">
                  <Button
                    type={ButtonTypes.Button}
                    onClick={onClose}
                    narrow
                    extraClasses="md:mb-0"
                  >
                    Cancel
                  </Button>
                  <Button
                    type={ButtonTypes.Submit}
                    color="btn-green"
                    disabled={!dirty && !isValid}
                    narrow
                    extraClasses="md:mb-0 md:mr-3"
                  >
                    {loading ? (
                      <div className="w-6 h-6 animate-spin spinner-loader" />
                    ) : (
                      "Add Location"
                    )}
                  </Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}
