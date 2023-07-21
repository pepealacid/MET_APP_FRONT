import ArtistsSearchBar from "../../components/ArtistsSearchBar";
import { useState, useEffect, useContext } from "react";
import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import { Link } from "react-router-dom";
import FieldsButtons from "../../components/FieldsButtons";
import { TOKEN_NAME } from "../../context/auth.context";
import favoriteService from "../../services/favorite.service";
import ArtistRecommendations from "../../components/Recommendations/ArtistRecommendations/ArtistRecommendations";
import "./ArtistSearchPage.css";
import userService from "../../services/user.service";
import { LanguageContext } from "../../context/language.context";

const ArtistSearchPage = () => {
  const [results, setResults] = useState([]);
  const [favoriteArtistIds, setFavoriteArtistIds] = useState([]);
  const [query, setQuery] = useState("");

  const { t } = useContext(LanguageContext);

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
      const favorites = promiseFavorites.data || [];

      const index = favorites.indexOf(artistID);
      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(artistID);
      }

      await favoriteService.updateFavoriteArtists({ id: userId, artistID });
      const updatedFavoritesResponse = await favoriteService.getFavoriteArtists(
        userId
      );
      const updatedFavorites = updatedFavoritesResponse.data || [];
      setFavoriteArtistIds(updatedFavorites);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    t?.artistSearchPage && (
      <div>
        <ArtistsSearchBar updateResults={updateResults} setQuery={setQuery} />
        <FieldsButtons />
        {results.length === 0 ? (
          <ArtistRecommendations
            favoriteArtistIds={favoriteArtistIds}
            favArtist={favArtist}
            fetchFavorites={fetchFavorites}
          />
        ) : (
          <Box>
            <Text className="recomm-header" padding="20px">
              {t?.artistSearchPage.results || "Results for"} "{query}"
            </Text>
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
                          context="search-result"
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
          </Box>
        )}
      </div>
    )
  );
};

export default ArtistSearchPage;
