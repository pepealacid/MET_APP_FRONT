import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import MuseumPage from "./pages/MuseumPage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";
import NewItineraryPage from "./pages/Itinerary/NewItineraryPage";
import ArtworkDetailsPage from "./pages/ArtworkDetailsPage/ArtworkDetailsPage";
import ArtworkSearchPage from "./pages/ArtworkSearchPage/ArtworkSearchPage"
import ArtistSearchPage from "./pages/ArtistSearchPage/ArtistSearchPage";
import Tinder from "./pages/Tinder";
import Favorites from "./pages/Favorites";
import ToursFavorites from "./components/Favorites/ToursFavorites";
import ArtistsFavorites from "./components/Favorites/ArtistsFavorites";
import ArtworksFavorites from "./components/Favorites/ArtworksFavorites";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
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
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/favorites/tours" element={<ToursFavorites />} />
      <Route path="/favorites/artists" element={<ArtistsFavorites />} />
      <Route path="/favorites/artworks" element={<ArtworksFavorites />} />

    </Routes>
  );
}

export default App;
