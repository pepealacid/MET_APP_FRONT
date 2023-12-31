import { useEffect, useState, useContext } from "react";
import { Box } from "@chakra-ui/react";
import TourSearchBar from "../../components/Itinerary/search/TourSearchBar";
import itineraryService from "../../services/itinerary.service";
import FieldsButtons from "../../components/FieldsButtons";
import TourRecommendations from "../../components/Recommendations/TourRecommendations/TourRecommendations";
import { useNavigate } from "react-router";
import { LanguageContext } from "../../context/language.context";

function SearchTour() {
  const [allTours, setAllTours] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [oneHour, setOneHour] = useState([]);
  const [youMightLike, setYouMightLike] = useState([]);
  const [found, setFound] = useState([]);
  const [query, setQuery] = useState(null);
  const navigate = useNavigate();

  const { t } = useContext(LanguageContext);

  useEffect(() => {
    getAllTours();
  }, []);

  const getAllTours = async () => {
    try {
      const res = await itineraryService.getAll();
      setAllTours(res.data);
      decideRecommendations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNewTour = () => {
    navigate("/itinerary/new");
  };

  const decideRecommendations = (data) => {
    const oneHourTours = data.filter((tour) => tour.calculatedTime < 68);
    setOneHour(oneHourTours);

    const recommendedTours = data.filter((tour) => tour.tag == "recommended");
    setRecommended(recommendedTours);

    const youMightLikeTours = data.filter((tour) => tour.tag == "youmightlike");
    setYouMightLike(youMightLikeTours);
  };

  const decideResults = (query) => {
    const foundTours = allTours.filter((tour) =>
      tour.name.toUpperCase().includes(query.toUpperCase())
    );
    setFound(foundTours);
  };

  return (
    t?.toursRecommendations && (
      <>
        <Box
          bg={"black"}
          color={"white"}
          position="fixed"
          h={"45px"}
          w={"364px"}
          zIndex="9999"
          ml={"25px"}
          borderRadius={"5px"}
          padding={"10px 110px"}
          mt={"calc(100vh - 180px)"}
          onClick={handleCreateNewTour}
        >
          {t?.toursRecommendations.personalize || "Personalize a Tour"}
        </Box>
        <Box pb="200px">
          <TourSearchBar setQuery={setQuery} decideResults={decideResults} />
          <FieldsButtons />
          {allTours && (
            <>
              {query && (
                <>
                  {found.length ? (
                    <TourRecommendations tours={found} title="Results" />
                  ) : (
                    <TourRecommendations title="Results" />
                  )}
                </>
              )}
              <TourRecommendations
                tours={oneHour}
                title={t?.toursRecommendations.one || "One hour tours"}
              />
              <TourRecommendations
                tours={recommended}
                title={t?.toursRecommendations.recom || "Recommended"}
              />
              <TourRecommendations
                tours={youMightLike}
                title={t?.toursRecommendations.like || "You Might Like"}
              />
            </>
          )}
        </Box>
      </>
    )
  );
}

export default SearchTour;
