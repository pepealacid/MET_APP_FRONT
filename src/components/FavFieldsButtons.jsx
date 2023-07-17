import { Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

function FavFieldsButtons() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (fieldValue) => {
    navigate(`/favorites/${fieldValue}`);
  };

  return (
    <div className="buttons-container">
      <div>
        <Button
          className={
            location.pathname === "/favorites/tours"
              ? "selected-field-button"
              : "field-button"
          }
          onClick={() => handleClick("tours")}
        >
          Tours
        </Button>
      </div>

      <div>
        <Button
          className={
            location.pathname === "/favorites/artists"
              ? "selected-field-button"
              : "field-button"
          }
          onClick={() => handleClick("artists")}
        >
          Artists
        </Button>
      </div>
      <div>
        <Button
          className={
            location.pathname === "/favorites/artworks"
              ? "selected-field-button"
              : "field-button"
          }
          onClick={() => handleClick("artworks")}
        >
          Artworks
        </Button>
      </div>
    </div>
  );
}

export default FavFieldsButtons;
