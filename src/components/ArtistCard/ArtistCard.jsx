import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import "./ArtistCard.css";
import FavHeart from "../../assets/images/FavHeart.svg";
import FavHeartFilled from "../../assets/images/FavHeartFilled.svg";
import SandClock from "../../assets/images/SandClock.svg";
import { FavContext } from "../../context/fav.context";

const ArtistCard = ({
  context,
  imageUrl,
  title,
  birthday,
  deathday,
  artistID,
}) => {
  const cardStyles =
    context === "recommendation" ? "recommendation" : "search-result";

  const { favoriteArtistIds, addFavoriteArtist, removeFavoriteArtist } =
    useContext(FavContext);

  const [favorites, setFavorites] = useState([]);
  const truncatedTitle =
    title.length > 18 ? `${title.substring(0, 18)}...` : title;

  useEffect(() => {
    setFavorites(favoriteArtistIds);
  }, [favoriteArtistIds]);

  const handleFavClick = (event) => {
    event.preventDefault();
    if (favoriteArtistIds.includes(artistID.toString())) {
      removeFavoriteArtist(artistID.toString());
    } else {
      addFavoriteArtist(artistID.toString());
    }
  };

  return (
    <div className={cardStyles}>
      <div className="artist-card">
        <div className="top">
          <div>
            {imageUrl ? (
              <img
                className="artist-image"
                src={imageUrl}
                alt={"image " + title}
              />
            ) : (
              <img
                className="artist-image"
                src="https://drawinghowtos.com/wp-content/uploads/2022/07/painter-colored.jpg"
                alt="artist"
              />
            )}
          </div>
          <div>
            <p>{truncatedTitle}</p>
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

        {birthday && deathday && (
          <div className="foot">
            <img className="clock" src={SandClock} alt="year" />
            <p>
              {birthday}-{deathday}
            </p>
          </div>
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
  artistID: PropTypes.string.isRequired,
  context: PropTypes.string,
};

export default ArtistCard;
