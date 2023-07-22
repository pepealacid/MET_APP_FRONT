import { Image, Text, Button } from "@chakra-ui/react";
import MetImage from "../../assets/images/METPicture.jpeg";
import LocationImage from "../../assets/images/Location.svg";
import { Link } from "react-router-dom";
import "./MuseumCard.css";
import { useContext } from "react";
import { LanguageContext } from "../../context/language.context";
import MapsIcon from "../../assets/images/Maps.svg";

const MuseumCard = () => {
  const { t } = useContext(LanguageContext);

  return (
    t?.artworkDetails && (
      <div className="museum-card">
        <Image className="main-image" src={MetImage} alt="MET Museum" />
        <Text className="museum-name">Metropolitan Museum of Art</Text>
        <div className="location">
          <Image className="location-icon" src={LocationImage} alt="location" />
          <Text className="city">New York</Text>
        </div>
        <Link to="https://goo.gl/maps/tnjZzz8u9swcxsgh7" target="_blank">
          <Button bg={"black"}>
            <Image marginRight="10px" src={MapsIcon} />
            <Text color={"white"}>{t?.artworkDetails.open || "Open in maps"}</Text>
          </Button>
        </Link>
      </div>
    )
  );
};

export default MuseumCard;
