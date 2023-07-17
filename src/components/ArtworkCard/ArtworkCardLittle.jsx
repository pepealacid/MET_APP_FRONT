import PropTypes from "prop-types";
import "./ArtworkCard.css";

const ArtworkCardLittle = ({ imageUrl, title }) => {
  const truncatedTitle =
    title.length > 18 ? `${title.substring(0, 18)}...` : title;

  return (
    <div className="little-artwork-card">
      <div className="top">
        <div className="img-container">
          <img className="main-img" src={imageUrl} alt="artwork" />
        </div>
      </div>
      <div className="foot">
        <h3 className="title">{truncatedTitle || "Unknown"}</h3>
      </div>
    </div>
  );
};

ArtworkCardLittle.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ArtworkCardLittle;
