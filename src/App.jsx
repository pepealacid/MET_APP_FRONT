import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import MuseumPage from "./pages/MuseumPage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";
import ArtworkDetailsPage from "./pages/ArtworkDetailsPage";
import ArtworkSearchPage from "./pages/ArtworkSearchPage"
import ArtistSearchPage from "./pages/ArtistSearchPage";


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

      
      <Route path="/artist/:title" element={<ArtistDetailsPage />} />
      <Route path="/artwork/:objectId" element={<ArtworkDetailsPage />} />

    </Routes>
  );
}

export default App;
