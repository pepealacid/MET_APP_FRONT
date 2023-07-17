import FavFieldsButtons from "../FavFieldsButtons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Box, Table, Tbody, Tr, Td, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TOKEN_NAME } from "../../context/auth.context";
import authService from "../../services/auth.service";
import ArtworkCard from "../ArtworkCard/ArtworkCard";
import favoriteService from "../../services/favorite.service";

const ArtworksFavorites = () => {
  const [favoriteArtworkIds, setFavoriteArtworkIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const result = await authService.getUser(token);
      const userId = result.data._id;

      const response = await favoriteService.getFavoriteArtworks(userId);
      const favoriteArtworkIds = response.data;

      const artworkPromises = favoriteArtworkIds.map(async (objectID) => {
        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
        return response.data;
      });

      const artworks = await Promise.all(artworkPromises);

      setFavoriteArtworkIds(artworks);
    } catch (error) {
      console.error("Error fetching favorite artworks:", error);
    } finally {
      setLoading(false);
    }
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
      <Text className="recomm-header">Artworks Favorites</Text>
      <FavFieldsButtons />
      {loading ? (
        <Spinner />
      ) : (
        <Box
          position="relative"
          mt={2}
          overflowX="auto"
          maxHeight="600px"
          whiteSpace="nowrap"
        >
          <Table size="sm">
            <Tbody>
              <Tr>
                {favoriteArtworkIds
                  .slice(0, Math.ceil(favoriteArtworkIds.length / 2))
                  .map((artwork) => (
                    <Td key={artwork.id} px={2}>
                      <Link
                        to={`/artwork/${artwork.objectID}`}
                        style={{ textDecoration: "none", cursor: "pointer" }}
                      >
                        <ArtworkCard
                          imageUrl={
                            artwork.primaryImageSmall || artwork.primaryImage
                          }
                          title={artwork.title}
                          author={artwork.artistDisplayName}
                          date={
                            artwork.objectEndDate || artwork.objectBeginDate
                          }
                          artworkID={artwork.objectID}
                          favoriteArtworkIds={favoriteArtworkIds}
                          favArtwork={favArtwork}
                          fetchFavorites={fetchFavorites}
                        />
                      </Link>
                    </Td>
                  ))}
              </Tr>
              <Tr>
                {favoriteArtworkIds
                  .slice(Math.ceil(favoriteArtworkIds.length / 2))
                  .map((artwork) => (
                    <Td key={artwork.id} px={2}>
                      <Link
                        to={`/artwork/${artwork.objectID}`}
                        style={{ textDecoration: "none", cursor: "pointer" }}
                      >
                        <ArtworkCard
                          imageUrl={
                            artwork.primaryImageSmall || artwork.primaryImage
                          }
                          title={artwork.title}
                          author={artwork.artistDisplayName}
                          date={
                            artwork.objectEndDate || artwork.objectBeginDate
                          }
                          artworkID={artwork.objectID}
                          favoriteArtworkIds={favoriteArtworkIds}
                          favArtwork={favArtwork}
                          fetchFavorites={fetchFavorites}
                        />
                      </Link>
                    </Td>
                  ))}
              </Tr>
            </Tbody>
          </Table>
        </Box>
      )}
    </div>
  );
};

export default ArtworksFavorites;
