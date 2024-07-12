import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ params, userService }) => {
    const userList = await userService.getUsers(params);
    return userList.data;
  }
);
export const insertUser = createAsyncThunk(
  "users/insertUser",
  async ({ user, userService }) => {
    const response = await userService.addUser(user);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ user, userService }) => {
    const response = await userService.updateUser(user);
    return response.data;
  }
);
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id, userService }) => {
    const response = await userService.deleteUser(id);
    return response.data;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: { userListObj: {}, userObj: {}, status: null, error: null },
  reducers: {
    resetStatus(state) {
      state.status = null;
    },
    updateUserList(state, action) {
      state.userListObj = action.payload;
    },
  },
  extraReducers: (builder) => {
    addListCases(builder);
    addInsertCases(builder);
    addUpdateCases(builder);
    addDeleteCases(builder);
  },
});

function addListCases(builder) {
  builder
    .addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.userList = payload;
      state.status = "succeeded";
    })
    .addCase(fetchUsers.rejected, (state) => {
      state.status = "failed";
    });
}
function addInsertCases(builder) {
  builder
    .addCase(insertUser.fulfilled, (state, action) => {
      state.status = "succeededAdd";
    })
    .addCase(insertUser.rejected, (state) => {
      state.status = "failed";
    });
}
function addUpdateCases(builder) {
  builder
    .addCase(updateUser.fulfilled, (state, action) => {
      state.status = "succeededEdit";
    })
    .addCase(updateUser.rejected, (state) => {
      state.status = "failed";
    });
}
function addDeleteCases(builder) {
  builder
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.status = "succeededDelete";
    })
    .addCase(deleteUser.rejected, (state) => {
      state.status = "failed";
    });
}
export const userAction = userSlice.actions;

const userStore = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});

export default userStore;
