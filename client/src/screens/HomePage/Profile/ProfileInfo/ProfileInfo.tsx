import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useShowAlert } from "../../../../hooks";
import { Formik } from "formik";
import { Prompt } from "react-router-dom";
import {
  GET_CURRENT_USER_DETAILS,
  UPDATE_USER_PROFILE,
} from "../../../../graphQL";
import { ButtonTypes, CurrentUserDetails } from "../../../../ts/types";
import { InputField, SuccessAlert } from "../../../../components/UI";
import { Button } from "../../../../components/UI/Button";
import { EditPencilIcon } from "../../../../assets/svgs";
import * as Yup from "yup";

const validation = Yup.object({
  firstName: Yup.string().required("First name must not be empty"),
  lastName: Yup.string().required("Last name must not be empty"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email Address required"),
});

export function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const { showAlert, showAlertHandler } = useShowAlert({
    showTime: 1500,
  });
  const { loading: currentUserLoading, data } = useQuery<CurrentUserDetails>(
    GET_CURRENT_USER_DETAILS
  );
  const [updateUserProfile, { loading }] = useMutation(UPDATE_USER_PROFILE, {
    update(cache, { data: { updateUserProfile } }) {
      cache.modify({
        id: `User:${data && data.currentUser.id}`,
        fields: {
          firstName() {
            return updateUserProfile.firstName;
          },
          lastName() {
            return updateUserProfile.lsatName;
          },
          email() {
            return updateUserProfile.email;
          },
        },
      });
    },
    onCompleted() {
      showAlertHandler();
      setIsEditing(false);
    },
  });

  const onSubmit = async ({ firstName, lastName, email }: any) => {
    try {
      updateUserProfile({
        variables: { firstName, lastName, email },
      });
    } catch {}
  };

  return (
    <>
      <SuccessAlert
        alertMessage="Your info updated successfully!"
        showAlert={showAlert}
      />
      <Prompt
        when={isEditing}
        message={(location) =>
          "Are you sure you want to leave? All your edited data will be lost!"
        }
      />
      <div className="bg-gray-200 dark:bg-gray-800 flex flex-1 flex-col w-full h-full md:rounded-xl p-3 pb-navbar-height select-none">
        <h3 className="text-2xl md:text-xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-700 px-1.5 pb-3 mb-3">
          Profile Information
        </h3>
        {currentUserLoading ? (
          <div className="animate-pulse-fast flex flex-col items-baseline w-full space-y-2 px-3 mb-2">
            <div className="h-7 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2" />
            <div className="h-5 bg-gray-400 dark:bg-gray-700 rounded w-full mb-2" />
          </div>
        ) : (
          <div className="flex flex-col md:bg-gray-100 md:dark:bg-gray-700 rounded-xl items-center w-full md:p-3">
            <Formik
              initialValues={{
                firstName: data && data.currentUser.firstName,
                lastName: data && data.currentUser.lastName,
                email: data && data.currentUser.email,
              }}
              validationSchema={validation}
              onSubmit={onSubmit}
              enableReinitialize={true}
            >
              {({ handleSubmit, dirty, isValid, resetForm }) => {
                return (
                  <form className="w-full" onSubmit={handleSubmit}>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3 mb-5">
                      <InputField
                        name="firstName"
                        label="First Name"
                        type="text"
                        disabled={!isEditing}
                      />
                      <InputField
                        name="lastName"
                        label="Last Name"
                        type="text"
                        disabled={!isEditing}
                      />
                      <InputField
                        name="email"
                        label="Email"
                        type="email"
                        disabled={!isEditing}
                      />
                    </div>
                    {isEditing ? (
                      <div className="flex flex-row justify-start space-x-3 mt-3 md:mt-0">
                        <Button
                          onClick={() => {
                            resetForm();
                            setIsEditing(false);
                          }}
                          narrow
                        >
                          Cancel
                        </Button>
                        <Button
                          color="btn-green"
                          type={ButtonTypes.Submit}
                          disabled={!dirty || !isValid}
                          narrow
                        >
                          {loading ? (
                            <div className="w-6 h-6 animate-spin spinner-loader" />
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        color="btn-blue"
                        onClick={() => setIsEditing(true)}
                        extraClasses="w-full md:w-auto active:bg-blue-600"
                        narrow
                      >
                        <span className="mr-2">Edit Profile</span>
                        <EditPencilIcon smallIcon={true} />
                      </Button>
                    )}
                  </form>
                );
              }}
            </Formik>
          </div>
        )}
      </div>
    </>
  );
}
