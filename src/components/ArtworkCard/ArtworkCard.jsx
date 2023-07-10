import "./ArtworkCard.css";
import SandClock from "../../assets/images/SandClock.png"

const ArtworkCard = ({ imageUrl, title, author, date }) => {
  return (
    <div className="artwork-card">
      <div className="top">
        <img className="main-img" src={imageUrl} />
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
