import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Spinner, Text } from "@chakra-ui/react";

const ArtistDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("url");
  const [artistData, setArtistData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(query, {
          headers: {
            "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
          },
        });
        setArtistData(response.data);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    const getImageUrl = () => {
      if (artistData && artistData._links.image) {
        const imageUrl = artistData._links.image.href;
        const imageVersion = artistData.image_versions[0];
        const url = imageUrl.replace("{image_version}", imageVersion);
        setImageUrl(url);
      }
    };

    getImageUrl();
  }, [artistData]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div>
      {artistData ? (
        <div>
          {imageUrl ? (
            <img src={imageUrl} alt={artistData.name} />
          ) : (
            <Spinner />
          )}
          <Text>{artistData.name}</Text>
          <Text>
            {artistData.birthday || "undefined"} -{" "}
            {artistData.deathday || "undefined"}
          </Text>
          <Text>
            {artistData.hometown ? artistData.hometown : artistData.nationality}
          </Text>
          <Text>About</Text>
          {artistData.biography ? (
            <Text>
              {showFullDescription
                ? artistData.biography
                : `${artistData.biography.slice(0, 100)}...`}
              {artistData.biography.length > 100 && (
                <span
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={toggleDescription}
                >
                  {showFullDescription ? "Read less" : "Read more"}
                </span>
              )}
            </Text>
          ) : (
            <Text>Not bio available</Text>
          )}
          <h4>Get more info</h4>
          <a href={artistData._links.permalink.href}>here</a>
        </div>
      ) : (
        <>
          <Spinner />
          <p>Loading artist details...</p>
        </>
      )}
    </div>
  );
};

export default ArtistDetailsPage;
