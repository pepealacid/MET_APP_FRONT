import PropTypes from "prop-types";
import "./ArtistCard.css";
import FavHeart from "../../assets/images/FavHeart.png";
import FavHeartFilled from "../../assets/images/FavHeartFilled.png";
import { useState, useEffect } from "react";

const ArtistCard = ({
  imageUrl,
  title,
  birthday,
  deathday,
  favArtist,
  artistID,
  favoriteArtistIds,
  fetchFavorites,
}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(favoriteArtistIds);
  }, [favoriteArtistIds]);

  const handleFavClick = (event) => {
    event.preventDefault();
    favArtist(artistID);
    fetchFavorites();
  };

  return (
    <div className="artist-card">
      <div className="top">
        <div>
          <img
            className="artist-image"
            src={
              imageUrl ||
              "https://drawinghowtos.com/wp-content/uploads/2022/07/painter-colored.jpg"
            }
            alt={"image " + title}
          />
        </div>
        <div>
          <p>{title}</p>
        </div>
        <div>
          <button className="fav-button" onClick={handleFavClick}>
            {favorites.includes(artistID) ? (
              <img
                className="fav-button-img"
                src={FavHeartFilled}
                alt="favorite"
              />
            ) : (
              <img
                className="fav-button-img"
                src={FavHeart}
                alt="not-favorite"
              />
            )}
          </button>
        </div>
      </div>
      <div className="foot">
        {birthday && deathday && (
          <p>
            {birthday}-{deathday}
          </p>
        )}
      </div>
    </div>
  );
};

ArtistCard.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  birthday: PropTypes.string,
  deathday: PropTypes.string,
  favArtist: PropTypes.func.isRequired,
  artistID: PropTypes.string.isRequired,
  favoriteArtistIds: PropTypes.array.isRequired,
  fetchFavorites: PropTypes.func.isRequired,
};

export default ArtistCard;
