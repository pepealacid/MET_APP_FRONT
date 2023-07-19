import { createContext, useEffect, useState } from "react";
import favoriteService from "../services/favorite.service";
import userService from "../services/user.service";
import { TOKEN_NAME } from "./auth.context";

export const FavContext = createContext();

export const FavContextWrapper = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [favoriteArtworkIds, setFavoriteArtworkIds] = useState([]);
  const [favoriteArtistIds, setFavoriteArtistIds] = useState([]);

  useEffect(() => {
    getFavoriteArtworks();
    getFavoriteArtists();
  }, []);

  const getFavoriteArtworks = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      setLoading(true);

      const response = await userService.getUser(token);
      const userId = response.data._id;

      const favoriteArtworksResponse =
        await favoriteService.getFavoriteArtworks(userId);
      const favoriteArtworkIds = favoriteArtworksResponse.data;

      setFavoriteArtworkIds(favoriteArtworkIds);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetFavorites = () => {
    setFavoriteArtworkIds([]);
    setFavoriteArtistIds([]);
    setLoading(true);
    setError(null);
  };
  

  const getFavoriteArtists = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      setLoading(true);

      const response = await userService.getUser(token);
      const userId = response.data._id;

      const favoriteArtistsResponse = await favoriteService.getFavoriteArtists(
        userId
      );
      const favoriteArtistIds = favoriteArtistsResponse.data;
      setFavoriteArtistIds(favoriteArtistIds);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFavoriteArtistIds = async (token) => {
    setLoading(true);
    try {
      const response = await userService.getUser(token);
      const userId = response.data._id;

      const favoriteArtistsResponse = await favoriteService.getFavoriteArtists(
        userId
      );
      const favoriteArtistIds = favoriteArtistsResponse.data;
      console.log(favoriteArtistIds);
      setFavoriteArtistIds(favoriteArtistIds);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFavoriteArtworkIds = async (token) => {
    setLoading(true);
    try {
      const response = await userService.getUser(token);
      const userId = response.data._id;

      const favoriteArtworksResponse =
        await favoriteService.getFavoriteArtworks(userId);
      const favoriteArtworkIds = favoriteArtworksResponse.data;
      console.log(favoriteArtworkIds);
      setFavoriteArtistIds(favoriteArtworkIds);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addFavoriteArtwork = async (artworkID) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await userService.getUser(token);
      const userId = response.data._id;

      await favoriteService.updateFavoriteArtworks({ id: userId, artworkID });
      setFavoriteArtworkIds((prevIds) => [...prevIds, artworkID]);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeFavoriteArtwork = async (artworkID) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await userService.getUser(token);
      const userId = response.data._id;

      await favoriteService.updateFavoriteArtworks({ id: userId, artworkID });
      setFavoriteArtworkIds((prevIds) =>
        prevIds.filter((id) => id !== artworkID)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const addFavoriteArtist = async (artistID) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await userService.getUser(token);
      const userId = response.data._id;

      await favoriteService.updateFavoriteArtists({ id: userId, artistID });
      setFavoriteArtistIds((prevIds) => [...prevIds, artistID]);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeFavoriteArtist = async (artistID) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await userService.getUser(token);
      const userId = response.data._id;

      await favoriteService.updateFavoriteArtists({ id: userId, artistID });
      setFavoriteArtistIds((prevIds) =>
        prevIds.filter((id) => id !== artistID)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <FavContext.Provider
      value={{
        loading,
        user,
        updateFavoriteArtistIds,
        updateFavoriteArtworkIds,
        getFavoriteArtworks,
        resetFavorites,
        getFavoriteArtists,
        favoriteArtworkIds,
        favoriteArtistIds,
        addFavoriteArtwork,
        removeFavoriteArtwork,
        addFavoriteArtist,
        removeFavoriteArtist,
        error,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};
