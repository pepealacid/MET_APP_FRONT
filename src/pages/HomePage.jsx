import SearchBar from "../components/SearchBar";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ExploreSearchBar from "../components/ExploreSearchBar";
import FieldsButtons from "../components/FieldsButtons";
import { Button } from "@chakra-ui/react";

function HomePage() {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <SearchBar />
      <ExploreSearchBar />
      <Button onClick={logout}>Logout</Button>
      <FieldsButtons />
    </>
  );
}

export default HomePage;
