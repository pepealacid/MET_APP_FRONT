import { FavContext } from "../../context/fav.context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Grid, Spinner } from "@chakra-ui/react";
import ArtworkCardLittle from "../ArtworkCard/ArtworkCardLittle";
import { Link } from "react-router-dom";

const ArtworksFavorites = () => {
  const { favoriteArtworkIds } = useContext(FavContext);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const requests = favoriteArtworkIds.map((id) =>
        axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        )
      );
      const responses = await Promise.all(requests);
      const favoriteArtworks = responses.map((response) => response.data);
      setFavorites(favoriteArtworks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        paddingTop={"40px"}
        marginLeft={"10px"}
      >
        {favorites.map((artwork) => (
          <Link key={artwork.objectID} to={`/artwork/${artwork.objectID}`}>
            <ArtworkCardLittle
              title={artwork.title}
              imageUrl={artwork.primaryImageSmall || artwork.primaryImage}
            />
          </Link>
        ))}
      </Grid>
    </>
  );
};

export default ArtworksFavorites;
