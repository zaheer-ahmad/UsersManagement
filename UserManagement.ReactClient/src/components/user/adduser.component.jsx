import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { UserModel } from "../../models/user.model";
import { useNavigate } from "react-router-dom";
import { insertUser, userAction } from "../../store/user.slice";
import { useForm } from "react-hook-form";

function AddUser() {
  const {
    register,
    handleSubmit,
    formState: {
      touchedFields,
      isDirty,
      isValid,
      dirtyFields,
      isSubmitted,
      errors,
    },
    watch,
  } = useForm();
  // const onSubmit = (data) => console.log(data);
  const status = useSelector((state) => state.users.status);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAction.resetStatus());
  }, [dispatch]);

  // const [formData, setFormData] = useState({
  //   name: "",
  //   username: "",
  //   email: "",
  //   role: "",
  // });

  //Handle form submission
  const onSubmit = (formData) => {
    // Dispatch submitForm action with form data
    const userService = new UserService();
    const authService = new AuthService();
    var user = new UserModel(
      formData.username,
      formData.name,
      formData.email,
      formData.role,
      authService.getUserName()
    );
    dispatch(insertUser({ user, userService }));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (status == "succeededAdd") {
      navigate("/");
    }
  }, [status]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              {status == "loading" && <p>....Loading</p>}
              {status == "failed" && <p>An error occurred</p>}
              {status == null && (
                <div>
                  <h5 className="card-title text-center">New User</h5>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className={
                          errors.name
                            ? "form-control error-field"
                            : "form-control"
                        }
                        {...register("name", { required: true, maxLength: 50 })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        User Name
                      </label>
                      <input
                        type="text"
                        className={
                          errors.username
                            ? "form-control error-field"
                            : "form-control"
                        }
                        {...register("username", {
                          required: true,
                          maxLength: 50,
                        })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className={
                          errors.email
                            ? "form-control error-field"
                            : "form-control"
                        }
                        {...register("email", {
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Role" className="form-label">
                        Role
                      </label>
                      <select
                        className={
                          errors.role
                            ? "form-control error-field"
                            : "form-control"
                        }
                        {...register("role", { required: true })}
                      >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddUser;
