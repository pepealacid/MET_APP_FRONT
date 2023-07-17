import AmericanArtworks from "./AmericanArtworks";
import WomenArtworks from "./WomenArtworks";
import RandomRecommendations from "./RandomRecommendation";
import EuropeanArtworks from "./EuropeanArtworks";

const ArtworkRecommendations = () => {
  return (
    <div className="recommendations-container">
      <WomenArtworks />
      <AmericanArtworks />
      <EuropeanArtworks />
      <RandomRecommendations n={10} />
    </div>
  );
};

export default ArtworkRecommendations;
