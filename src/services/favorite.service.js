import apiInstance from "./apiInstance.js";

class FavoriteService {
  constructor() {
    this.api = apiInstance;
  }
  getFavoriteArtworks(userId) {
    return this.api.get(`/user/artworks/favorites/${userId}`);
  }

  updateFavoriteArtworks({ id, artworkID }) {
    return this.api.put(`/user/artworks/update-favorites/${id}/${artworkID}`);
  }

  getFavoriteArtists(userId) {
    return this.api.get(`/user/artists/favorites/${userId}`);
  }

  updateFavoriteArtists({ id, artistID }) {
    return this.api.put(`/user/artists/update-favorites/${id}${artistID}`);
  }
}

const favoriteService = new FavoriteService();

export default favoriteService;
