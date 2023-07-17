import AmericanArtists from "./AmericanArtists";
import SpanishArtists from "./SpanishArtists";
import WomenArtists from "./WomenArtists";

const ArtistRecommendations = () => {
  return (
    <div className="recommendations-container">
      <WomenArtists />
      <AmericanArtists />
      <SpanishArtists />
    </div>
  );
};

export default ArtistRecommendations;
