import { useState, useEffect } from "react";
import { Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { InputField } from "../../components/UI";
import { ErrorAlert, SuccessAlert } from "../../components/UI";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../graphQL";
import { useShowAlert } from "../../hooks";
import { ResetPasswordFormValues } from "../../ts/types";
import * as Yup from "yup";

const values: ResetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};

const validation = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password must match"),
});

export function ResetPassword() {
  const history = useHistory();
  const location = useLocation();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { showAlert, showAlertHandler, hideAlertHandler } = useShowAlert({
    showTime: 1500,
  });
  const [token, setToken] = useState("");
  const [resetPassword, { error, loading }] = useMutation(RESET_PASSWORD, {
    onCompleted() {
      showAlertHandler();
      setTimeout(() => {
        hideAlertHandler();
        history.push("/login");
      }, 3000);
    },
  });
  const onSubmit = async ({
    password,
    confirmPassword,
  }: ResetPasswordFormValues) => {
    try {
      await resetPassword({
        variables: { password, confirmPassword, token },
      });
    } catch (error) {
      console.log(error);
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has("token")) {
      setToken(queryParams.get("token")!);
      queryParams.delete("token");
      history.replace({
        search: queryParams.toString(),
      });
    }
  }, [history, location]);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (error) {
      timer = setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
      setShowErrorAlert(true);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen bg-gray-100 dark:bg-gray-800 sm:dark:bg-gray-700">
      <ErrorAlert error={error} showAlert={showErrorAlert} />
      <SuccessAlert
        alertMessage="Your password has been reset successfully!"
        showAlert={showAlert}
      />
      <div className="w-full max-w-md mx-auto sm:bg-gray-100 sm:dark:bg-gray-800 rounded-xl sm:border-2 border-gray-300 dark:border-transparent sm:shadow-lg p-3 sm:p-5 sm:pt-10">
        <h3 className="w-2/3 sm:w-full font-bold text-3xl dark:text-white text-left sm:text-center px-3 mb-8">
          Reset Your Password
        </h3>
        <Formik
          initialValues={values}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-3">
                <InputField
                  name="password"
                  label="New Password"
                  type="password"
                  placeholder="Enter your password"
                />
                <InputField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Enter your confirm password"
                />
              </div>
              <button
                className="btn btn-blue uppercase font-semibold flex justify-center items-center h-12 disabled:opacity-50 px-14 py-3 mt-5"
                type="submit"
                disabled={showErrorAlert}
              >
                {loading ? (
                  <div className="w-6 h-6 animate-spin spinner-loader" />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
