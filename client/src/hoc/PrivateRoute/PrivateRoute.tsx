import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../store";
import { PrivateRoutePropTypes } from "../../ts/types";

export const PrivateRoute = ({
  path,
  exact,
  component,
}: PrivateRoutePropTypes) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated() ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={{ pathname: "/login", state: path }} />
  );
};
