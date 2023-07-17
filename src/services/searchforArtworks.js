import axios from "axios";

const handleSubmit = async () => {
  try {
    const apiUrl =
      "https://collectionapi.metmuseum.org/public/collection/v1/objects";

    const response = await axios.get(apiUrl);
    const objectIDs = response.data.objectIDs;

    const femaleArtworkIDs = [];
    for (const objectID of objectIDs) {
      const objectResponse = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      );
      const object = objectResponse.data;
      console.log("NO", object.objectID);

      if (
        object.artistNationality === "Italian" &&
        object.primaryImage &&
        object.primaryImage !== ""
      ) {
        femaleArtworkIDs.push(object.objectID);
        console.log("ESTE SÍ --------", object.objectID);
      }
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

handleSubmit();
