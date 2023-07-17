import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import ArtistDetailsPage from "./pages/ArtistDetailsPage/ArtistDetailsPage";
import MuseumPage from "./pages/MuseumPage";
import NewItineraryPage from "./pages/Itinerary/NewItineraryPage";
import ArtworkDetailsPage from "./pages/ArtworkDetailsPage/ArtworkDetailsPage";
import ArtworkSearchPage from "./pages/ArtworkSearchPage/ArtworkSearchPage";
import ArtistSearchPage from "./pages/ArtistSearchPage/ArtistSearchPage";
import Tinder from "./pages/Tinder";
import Favorites from "./pages/FavoritesPage/Favorites";
import ToursFavorites from "./components/Favorites/ToursFavorites";
import ArtistsFavorites from "./components/Favorites/ArtistsFavorites";
import ArtworksFavorites from "./components/Favorites/ArtworksFavorites";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/favorites/" element={<Favorites />}>
        <Route index element={<ToursFavorites />} />
        <Route path="tours" element={<ToursFavorites />} />
        <Route path="artists" element={<ArtistsFavorites />} />
        <Route path="artworks" element={<ArtworksFavorites />} />
      </Route>
      <Route
        path="/home/artists"
        element={
          <PrivateRoute>
            <ArtistSearchPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/home/artworks"
        element={
          <PrivateRoute>
            <ArtworkSearchPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/museum/:name"
        element={
          <PrivateRoute>
            <MuseumPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/itinerary/new"
        element={
          <PrivateRoute>
            <NewItineraryPage />
          </PrivateRoute>
        }
      />
      <Route path="/artist/:title" element={<ArtistDetailsPage />} />
      <Route path="/artwork/:objectId" element={<ArtworkDetailsPage />} />
      <Route path="/tinder" element={<Tinder />} />
    </Routes>
  );
}

export default App;
