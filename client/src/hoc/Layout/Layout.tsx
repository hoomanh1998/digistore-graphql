import { useContext } from "react";
import { AuthContext } from "../store";
import { Navigation } from "../../components/Navigation";
import { SuccessAlert } from "../../components/UI";

interface PropTypes {
  children: React.ReactNode;
}

export function Layout({ children }: PropTypes) {
  const { showLogoutAlert } = useContext(AuthContext);

  return (
    <>
      <SuccessAlert
        alertMessage="Successfully logged out"
        showAlert={showLogoutAlert}
      />
      <Navigation />
      <main className="flex flex-col md:flex-row md:pl-18">{children}</main>
    </>
  );
}
