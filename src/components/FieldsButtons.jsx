import { Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

function FieldsButtons() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (fieldValue) => {
    navigate(`/home/${fieldValue}`);
  };

  return (
    <div className="buttons-container">
      <div>
        <Button
          className={
            location.pathname === "/home/tours"
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
            location.pathname === "/home/museum"
              ? "selected-field-button"
              : "field-button"
          }
          onClick={() => handleClick("tours")}
        >
          Museum
        </Button>
      </div>
      <div>
        <Button
          className={
            location.pathname === "/home/artists"
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
            location.pathname === "/home/artworks"
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

export default FieldsButtons;
