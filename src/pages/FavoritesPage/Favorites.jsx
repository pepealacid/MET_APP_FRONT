import { Image, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import FavFieldsButtons from "../../components/FavFieldsButtons";
import FavoritesHeader from "../../assets/images/FavoritesHeader.svg";
import "./Favorites.css"

const Favorites = () => {



  return (
    <>
      

      <Image className="fav-header" src={FavoritesHeader} alt="Favorites" />
      <Text className="fav-title">Favorites</Text>
      <FavFieldsButtons />
      <Outlet />
    </>
  );
};

export default Favorites;
