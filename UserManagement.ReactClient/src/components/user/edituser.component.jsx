import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../store/user.slice";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../models/user.model";
import { useForm } from "react-hook-form";

function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { status, userListObj } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    reset,
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

  // Handle form submission
  const editUserForm = (formData) => {
    //e.preventDefault();
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
    dispatch(updateUser({ user, userService }));
  };

  useEffect(() => {
    if (userListObj.data != null) {
      const userObj = userListObj.data.filter((user) => user.id == id)[0];
      if (userObj != null) {
        reset({
          name: userObj.name,
          username: userObj.username,
          email: userObj.email,
          role: userObj.role,
        });
      }
    }
  }, [userListObj]);
  const navigate = useNavigate();
  useEffect(() => {
    if (status == "succeededEdit") {
      navigate("/");
    }
  }, [status]);

  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card mt-5">
              <div class="card-body">
                <h5 class="card-title text-center">Edit User</h5>
                <form onSubmit={handleSubmit(editUserForm)}>
                  <div class="mb-3">
                    <label for="name" class="form-label">
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
                  <div class="mb-3">
                    <label for="username" class="form-label">
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
                  <div class="mb-3">
                    <label for="email" class="form-label">
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
                  <div class="mb-3">
                    <label for="Role" class="form-label">
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
                  <button type="submit" class="btn btn-primary w-100">
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

export default EditUser;
