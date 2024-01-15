import { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { useMediaQuery, useShowAlert } from "../../hooks";
import { LOGIN_USER } from "../../graphQL";
import { AuthContext } from "../../hoc/store";
import { Formik } from "formik";
import {
  Button,
  InputField,
  ErrorAlert,
  SuccessAlert,
} from "../../components/UI";
import { ShowPassword } from "./ShowPassword";
import { GoBack } from "../../components/Navigation/GoBack";
import { ButtonTypes, LoginValues, LoginResult, Path } from "../../ts/types";
import { GoBackIcon } from "../../assets/svgs";
import * as Yup from "yup";

const validation = Yup.object({
  email: Yup.string()
    .required("Email Address Required")
    .email("Invalid Email Address"),
  password: Yup.string()
    .required("Password Required")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // )
    .min(8, "Password Must Contain 8 Characters"),
});

const initialValues: LoginValues = {
  email: "",
  password: "",
};

export function Login() {
  const history = useHistory();
  const { isSmall } = useMediaQuery();
  const { isAuthenticated, setAuthState } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationURL, setVerificationURL] = useState("");
  const { prevPath, nextPath } = useSelector((state: Path) => state.path.login);

  const [loginUser, { error: apolloError, loading }] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser }: LoginResult) {
      /*check what data is necessary to save on localStorage(cookie).
        Try to implement cookie for storing token.*/
      if (loginUser.user.isVerified) {
        setAuthState({
          accessToken: loginUser.accessToken,
          expiresAt: loginUser.expiresAt,
          userInfo: loginUser.user,
        });
        history.replace(nextPath!);
      } else {
        showVerifiedAlertHandler();
        setVerificationURL(loginUser.verificationURL);
      }
    },
  });

  const { showAlert: showErrorAlert, showAlertHandler: showErrorAlertHandler } =
    useShowAlert({
      showTime: 5000,
    });

  const {
    showAlert: showVerifiedAlert,
    showAlertHandler: showVerifiedAlertHandler,
  } = useShowAlert({
    permanent: true,
  });

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const goBackRouteHandler = () => {
    prevPath ? history.push(prevPath) : history.push("/home");
  };

  const onSubmitHandler = async ({ email, password }: LoginValues) => {
    try {
      await loginUser({
        variables: { email: email.toLowerCase(), password },
      });
    } catch {
      showErrorAlertHandler();
    }
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
      />
      <div className="flex flex-col items-center justify-center min-h-screen py-16 sm:h-auto mx-auto bg-gray-100 dark:bg-gray-800 sm:bg-gradient-to-br sm:from-blue-400 sm:to-blue-600 sm:dark:from-gray-600 sm:dark:to-gray-700 relative">
        <div className="flex flex-col space-y-3 bg-gray-900 text-white my-5 p-5 border border-gray-300 rounded-xl">
          <div>
            Email: <strong>user_1234@test.com</strong>
          </div>
          <div>
            Password: <strong>12345678</strong>
          </div>
        </div>
        {isSmall && (
          <GoBack backgroundColor="bg-gray-100" fixed>
            <div onClick={goBackRouteHandler} className="cursor-pointer">
              <GoBackIcon />
            </div>
          </GoBack>
        )}
        <div className="w-full max-w-md mx-auto sm:bg-gray-100 sm:dark:bg-gray-800 rounded-xl sm:border-2 border-gray-300 dark:border-transparent sm:shadow-lg p-3 sm:p-5 sm:pt-10">
          <div className="w-4/5 sm:w-full text-left sm:text-center px-3 mb-8">
            <h3 className="font-bold text-3xl dark:text-white">
              Login to your account
            </h3>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={onSubmitHandler}
          >
            {({ handleSubmit, dirty, isValid }) => {
              return (
                <form className="flex flex-col" onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-3">
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
                    color="btn-blue"
                    type={ButtonTypes.Submit}
                    disabled={(!isValid && !dirty) || showErrorAlert}
                    extraClasses="font-semibold mt-5 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-6 h-6 animate-spin spinner-loader" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <div className="flex flex-col items-center mt-5">
                    <div className="flex flex-row flex-wrap justify-center items-center text-gray-600 dark:text-gray-300 mb-2">
                      Don't have create an account?
                      <Link
                        className="text-center font-semibold text-blue-500 dark:text-blue-400 sm:hover:text-blue-700 sm:dark:hover:text-blue-500 transition-colors duration-150 ease-in-out ml-1"
                        to="/register"
                      >
                        Register
                      </Link>
                    </div>
                    <Link
                      className="text-center font-semibold text-blue-500 dark:text-blue-400 sm:hover:text-blue-700 sm:dark:hover:text-blue-500 transition-colors duration-150 ease-in-out"
                      to="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
