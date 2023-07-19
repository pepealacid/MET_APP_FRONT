import "./ArtistCard.css";

const ArtistCardLittle = ({ image, name }) => {
  const defaultImage = "https://drawinghowtos.com/wp-content/uploads/2022/07/painter-colored.jpg";

  const renderImage = image || defaultImage;

  return (
    <div className="little-artist-card">
      <img className="image" src={renderImage} alt="image" />
      <p className="name">{name}</p>
    </div>
  );
};

export default ArtistCardLittle;
