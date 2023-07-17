import axios from "axios";
import fs from "fs";

const fetchTagWords = async () => {
  try {
    const firstApiUrl =
      "https://collectionapi.metmuseum.org/public/collection/v1/objects";
    const firstResponse = await axios.get(firstApiUrl);
    const objectIDs = firstResponse.data.objectIDs;

    // Specify the desired starting position
    const startingPosition = 5592;

    // Apply the offset to skip the initial objectIDs
    const objectIDsToFetch = objectIDs.slice(startingPosition);

    const tagWords = [];

    for (const objectID of objectIDsToFetch) {
      const secondApiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
      const secondResponse = await axios.get(secondApiUrl);
      const object = secondResponse.data;

      if (object.tags && object.tags.length > 0) {
        const tags = object.tags.map((tag) => tag.term);
        tagWords.push(...tags);
        fs.appendFileSync("./tagWords.txt", tags.join(", ") + "\n");
        console.log("Tags written to file:", tags);
      }
    }

    return tagWords;
  } catch (error) {
    console.error("Error fetching tag words:", error);
    return [];
  }
};

fetchTagWords();
