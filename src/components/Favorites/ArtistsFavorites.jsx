import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ArtistCardLittle from "../ArtistCard/ArtistCardLittle";
import "./ListingFavorites.css";
import { TOKEN_NAME } from "../../context/auth.context";
import userService from "../../services/user.service";
import favoriteService from "../../services/favorite.service";
import NoElementsFound from "./NoElementsFound";
import { LanguageContext } from "../../context/language.context";

const ArtistsFavorites = () => {
  const [favoriteArtistIds, setFavoriteArtistIds] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useContext(LanguageContext);

  useEffect(() => {
    getFavoriteArtists();
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [favoriteArtistIds]);

  const getFavoriteArtists = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      setIsLoading(true);

      const response = await userService.getUser(token);
      const userId = response.data._id;

      const favoriteArtistsResponse = await favoriteService.getFavoriteArtists(
        userId
      );
      const favoriteArtistIds = favoriteArtistsResponse.data;
      setFavoriteArtistIds(favoriteArtistIds);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const finalArtists = [];
      const requests = favoriteArtistIds.map((id) =>
        axios.get(`https://api.artsy.net/api/artists/${id}`, {
          headers: {
            "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
          },
        })
      );
      const responses = await Promise.all(requests);
      const favoriteArtists = responses.map((response) => response.data);
      for (const artist of favoriteArtists) {
        if (artist._links.image.href && artist._links.image.href !== "") {
          const firstLink = artist._links.image.href;
          const image_version = artist.image_versions[0];
          const finalLink = firstLink.replace("{image_version}", image_version);
          finalArtists.push({ ...artist, image: finalLink });
        } else {
          finalArtists.push({
            ...artist,
            image:
              "https://drawinghowtos.com/wp-content/uploads/2022/07/painter-colored.jpg",
          });
        }
      }
      setFavorites(finalArtists);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    t?.tours && (
      <>
        {favorites && favorites.length ? (
          <div className="artist-card-container">
            {favorites.map((artist) => (
              <Link
                key={artist.id}
                to={{
                  pathname: `/artist/${artist.title}`,
                  search: `?url=${encodeURIComponent(artist._links.self.href)}`,
                }}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <ArtistCardLittle image={artist.image} name={artist.name} />
              </Link>
            ))}
          </div>
        ) : (
          <NoElementsFound exploreIn="/home/artists" field={t?.tours.artists || "artists"} />
        )}
      </>
    )
  );
};

export default ArtistsFavorites;
