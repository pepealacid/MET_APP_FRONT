import { Table, Tbody, Tr, Td, Text, Box } from "@chakra-ui/react";

import TourSearchCard from "../../Itinerary/search/tourSearchCard/TourSearchCard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../../context/language.context";

const TourRecommendations = ({ tours, title }) => {
  const { t } = useContext(LanguageContext);

  return (
    t?.tours && (
      <div className="recommendations-container">
        <Text className="recomm-header">{title}</Text>

        <Box
          position="relative"
          mt={2}
          overflowX="auto"
          maxHeight="600px"
          whiteSpace="nowrap"
        >
          <Table size="sm">
            <Tbody>
              {tours ? (
                <Tr>
                  {tours.map((tour) => (
                    <Td key={tour._id} px={2}>
                      <Link
                        to={`/itinerary/${tour._id}`}
                        style={{ textDecoration: "none", cursor: "pointer" }}
                      >
                        <TourSearchCard data={tour} />
                      </Link>
                    </Td>
                  ))}
                </Tr>
              ) : (
                <Tr>
                  <Td>
                    <Text>
                      {t?.tours.noMatch || "There are no matching tours"}
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </div>
    )
  );
};

export default TourRecommendations;
