import { useState, useEffect } from "react";
import { Input, Box, Image, Text, Spinner, Button } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { field } = useParams();

  const fetchSearchResults = async () => {
    setLoading(true);

    try {
      let apiUrl;
      if (field === "artists") {
        apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=${searchQuery}&isHighlight=true`;
        console.log(searchQuery, "ESTA ES LA QUERY")
      } else if (field === "artworks") {
        apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?title=${searchQuery}`;
      } else {
        console.error("Invalid field:", field);
        setLoading(false);
        return;
      }

      const response = await axios.get(apiUrl);
      const objectIDs = response.data.objectIDs;
      const promises = objectIDs.map((objectID) =>
        axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        )
      );
      const objectResponses = await Promise.all(promises);
      const objects = objectResponses.map(
        (objectResponse) => objectResponse.data
      );
      setSearchResults(objects);
      console.log(objects);
      console.log("QUERY", searchQuery)
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    setLoading(false);
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSearchResults()
  };

  return (
    <Box position="relative">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder={`Search for the ${field}`}
          size="md"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <Button type="submit">Search</Button>
      </form>

      {/* Rest of the code */}
    </Box>
  );
}
