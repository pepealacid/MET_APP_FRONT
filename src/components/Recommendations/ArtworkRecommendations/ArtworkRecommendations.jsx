import AmericanArtworks from "./AmericanArtworks";
import SpanishArtworks from "./SpanishArtworks";
import WomenArtworks from "./WomenArtworks";
import RandomRecommendations from "./RandomRecommendation";
import EuropeanArtworks from "./EuropeanArtworks";

const ArtworkRecommendations = ({
  favArtwork,
  favoriteArtworkIds,
  fetchFavorites,
}) => {
  return (
    <div>
      <WomenArtworks
        favArtwork={favArtwork}
        favoriteArtworkIds={favoriteArtworkIds}
        fetchFavorites={fetchFavorites}
      />
      <AmericanArtworks
        favArtwork={favArtwork}
        favoriteArtworkIds={favoriteArtworkIds}
        fetchFavorites={fetchFavorites}
      />
      <SpanishArtworks
        favArtwork={favArtwork}
        favoriteArtworkIds={favoriteArtworkIds}
        fetchFavorites={fetchFavorites}
      />
      <EuropeanArtworks
        favArtwork={favArtwork}
        favoriteArtworkIds={favoriteArtworkIds}
        fetchFavorites={fetchFavorites}
      />
      <RandomRecommendations
        n={10}
        favArtwork={favArtwork}
        favoriteArtworkIds={favoriteArtworkIds}
        fetchFavorites={fetchFavorites}
      />
    </div>
  );
};

export default ArtworkRecommendations;
