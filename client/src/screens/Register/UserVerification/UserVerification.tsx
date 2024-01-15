import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { VERIFY_USER, setToken } from "../../../graphQL";
import { ReactRouterParam } from "../../../ts/types";

export function UserVerification() {
  const history = useHistory();
  const { token } = useParams<ReactRouterParam>();
  const [verifyUser, { error }] = useMutation(VERIFY_USER);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    verifyUser({ variables: { token } })
      .then(() => {
        setToken(token!);
        timer = setTimeout(() => {
          history.replace("/home");
        }, 5000);
      })
      .catch(() => {
        timer = setTimeout(() => {
          history.replace("/login");
        }, 5000);
      });
    return () => {
      clearTimeout(timer);
    };
  }, [verifyUser, token, history]);

  let userVerification = error ? (
    <div className="flex h-screen justify-center items-center bg-gray-800">
      <div className="flex flex-col items-center justify-center bg-red-100 p-8 rounded-lg border-2 border-red-200 w-full mx-8 md:mx-auto md:w-150">
        <svg
          className="w-40 h-40 flex-shrink-0 mb-5"
          fill="none"
          stroke="red"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-red-600 font-semibold line-clamp-2 text-center text-xl">
          {error?.message}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex h-screen justify-center items-center bg-gray-800">
      <div className="flex flex-col items-center justify-center bg-green-100 p-8 rounded-lg border-2 border-green-200 w-full mx-8 md:mx-auto md:w-150">
        <svg
          className="w-40 h-40 flex-shrink-0 mb-5"
          fill="none"
          stroke="green"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-green-600 font-semibold line-clamp-2 text-center text-xl">
          Your account has been verified!
        </p>
      </div>
    </div>
  );

  return userVerification;
}
