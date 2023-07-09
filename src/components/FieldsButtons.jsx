import { Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

function FieldsButtons() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (fieldValue) => {
    navigate(`/home/${fieldValue}`);
  };

  return (
    <div>
      <Button
        colorScheme={location.pathname === "/home/tours" ? "blue" : undefined}
        onClick={() => handleClick("tours")}
      >
        Tours
      </Button>

      <Button
        colorScheme={location.pathname === "/home/artists" ? "blue" : undefined}
        onClick={() => handleClick("artists")}
      >
        Artists
      </Button>

      <Button
        colorScheme={location.pathname === "/home/artworks" ? "blue" : undefined}
        onClick={() => handleClick("artworks")}
      >
        Artworks
      </Button>
    </div>
  );
}

export default FieldsButtons;
