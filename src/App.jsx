import { Route, Routes, useLocation } from "react-router-dom";
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
import ZeroPage from "./pages/ZeroPage";
import Navbar from "./components/Navbar";
import LegalPage from "./pages/LegalPage";
import SupportPage from "./pages/SupportPage";
import AppearancePage from "./pages/AppearancePage";
import LenguagePage from "./pages/LanguagePage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfilePage from "./pages/ProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
// import Testing from "./pages/Testing";

function App() {
  const location = useLocation();

  const shouldShowNavbar = !["/", "/login", "/signup"].includes(
    location.pathname
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<ZeroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/appearance" element={<AppearancePage />} />
        <Route path="/lenguage" element={<LenguagePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
        {/* <Route path="/testing" element={<Testing />} /> */}
        <Route path="/change-password" element={<ChangePasswordPage />} />

        <Route
          path="/favorites/"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <ToursFavorites />
              </PrivateRoute>
            }
          />
          <Route
            path="tours"
            element={
              <PrivateRoute>
                <ToursFavorites />
              </PrivateRoute>
            }
          />
          <Route
            path="artists"
            element={
              <PrivateRoute>
                <ArtistsFavorites />
              </PrivateRoute>
            }
          />
          <Route
            path="artworks"
            element={
              <PrivateRoute>
                <ArtworksFavorites />
              </PrivateRoute>
            }
          />
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
        <Route
          path="/artist/:title"
          element={
            <PrivateRoute>
              <ArtistDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/artwork/:objectId"
          element={
            <PrivateRoute>
              <ArtworkDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tinder"
          element={
            <PrivateRoute>
              <Tinder />
            </PrivateRoute>
          }
        />
      </Routes>
      {shouldShowNavbar && <Navbar />}
    </>
  );
}

export default App;
