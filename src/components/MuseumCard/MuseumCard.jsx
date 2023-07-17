import { Image, Text } from "@chakra-ui/react";
import MetImage from "../../assets/images/METPicture.jpeg";
import LocationImage from "../../assets/images/Location.png";
import MapsButton from "../../assets/images/MapsButton.png";
import { Link } from "react-router-dom";
import "./MuseumCard.css"

const MuseumCard = () => {
  return (
    <div className="museum-card">
      <Image className="main-image" src={MetImage} alt="MET Museum" />
      <Text className="museum-name">Metropolitan Museum of Art</Text>
      <div className="location">
        <Image className="location-icon" src={LocationImage} alt="location" />
        <Text className="city">New York</Text>
      </div>
      <Link to="https://goo.gl/maps/tnjZzz8u9swcxsgh7" target="_blank">
        <Image className="map-button" src={MapsButton} alt="See in Maps" />
      </Link>
    </div>
  );
};

export default MuseumCard;
