import { Outlet } from "react-router-dom";
import Navigation from "./navbar/navbar.component";
import { AuthService } from "../services/auth.service";
import { Navigate, useLocation } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
export default Layout;
