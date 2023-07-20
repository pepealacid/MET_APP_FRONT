import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import ArtistDetailsPage from "./pages/ArtistDetailsPage/ArtistDetailsPage";
import MuseumPage from "./pages/MuseumPage";
import NewItineraryPage from "./pages/Itinerary/NewItineraryPage";
import ArtworkDetailsPage from "./pages/ArtworkDetailsPage/ArtworkDetailsPage";
import ArtworkSearchPage from "./pages/ArtworkSearchPage/ArtworkSearchPage";
import ArtistSearchPage from "./pages/ArtistSearchPage/ArtistSearchPage";
import Favorites from "./pages/FavoritesPage/Favorites";
import ToursFavorites from "./components/Favorites/ToursFavorites";
import ArtistsFavorites from "./components/Favorites/ArtistsFavorites";
import ArtworksFavorites from "./components/Favorites/ArtworksFavorites";

import ZeroPage from "./pages/ZeroPage";
import Navbar from "./components/Navbar";
import LegalPage from "./pages/LegalPage";
import SupportPage from "./pages/SupportPage";
import AppearancePage from "./pages/AppearancePage";
import LanguagePage from "./pages/LanguagePage";
import EditProfilePage from "./pages/EditProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import BackButton from "./components/BackButton";
import ItineraryPage from "./pages/Itinerary/ItineraryPage";
import GuidedTourPage from "./pages/Itinerary/GuidedTourPage";
import EndGuidedTourPage from "./pages/Itinerary/EndGuidedTourPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const location = useLocation();

  const shouldShowNavbar = !["/", "/login", "/signup"].includes(
    location.pathname
  );

  const shouldShowBackButton = !["/favorites", "/itinerary/new"].includes(
    location.pathname
  );

  const contentStyles = { paddingBottom: shouldShowNavbar ? "100px" : "0" };

  return (
    <div>
      {shouldShowBackButton && <BackButton />}
      <div style={contentStyles}>
        <Routes>
          <Route path="/" element={<ZeroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/legal"
            element={
              <PrivateRoute>
                <LegalPage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/support"
            element={
              <PrivateRoute>
                <SupportPage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/appearance"
            element={
              <PrivateRoute>
                <AppearancePage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/language"
            element={
              <PrivateRoute>
                <LanguagePage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

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
            path="/home"
            element={<Navigate to="/home/museums" replace />}
          />

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
            path="/home/museums"
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
            path="/itinerary/:id"
            element={
              <PrivateRoute>
                <ItineraryPage />
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
            path="/tour/end"
            element={
              <PrivateRoute>
                <EndGuidedTourPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/tour/:id"
            element={
              <PrivateRoute>
                <GuidedTourPage />
              </PrivateRoute>
            }
          />

          <Route path="/artist/:title" element={<ArtistDetailsPage />} />
          <Route path="/artwork/:objectId" element={<ArtworkDetailsPage />} />
        </Routes>
      </div>
      {shouldShowNavbar && <Navbar />}
    </div>
  );
}

export default App;
