const conf = {
  baseUrl: String(import.meta.env.VITE_BASE_URL),
  loginUrl: String(import.meta.env.VITE_LOGIN_URL),
  getUsersUrl: String(import.meta.env.VITE_GETUSERS_URL),
  addUserUrl: String(import.meta.env.VITE_ADDUSER_URL),
  getUserUrl: String(import.meta.env.VITE_GETUSER_URL),
  updateUserUrl: String(import.meta.env.VITE_UPDATEUSER_URL),
  deleteUserUrl: String(import.meta.env.VITE_DELETEUSER_URL),
};

export default conf;
