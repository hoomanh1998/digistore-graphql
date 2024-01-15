import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../store";
import { PrivateRoutePropTypes } from "../../ts/types";

export const AdminRoute = ({
  path,
  exact,
  component,
}: PrivateRoutePropTypes) => {
  const { isAdmin_ } = useContext(AuthContext);

  return isAdmin_() ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={{ pathname: "/home/profile", state: path }} />
  );
};
