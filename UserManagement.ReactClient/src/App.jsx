import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Login from "./components/login/login.component";
import NotFound from "./components/notfound.component";
import AddUser from "./components/user/adduser.component";
import Layout from "./components/layout.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css";
import UserList from "./components/user/userlist.component";
import EditUser from "./components/user/edituser.component";
import ProtectedRoute from "./util/protected-route";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<UserList />} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="edituser/:id" element={<EditUser />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
