import apiInstance from "./apiInstance.js";

class FavoriteService {
  constructor() {
    this.api = apiInstance;
  }

  update({id, data}) {
    return this.api.put(`/user/${id}/${data}`);
  }
}

const favoriteService = new FavoriteService();

export default favoriteService;
