import SandClock from "../../assets/images/SandClock.svg";
import FavHeart from "../../assets/images/FavHeart.svg";
import PropTypes from "prop-types";
import FavHeartFilled from "../../assets/images/FavHeartFilled.svg";
import { useContext } from "react";
import { FavContext } from "../../context/fav.context";
import "./ArtworkCard.css";
import {
  Box,
  Image,
  Button,
  Text,
  Flex,
  Stack,
} from "@chakra-ui/react";

const ArtworkCard = ({ context, imageUrl, title, author, date, artworkID }) => {
  const cardStyles =
    context === "recommendation" ? "recommendation" : "search-result";

  const { favoriteArtworkIds, addFavoriteArtwork, removeFavoriteArtwork } =
    useContext(FavContext);
  const truncatedTitle =
    title.length > 18 ? `${title.substring(0, 18)}...` : title;
  const truncatedAuthor =
    author.length > 30 ? `${author.substring(0, 30)}...` : author;

  const handleFavClick = (event) => {
    event.preventDefault();
    if (favoriteArtworkIds.includes(artworkID.toString())) {
      removeFavoriteArtwork(artworkID.toString());
    } else {
      addFavoriteArtwork(artworkID.toString());
    }
  };

  return (
    <div className={cardStyles}>
      <div className="artwork-card">
        <div className="top">
          <div className="img-container">
            <img className="main-img" src={imageUrl} alt="artwork" />
            <button className="fav-button" onClick={handleFavClick}>
              {favoriteArtworkIds.includes(artworkID.toString()) ? (
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
          <h3 className="title">{truncatedTitle}</h3>
          <p className="author">{truncatedAuthor}</p>
          <div className="date">
            <img className="clock" src={SandClock} alt="year" />
            <p style={{marginTop : "4px"}}>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ArtworkCard.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  date: PropTypes.number,
  artworkID: PropTypes.string.isRequired,
  context: PropTypes.string,
};

export default ArtworkCard;
