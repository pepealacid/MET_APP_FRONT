const ArtistCard = ({ image, name, movement, birthday, deathday }) => {
  return (
    <div className="artist-card">
      <div className="top">
        <img src={image} alt={"image " + { name }} />
        <p>{name}</p>
      </div>
      <div className="foot">
        <p>{movement}</p>
        <p>
          {birthday}-{deathday}
        </p>
      </div>
    </div>
  );
};

export default ArtistCard;
