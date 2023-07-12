import { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";
import { Link } from "react-router-dom";
import FieldsButtons from "../components/FieldsButtons";
import ArtworksSearchBar from "../components/ArtworksSearchBar";
import { TOKEN_NAME } from "../context/auth.context";
import authService from "../services/auth.service";
import favoriteService from "../services/favorite.service";

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
        .getFavorites(userId)
        .then((response) => {
          const favoriteArtworkIds = response.data.map(
            (favorite) => favorite.data
          );
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
    console.log(results);
  };

  const favArtwork = async (artworkID) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await authService.getUser(token);
      const userId = response.data._id;

      favoriteService
        .update({ id: userId, data: artworkID })
        .then((response) => {
          console.log("good", response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ArtworksSearchBar updateResults={updateResults} />
      <FieldsButtons />
      {results.length > 0 && (
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
      )}
    </div>
  );
};

export default ArtworkSearchPage;
