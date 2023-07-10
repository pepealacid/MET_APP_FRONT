import SearchBar from "../components/SearchBar";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import FieldsButtons from "../components/FieldsButtons";
import { Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ArtistsSearchBar from "../components/ArtistsSearchBar";
import ArtworksSearchBar from "../components/ArtworksLiveSearchBar";

function HomePage() {
  const { logout } = useContext(AuthContext);
  const { field } = useParams();

  return (
    <>
      {/* <SearchBar /> */}
      {field === "artists" && <ArtistsSearchBar />}
      {field === "artworks" && <ArtworksSearchBar />}
      <Button onClick={logout}>Logout</Button>
      <FieldsButtons />
    </>
  );
}

export default HomePage;
