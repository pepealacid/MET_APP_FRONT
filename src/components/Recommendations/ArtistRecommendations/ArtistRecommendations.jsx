import AmericanArtists from "./AmericanArtists";
import SpanishArtists from "./SpanishArtists";
import WomenArtists from "./WomenArtists";

const ArtistRecommendations = ({
  favArtist,
  favoriteArtistIds,
  fetchFavorites,
}) => {
  return (
    <div className="recommendations-container">
      <WomenArtists
        favoriteArtistIds={favoriteArtistIds}
        favArtist={favArtist}
        fetchFavorites={fetchFavorites}
      />
      <AmericanArtists
        favoriteArtistIds={favoriteArtistIds}
        favArtist={favArtist}
        fetchFavorites={fetchFavorites}
      />
      <SpanishArtists
        favoriteArtistIds={favoriteArtistIds}
        favArtist={favArtist}
        fetchFavorites={fetchFavorites}
      />
    </div>
  );
};

export default ArtistRecommendations;
