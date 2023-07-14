import "./ArtworkCard.css";
import SandClock from "../../assets/images/SandClock.png";
import FavHeart from "../../assets/images/FavHeart.png";
import FavHeartFilled from "../../assets/images/FavHeartFilled.png";
import { useState, useEffect } from "react";

const ArtworkCard = ({
  imageUrl,
  title,
  author,
  date,
  favArtwork,
  artworkID,
  favoriteArtworkIds,
  fetchFavorites,
}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(favoriteArtworkIds);
  }, [favoriteArtworkIds]);

  const handleFavClick = (event) => {
    event.preventDefault();
    favArtwork(artworkID);
    fetchFavorites();
  };

  return (
    <div className="artwork-card">
      <div className="top">
        <div className="img-container">
          <img className="main-img" src={imageUrl} alt="artwork" />
          <button className="fav-button" onClick={handleFavClick}>
            {favorites.includes(artworkID.toString()) ? (
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
        <h3>{title}</h3>
        <p>{author}</p>
        <div className="date">
          <img className="clock" src={SandClock} alt="year" />
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
