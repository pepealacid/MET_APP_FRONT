import apiInstance from "./apiInstance.js";

class FavoriteService {
  constructor() {
    this.api = apiInstance;
  }

  addFavorite({ id, data }) {
    return this.api.put(`/user/addfav/${id}/${data}`);
  }

  deleteFavorite({ id, data }) {
    return this.api.put(`/user/deletefav/${id}/${data}`);
  }

  getFavorites(userId) {
    return this.api.get(`/user/favorites/${userId}`);
  }
}

const favoriteService = new FavoriteService();

export default favoriteService;
