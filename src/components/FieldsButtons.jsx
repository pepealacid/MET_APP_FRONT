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
        variant={field === "tours" ? "solid" : undefined}
        onClick={() => handleClick("tours")}
      >
        Tours
      </Button>

      <Button
        variant={field === "artists" ? "solid" : undefined}
        onClick={() => handleClick("artists")}
      >
        Artists
      </Button>

      <Button
        variant={field === "artworks" ? "solid" : undefined}
        onClick={() => handleClick("artworks")}
      >
        Artworks
      </Button>
    </div>
  );
}

export default FieldsButtons;
