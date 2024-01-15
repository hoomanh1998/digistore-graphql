import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useShowAlert } from "../../hooks";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { AuthContext } from "../../hoc/store";
import { REGISTER_USER } from "../../graphQL";
import { Button, InputField } from "../../components/UI";
import { ErrorAlert, SuccessAlert } from "../../components/UI";
import { ShowPassword } from "../Login/ShowPassword";
import {
  ButtonTypes,
  Path,
  RegisterResult,
  RegisterValues,
} from "../../ts/types";
import * as Yup from "yup";

const validation = Yup.object({
  firstName: Yup.string()
    .required("First Name required")
    .max(15, "Must be 15 characters or less"),
  lastName: Yup.string()
    .required("Last Name required")
    .max(20, "Must be 20 characters or less"),
  email: Yup.string()
    .required("Email Address  required")
    .email("Invalid Email Address"),
  password: Yup.string()
    .required("Password required")
    .min(8, "Password must contain at least 8 characters"),
});

const values: RegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export function Register() {
  const { nextPath } = useSelector((state: Path) => state.path.login);
  const history = useHistory();
  const { pathname } = useLocation();
  const { setAuthState, isAuthenticated } = useContext(AuthContext);
  const [verificationURL, setVerificationURL] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { showAlert: showErrorAlert, showAlertHandler: showErrorAlertHandler } =
    useShowAlert({
      showTime: 5000,
    });

  const {
    showAlert: showVerifiedAlert,
    showAlertHandler: showVerifiedAlertHandler,
    hideAlertHandler,
  } = useShowAlert({
    showTime: 3000,
    permanent: true,
  });

  const [registerUser, { error: apolloError, loading }] = useMutation(
    REGISTER_USER,
    {
      onCompleted({ registerUser }: RegisterResult) {
        const authState = {
          accessToken: registerUser.accessToken,
          expiresAt: registerUser.expiresAt,
          userInfo: registerUser.user,
        };
        showVerifiedAlertHandler();
        setAuthState(authState);
        setVerificationURL(registerUser.verificationURL);
      },
    }
  );

  const onSubmitHandler = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterValues) => {
    try {
      // await registerUser({
      //   variables: {
      //     firstName,
      //     lastName,
      //     email: email.toLowerCase(),
      //     password,
      //   },
      // });
      // setAuthState(userData);
    } catch {
      showErrorAlertHandler();
    }
  };

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    isAuthenticated() && nextPath === "" && history.replace("/home");
  }, [history, isAuthenticated, nextPath]);

  return (
    <>
      <ErrorAlert error={apolloError} showAlert={showErrorAlert} />
      <SuccessAlert
        alertMessage="Verification link has been sent to your email address, please check your mail inbox:"
        btnMessage="Open Mail"
        webPageLink={verificationURL}
        showAlert={showVerifiedAlert}
        onCloseAlert={hideAlertHandler}
      />
      <div className="flex flex-col items-center justify-center min-h-screen sm:h-auto mx-auto bg-gray-100 dark:bg-gray-800 sm:bg-gradient-to-br sm:from-blue-400 sm:to-blue-600 sm:dark:from-gray-600 sm:dark:to-gray-700 relative">
        <div className="w-full max-w-md mx-auto sm:max-h-160 overflow-y-auto sm:bg-gray-100 sm:dark:bg-gray-800 rounded-xl sm:border-2 border-gray-300 dark:border-transparent sm:shadow-lg p-3 pt-10 sm:p-5 sm:pt-10">
          <div className="flex flex-col items-center mb-8">
            <h3 className="font-bold text-3xl text-center dark:text-white mb-2">
              Create Account
            </h3>
            <div className="flex flex-row flex-wrap items-center justify-center text-gray-600 dark:text-gray-300">
              Already have an account?
              <Link
                to={{ pathname: "/login", state: pathname }}
                className="text-center font-semibold text-blue-500 dark:text-blue-400 sm:hover:text-blue-700 sm:dark:hover:text-blue-500 transition-colors duration-150 ease-in-out ml-1"
              >
                Login
              </Link>
            </div>
          </div>
          <Formik
            initialValues={values}
            validationSchema={validation}
            onSubmit={onSubmitHandler}
          >
            {({ handleSubmit, dirty, isValid }) => (
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-3 space-y-3 sm:space-y-0">
                    <InputField
                      name="firstName"
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name"
                    />
                    <InputField
                      name="lastName"
                      label="Last Name"
                      type="text"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                  <InputField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    icon={
                      <ShowPassword
                        isEnabled={showPassword}
                        onClick={showPasswordHandler}
                      />
                    }
                  />
                </div>
                <Button
                  color="btn-green"
                  type={ButtonTypes.Submit}
                  disabled={(!isValid && !dirty) || showErrorAlert}
                  extraClasses="font-semibold mt-5 disabled:opacity-70 md:py-3"
                >
                  {loading ? (
                    <div className="w-6 h-6 animate-spin spinner-loader" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
