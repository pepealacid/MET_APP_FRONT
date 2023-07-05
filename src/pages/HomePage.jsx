import SearchBar from "../components/SearchBar";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {
    const { logout } = useContext(AuthContext)
  return (
    <>
      <SearchBar />
      <butto onClick={logout}>Logout</butto>
    </>
  );
}

export default HomePage;
