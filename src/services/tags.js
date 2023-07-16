import axios from "axios";

const fetchTagWords = async () => {
  try {
    const firstApiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
    const firstResponse = await axios.get(firstApiUrl);
    const objectIDs = firstResponse.data.objectIDs;

    const tagWords = [];

    for (const objectID of objectIDs) {
      const secondApiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
      const secondResponse = await axios.get(secondApiUrl);
      const object = secondResponse.data;
      
      if (object.tags && object.tags.length > 0) {
        const tags = object.tags.map((tag) => tag.term);
        tagWords.push(...tags);
      }
    }
    console.log(tagWords)
    return tagWords;
  } catch (error) {
    console.error("Error fetching tag words:", error);
    return [];
  }
};

fetchTagWords();