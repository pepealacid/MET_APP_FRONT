import "./ArtistCard.css"

const ArtistCard = ({ imageUrl, title, birthday, deathday }) => {
  return (
    <div className="artist-card">
      <div className="top">
        <img src={imageUrl || "https://drawinghowtos.com/wp-content/uploads/2022/07/painter-colored.jpg"} alt={"image " + { title }} />
        <p>{title}</p>
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

export default ArtistCard;
