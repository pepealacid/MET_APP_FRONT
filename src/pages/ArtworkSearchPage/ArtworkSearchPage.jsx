import { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";
import { Link } from "react-router-dom";
import FieldsButtons from "../../components/FieldsButtons";
import ArtworksSearchBar from "../../components/ArtworksSearchBar";
import ArtworkRecommendations from "../../components/Recommendations/ArtworkRecommendations/ArtworkRecommendations";

const ArtworkSearchPage = () => {
  const [results, setResults] = useState([]);

  const updateResults = (searchResults) => {
    setResults(searchResults);
  };

  return (
    <div>
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
