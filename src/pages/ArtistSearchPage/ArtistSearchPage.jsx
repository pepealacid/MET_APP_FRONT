import ArtistsSearchBar from "../../components/ArtistsSearchBar";
import { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import { Link } from "react-router-dom";
import FieldsButtons from "../../components/FieldsButtons";
import { TOKEN_NAME } from "../../context/auth.context";
import favoriteService from "../../services/favorite.service";
import ArtistRecommendations from "../../components/Recommendations/ArtistRecommendations/ArtistRecommendations";
import "./ArtistSearchPage.css";
import userService from "../../services/user.service";

const ArtistSearchPage = () => {
  const [results, setResults] = useState([]);
  const [favoriteArtistIds, setFavoriteArtistIds] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await userService.getUser(token);
      const userId = response.data._id;

      favoriteService
        .getFavoriteArtists(userId)
        .then((response) => {
          const favoriteArtistIds = response.data;
          setFavoriteArtistIds(favoriteArtistIds);
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

  const favArtist = async (artistID) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await userService.getUser(token);
      const userId = response.data._id;

      const promiseFavorites = await favoriteService.getFavoriteArtists(userId);
      const favorites = promiseFavorites.data || []; // Get the artworksSaved array

      // Check if artworkID is present in favorites
      const index = favorites.indexOf(artistID);
      if (index > -1) {
        // If artworkID exists, remove it from the array
        favorites.splice(index, 1);
      } else {
        // If artworkID doesn't exist, add it to the array
        favorites.push(artistID);
      }

      // Update the user's favorites on the backend
      await favoriteService.updateFavoriteArtists({ id: userId, artistID });

      // Fetch the updated favorites from the backend
      const updatedFavoritesResponse = await favoriteService.getFavoriteArtists(
        userId
      );
      const updatedFavorites = updatedFavoritesResponse.data || [];

      // Update the favoriteArtworkIds state to trigger re-render
      setFavoriteArtistIds(updatedFavorites);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ArtistsSearchBar updateResults={updateResults} />
      <FieldsButtons />
      {results.length === 0 ? (
        <ArtistRecommendations
          favoriteArtistIds={favoriteArtistIds}
          favArtist={favArtist}
          fetchFavorites={fetchFavorites}
        />
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {results.map(
            (result) =>
              result.id !== null && (
                <GridItem key={result.id}>
                  <Link
                    to={{
                      pathname: `/artist/${result.title}`,
                      search: `?url=${encodeURIComponent(
                        result._links.self.href
                      )}`,
                    }}
                    style={{ textDecoration: "none", cursor: "pointer" }}
                  >
                    <ArtistCard
                      imageUrl={result.imageUrl}
                      title={result.title}
                      birthday={result.birthday}
                      deathday={result.deathday}
                      artistID={result.id}
                    />
                  </Link>
                </GridItem>
              )
          )}
        </Grid>
      )}
    </div>
  );
};

export default ArtistSearchPage;
