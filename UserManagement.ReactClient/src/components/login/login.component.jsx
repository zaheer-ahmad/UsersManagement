import { AuthService } from "../../services/auth.service";
import { LoginModel } from "../../models/LoginModel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({
    username: "",
    password: "",
  });
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const authService = new AuthService();
      var response = await authService.login(
        new LoginModel(loginData.username, loginData.password)
      );
      if (response.data.token) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title text-center">Login</h5>
                <form onSubmit={onSubmitLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      id="username"
                      value={loginData.userName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      value={loginData.password}
                      onChange={handleChange}
                      required
                    />
                    {/* <div className="alert alert-danger" *ngIf="formError != ''">{{formError}}</div> */}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
