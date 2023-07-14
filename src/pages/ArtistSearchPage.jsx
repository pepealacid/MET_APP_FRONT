import ArtistsSearchBar from "../components/ArtistsSearchBar";
import { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import ArtistCard from "../components/ArtistCard/ArtistCard";
import { Link } from "react-router-dom";
import FieldsButtons from "../components/FieldsButtons";
import { TOKEN_NAME } from "../context/auth.context";
import authService from "../services/auth.service";
import favoriteService from "../services/favorite.service";




const ArtistSearchPage = () => {
  const [results, setResults] = useState([]);
  const [favoriteArtistIds, setFavoriteArtistIds] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await authService.getUser(token);
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
      const response = await authService.getUser(token);
      const userId = response.data._id;

      const promiseFavorites = await favoriteService.getFavoriteArtists(artistID);
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
      await favoriteService.update({ id: userId, artistID });

      // Fetch the updated favorites from the backend
      const updatedFavoritesResponse = await favoriteService.getFavorites(
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
      {results.length > 0 && (
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
                      artworkID={result.id}
                      favoriteArtistIds={favoriteArtistIds}
                      favArtist={favArtist}
                      fetchFavorites={fetchFavorites}
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
