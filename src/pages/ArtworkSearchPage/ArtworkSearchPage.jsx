import { useState, useContext } from "react";
import { Grid, GridItem, Text, Box } from "@chakra-ui/react";
import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";
import { Link } from "react-router-dom";
import FieldsButtons from "../../components/FieldsButtons";
import ArtworksSearchBar from "../../components/ArtworksSearchBar";
import ArtworkRecommendations from "../../components/Recommendations/ArtworkRecommendations/ArtworkRecommendations";
import { LanguageContext } from "../../context/language.context";

const ArtworkSearchPage = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const { t } = useContext(LanguageContext);

  const updateResults = (searchResults) => {
    setResults(searchResults);
  };

  return (
    t?.artworkSearchPage && (
      <Box>
        <ArtworksSearchBar updateResults={updateResults} setQuery={setQuery} />
        <FieldsButtons />
        {results.length > 0 ? (
          <Box>
            <Text className="recomm-header" padding="20px">
              {t?.artworkSearchPage.results || "Results for"} "{query}"
            </Text>
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
                          context="search-result"
                          imageUrl={
                            result.primaryImageSmall || result.primaryImage
                          }
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
          </Box>
        ) : (
          <ArtworkRecommendations />
        )}
      </Box>
    )
  );
};

export default ArtworkSearchPage;
