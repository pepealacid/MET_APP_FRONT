import { Image, Text, Button } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import FavFieldsButtons from "../../components/FavFieldsButtons";
import FavoritesHeader from "../../assets/images/FavoritesHeader.svg";
import "./Favorites.css"
import GoBackButton from "../../assets/images/GoBackButton.png"

const Favorites = () => {

  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <>
      <Button
        bg="transparent"
        className="goback-button"
        onClick={handleGoBack}
        justifyContent="flex-start"
        top="20px"
        left="10px"
        marginBottom="30px"
      >
        <Image src={GoBackButton} alt="Go Back" />
      </Button>

      <Image className="fav-header" src={FavoritesHeader} alt="Favorites" />
      <Text className="fav-title">Favorites</Text>
      <FavFieldsButtons />
      <Outlet />
    </>
  );
};

export default Favorites;
