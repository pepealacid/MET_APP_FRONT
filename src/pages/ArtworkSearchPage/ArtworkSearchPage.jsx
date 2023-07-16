import { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";
import { Link } from "react-router-dom";
import FieldsButtons from "../../components/FieldsButtons";
import ArtworksSearchBar from "../../components/ArtworksSearchBar";
import { TOKEN_NAME } from "../../context/auth.context";
import authService from "../../services/auth.service";
import favoriteService from "../../services/favorite.service";
import ArtworkRecommendations from "../../components/Recommendations/ArtworkRecommendations/ArtworkRecommendations";

const ArtworkSearchPage = () => {
  const [results, setResults] = useState([]);
  const [favoriteArtworkIds, setFavoriteArtworkIds] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await authService.getUser(token);
      const userId = response.data._id;

      favoriteService
        .getFavoriteArtworks(userId)
        .then((response) => {
          const favoriteArtworkIds = response.data;
          setFavoriteArtworkIds(favoriteArtworkIds);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateResults = (searchResults) => {
    setResults(searchResults);
  };

  const favArtwork = async (artworkID) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await authService.getUser(token);
      const userId = response.data._id;

      const promiseFavorites = await favoriteService.getFavoriteArtworks(
        userId
      );
      const favorites = promiseFavorites.data || []; // Get the artworksSaved array

      // Check if artworkID is present in favorites
      const index = favorites.indexOf(artworkID);
      if (index > -1) {
        // If artworkID exists, remove it from the array
        favorites.splice(index, 1);
      } else {
        // If artworkID doesn't exist, add it to the array
        favorites.push(artworkID);
      }

      // Update the user's favorites on the backend
      await favoriteService.updateFavoriteArtworks({ id: userId, artworkID });

      // Fetch the updated favorites from the backend
      const updatedFavoritesResponse =
        await favoriteService.getFavoriteArtworks(userId);
      const updatedFavorites = updatedFavoritesResponse.data || [];

      // Update the favoriteArtworkIds state to trigger re-render
      setFavoriteArtworkIds(updatedFavorites);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ArtworksSearchBar updateResults={updateResults} />
      <FieldsButtons />
      {results.length > 0 ? (
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {results.map(
            (result) =>
              result.id !== null && (
                <GridItem key={result.id}>
                  <Link
                    to={`/artwork/${result.objectID}`}
                    style={{ textDecoration: "none", cursor: "pointer" }}
                  >
                    <ArtworkCard
                      imageUrl={result.primaryImageSmall || result.primaryImage}
                      title={result.title}
                      author={result.artistDisplayName}
                      date={result.objectEndDate || result.objectBeginDate}
                      artworkID={result.objectID}
                      favoriteArtworkIds={favoriteArtworkIds}
                      favArtwork={favArtwork}
                      fetchFavorites={fetchFavorites}
                    />
                  </Link>
                </GridItem>
              )
          )}
        </Grid>
      ) : (
        <ArtworkRecommendations
          favoriteArtworkIds={favoriteArtworkIds}
          favArtwork={favArtwork}
          fetchFavorites={fetchFavorites}
        />
      )}
    </div>
  );
};

export default ArtworkSearchPage;
