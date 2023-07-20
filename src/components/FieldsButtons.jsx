import { Button, useColorMode } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/language.context";
import { useContext } from "react";

function FieldsButtons() {
  const location = useLocation();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleClick = (fieldValue) => {
    navigate(`/home/${fieldValue}`);
  };

  const { t } = useContext(LanguageContext);

  const selectedButtonStyle = {
    background: colorMode === "light" ? "#356670" : "white",
    color: colorMode === "light" ? "white" : "black",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const unselectedButtonStyle = {
    background: colorMode === "light" ? "white" : "#2D3748",
    color: colorMode === "light" ? "black" : "white",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  };

  return (
    t?.buttons && (
      <div className="buttons-container">
        <div>
          <Button
            style={
              location.pathname === "/home/tours"
                ? selectedButtonStyle
                : unselectedButtonStyle
            }
            onClick={() => handleClick("tours")}
          >
            {t?.buttons.tours || "Tours"}
          </Button>
        </div>
        <div>
          <Button
            style={
              location.pathname === "/home/museum"
                ? selectedButtonStyle
                : unselectedButtonStyle
            }
            onClick={() => handleClick("museums")}
          >
            {t?.buttons.museum || "Museum"}
          </Button>
        </div>
        <div>
          <Button
            style={
              location.pathname === "/home/artists"
                ? selectedButtonStyle
                : unselectedButtonStyle
            }
            onClick={() => handleClick("artists")}
          >
            {t?.buttons.artists || "Artists"}
          </Button>
        </div>
        <div>
          <Button
            style={
              location.pathname === "/home/artworks"
                ? selectedButtonStyle
                : unselectedButtonStyle
            }
            onClick={() => handleClick("artworks")}
          >
            {t?.buttons.artworks || "Artworks"}
          </Button>
        </div>
      </div>
    )
  );
}

export default FieldsButtons;
