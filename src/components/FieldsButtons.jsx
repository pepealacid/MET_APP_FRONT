import { Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

function FieldsButtons() {
  const { field } = useParams();
  const navigate = useNavigate();

  const handleClick = (fieldValue) => {
    navigate(`/home/${fieldValue}`);
  };

  return (
    <div>
      <Button
        colorScheme={field === "tours" ? "blue" : undefined}
        onClick={() => handleClick("tours")}
      >
        Tours
      </Button>

      <Button
        colorScheme={field === "artists" ? "blue" : undefined}
        onClick={() => handleClick("artists")}
      >
        Artists
      </Button>

      <Button
        colorScheme={field === "artworks" ? "blue" : undefined}
        onClick={() => handleClick("artworks")}
      >
        Artworks
      </Button>
    </div>
  );
}

export default FieldsButtons;
