import { Box, Image } from "@chakra-ui/react";
import GoBackButton from "../assets/images/GoBackButton.svg";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "30px",
        left: "30px",
        zIndex: 9999, 
      }}
    >
      <Box
        bg="transparent"
        className="goback-button"
        onClick={handleGoBack}
        justifyContent="flex-start"
      >
        <Image src={GoBackButton} alt="Go Back" />
      </Box>
    </div>
  );
};

export default BackButton;
