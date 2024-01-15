import { Route, Switch, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { AuthContextProvider } from "./hoc/store";
import { useSetTheme } from "./hooks";
import { client } from "./graphQL";
import { Default } from "./hoc/Default";
import { HomePage } from "./screens/HomePage";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { ForgotPassword } from "./screens/ForgotPassword";
import { ResetPassword } from "./screens/ResetPassword";
import { UserVerification } from "./screens/Register/UserVerification";
import { ReactRouterLocation } from "./ts/types";
import { NotFoundPage } from "./screens/NotFoundPage";
import store from "./store";

export default function App() {
  const location = useLocation<ReactRouterLocation>();
  useSetTheme();

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <Switch location={location}>
            <Route component={Default} path="/" exact />
            <Route component={HomePage} path="/home" />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={ForgotPassword} path="/forgot-password" />
            <Route component={ResetPassword} path="/reset-password" />
            <Route component={UserVerification} path="/verify/:token" />
            <Route component={NotFoundPage} path="*" />
          </Switch>
        </AuthContextProvider>
      </ApolloProvider>
    </Provider>
  );
}
