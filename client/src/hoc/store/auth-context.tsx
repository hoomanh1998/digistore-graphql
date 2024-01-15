import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { AuthContextPropTypes, AuthenticatoinData } from "../../ts/types";
import { useShowAlert } from "../../hooks";

/*
**********
Learn about how to handle Authentication in React
**********
*/

const AuthContext = createContext({} as AuthContextPropTypes);

const AuthContextProvider = ({ children }: any) => {
  const history = useHistory();
  const client = useApolloClient();
  const accessToken = localStorage.getItem("accessToken")!;
  const expiresAt = localStorage.getItem("expiresAt")!;
  const userInfo = localStorage.getItem("userInfo");
  const [authState, setAuthState] = useState<AuthenticatoinData>({
    accessToken,
    expiresAt: expiresAt ? parseInt(expiresAt) : NaN,
    userInfo: userInfo ? JSON.parse(userInfo) : null,
  });

  const { showAlert: showLogoutAlert, showAlertHandler } = useShowAlert({
    showTime: 1500,
  });

  const setAuthInfo = ({
    accessToken,
    expiresAt,
    userInfo,
  }: AuthenticatoinData) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("expiresAt", expiresAt!.toString());
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setAuthState({ accessToken, expiresAt, userInfo });
  };

  const isAuthenticated = () => {
    if (
      !authState.accessToken ||
      !authState.expiresAt ||
      !authState.userInfo.isVerified
    ) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const isAdmin_ = () => {
    return authState.userInfo && authState.userInfo.isAdmin ? true : false;
  };

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("userInfo");
    setAuthState({
      accessToken: "",
      expiresAt: NaN,
      userInfo: {
        id: NaN,
        firstName: "",
        lastName: "",
        email: "",
      },
    });
    setTimeout(() => {
      showAlertHandler();
    }, 0);
    client.clearStore().then(() => history.replace("/home"));
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo: AuthenticatoinData) => setAuthInfo(authInfo),
        isAuthenticated,
        isAdmin_,
        onLogout: logoutHandler,
        showLogoutAlert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
