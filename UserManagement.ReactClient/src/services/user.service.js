import axiosInstance from "../axiosConfig";
import conf from "../conf/conf";

export class UserService {
  async getUsers(dataTablesParameters) {
    return await axiosInstance.post(conf.getUsersUrl, dataTablesParameters);
  }

  async addUser(userObj) {
    return await axiosInstance.post(
      `${conf.baseUrl}${conf.addUserUrl}`,
      userObj
    );
  }
  async getUser(id) {
    return await axiosInstance.get(`${conf.baseUrl}${conf.getUserUrl}` + id);
  }
  async updateUser(userObj) {
    return await axiosInstance.post(
      `${conf.baseUrl}${conf.updateUserUrl}`,
      userObj
    );
  }
  async deleteUser(id) {
    return await axiosInstance.get(`${conf.baseUrl}${conf.deleteUserUrl}` + id);
  }
}
