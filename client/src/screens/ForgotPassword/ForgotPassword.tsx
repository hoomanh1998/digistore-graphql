import { useState } from "react";
import { useShowAlert } from "../../hooks";
import { Link, useLocation } from "react-router-dom";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "../../graphQL";
import {
  ErrorAlert,
  SuccessAlert,
  InputField,
  Button,
} from "../../components/UI";
import {
  ButtonTypes,
  ForgotPasswordValues,
  ForgotPasswordResult,
} from "../../ts/types";
import * as Yup from "yup";

const validation = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email Address required"),
});

const values: ForgotPasswordValues = {
  email: "",
};

export function ForgotPassword() {
  const { pathname } = useLocation();
  const [resetPasswordURL, setResetPasswordURL] = useState("");

  const { showAlert: showErrorAlert, showAlertHandler: showErrorAlertHandler } =
    useShowAlert({
      showTime: 1500,
    });

  const {
    showAlert: showSuccessAlert,
    showAlertHandler: showSuccessAlertHandler,
  } = useShowAlert({
    showTime: 2000,
    permanent: true,
  });

  const [forgotPassword, { error: apolloError, loading }] = useMutation(
    FORGOT_PASSWORD,
    {
      onCompleted({ forgotPassword }: ForgotPasswordResult) {
        showSuccessAlertHandler();
        setResetPasswordURL(forgotPassword.resetPasswordURL);
      },
    }
  );

  const onSubmit = async ({ email }: ForgotPasswordValues) => {
    try {
      await forgotPassword({
        variables: { email },
      });
    } catch {
      showErrorAlertHandler();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen bg-gray-100 dark:bg-gray-800 sm:bg-gradient-to-br sm:from-blue-400 sm:to-blue-600 sm:dark:from-gray-600 sm:dark:to-gray-700">
      <ErrorAlert error={apolloError} showAlert={showErrorAlert} />
      <SuccessAlert
        alertMessage="Reset password link has been sent to your email address, please check your mail inbox:"
        btnMessage="Open Mail"
        webPageLink={resetPasswordURL}
        showAlert={showSuccessAlert}
      />
      <div className="w-full max-w-md mx-auto sm:bg-gray-100 sm:dark:bg-gray-800 rounded-xl sm:border-2 border-gray-300 dark:border-transparent sm:shadow-lg p-3 sm:p-5 sm:pt-10">
        <div className="text-left sm:text-center mb-5">
          <h3 className="font-bold text-3xl text-center dark:text-white px-3">
            Forgot Password
          </h3>
          <p className="rounded-xl bg-yellow-200 dark:bg-gray-700 dark:text-white shadow-lg font-semibold text-gray-700 my-5 p-4 sm:py-5">
            Enter your email address and we will send you a link to reset your
            password
          </p>
        </div>
        <Formik
          initialValues={values}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <InputField
                name="email"
                label="Email"
                type="text"
                placeholder="Enter your email address"
              />
              <Button
                color="btn-blue"
                type={ButtonTypes.Submit}
                disabled={showErrorAlert}
                extraClasses="font-semibold mt-5 disabled:opacity-70 md:py-3"
              >
                {loading ? (
                  <div className="w-6 h-6 animate-spin spinner-loader" />
                ) : (
                  "Submit"
                )}
              </Button>
              <Link
                className="flex items-center w-full justify-center text-center mt-5 text-blue-500 dark:text-blue-400 sm:hover:text-blue-700 sm:dark:hover:text-blue-500 transition-colors duration-150 ease-in-out"
                to={{ pathname: "/login", state: pathname }}
              >
                Back to Login
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
