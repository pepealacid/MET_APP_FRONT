import apiInstance from "./apiInstance.js";

class UserService {
  constructor() {
    this.api = apiInstance;
  }

  edit(id, data) {
    return this.api.put(`/user/edit-user/${id}`, data);
  }

  getUser(token) {
    return this.api.get("/user/get-user", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteUser(id) {
    return this.api.delete(`/user/${id}`);
  }

  changeFirstTime(id) {
    return this.api.put(`/user/change-first-time/${id}`);
  }
}

const userService = new UserService();

export default userService;
