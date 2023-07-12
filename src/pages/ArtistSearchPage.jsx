import ArtistsSearchBar from "../components/ArtistsSearchBar";
import { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import ArtistCard from "../components/ArtistCard/ArtistCard";
import { Link } from "react-router-dom";
import FieldsButtons from "../components/FieldsButtons";

const ArtistSearchPage = () => {
  const [results, setResults] = useState([]);

  const updateResults = (searchResults) => {
    setResults(searchResults);
  };


  return (
    <div>
      <ArtistsSearchBar updateResults={updateResults} />
      <FieldsButtons />
      {results.length > 0 && (
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {results.map((result) => (
            result.id !== null && (
              <GridItem key={result.id}>
                <Link
                  to={{
                  pathname: `/artist/${result.title}`,
                  search: `?url=${encodeURIComponent(result._links.self.href)}`,
                }}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <ArtistCard
                    imageUrl={result.imageUrl}
                    title={result.title}
                    birthday={result.birthday}
                    deathday={result.deathday}
                  />
                </Link>
              </GridItem>
            )
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ArtistSearchPage;
