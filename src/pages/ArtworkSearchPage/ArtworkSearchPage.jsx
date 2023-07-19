import { useState } from "react";
import { Grid, GridItem, Button, Image } from "@chakra-ui/react";
import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";
import { Link, useNavigate } from "react-router-dom";
import FieldsButtons from "../../components/FieldsButtons";
import ArtworksSearchBar from "../../components/ArtworksSearchBar";
import ArtworkRecommendations from "../../components/Recommendations/ArtworkRecommendations/ArtworkRecommendations";
import GoBackButton from "../../assets/images/GoBackButton.png";

const ArtworkSearchPage = () => {
  const [results, setResults] = useState([]);

  const updateResults = (searchResults) => {
    setResults(searchResults);
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Button
        bg="transparent"
        className="goback-button"
        onClick={handleGoBack}
        justifyContent="flex-start"
        top="20px"
        left="10px"
        marginBottom="30px"
      >
        <Image src={GoBackButton} alt="Go Back" />
      </Button>
      <ArtworksSearchBar updateResults={updateResults} />
      <FieldsButtons />
      {results.length > 0 ? (
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {results.map(
            (result) =>
              result.id !== null && (
                <GridItem key={result.id}>
                  <Link
                    to={`/artwork/${result.objectID}`}
                    style={{ textDecoration: "none", cursor: "pointer" }}
                  >
                    <ArtworkCard
                      imageUrl={result.primaryImageSmall || result.primaryImage}
                      title={result.title}
                      author={result.artistDisplayName}
                      date={result.objectEndDate || result.objectBeginDate}
                      artworkID={result.objectID}
                    />
                  </Link>
                </GridItem>
              )
          )}
        </Grid>
      ) : (
        <ArtworkRecommendations />
      )}
    </div>
  );
};

export default ArtworkSearchPage;
