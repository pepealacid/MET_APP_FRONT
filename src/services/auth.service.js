import apiInstance from "./apiInstance.js"

class AuthService {
  constructor() {
    this.api = apiInstance
  }

  signup(data) {
    return this.api.post("/auth/signup", data);
  }

  login(data) {
    return this.api.post(`/auth/login`, data);
  }

  verify(token) {
    return this.api.get(`/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getUser(token){
    return this.api.get("/user/get-user", {
      headers: { Authorization: `Bearer ${token}`}
    })
  }

  deleteUser(id){
    return this.api.delete(`/user/${id}`)
  }
}

const authService = new AuthService();

export default authService;