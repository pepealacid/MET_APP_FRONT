import { useContext } from "react";
import ArtworkCard from "./ArtworkCard";
import { Box, Heading } from "@chakra-ui/react";
import { LanguageContext } from "../../../context/language.context";

function TourCard({ currentGallery }) {
  const { t } = useContext(LanguageContext);

  return (
    t?.tours && (
      <>
        {currentGallery?.artwork ? (
          <ArtworkCard
            artpiece={currentGallery.artwork}
            gallery={currentGallery.gallery}
          />
        ) : (
          <Box p="15px" pt="45px">
            <Box boxShadow="2xl">
              <Heading
                fontSize="20px"
                color="#356670"
                w="350px"
                pt="20px"
                pb="20px"
                pl="40px"
                textAlign="center"
              >
                {t?.tours.goTo ||
                  "In order to go to the next artwork you have to go the gallery:"}{" "}
                {currentGallery && currentGallery?.gallery}
              </Heading>
            </Box>
          </Box>
        )}
        {}
      </>
    )
  );
}

export default TourCard;
