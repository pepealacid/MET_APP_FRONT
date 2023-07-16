import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";
import ArtworkDetailsPage from "./pages/ArtworkDetailsPage";
import ArtworkSearchPage from "./pages/ArtworkSearchPage/ArtworkSearchPage"
import ArtistSearchPage from "./pages/ArtistSearchPage/ArtistSearchPage";
import Tinder from "./pages/Tinder";

function App() {
  return (
    <Routes>
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/artist/:title" element={<ArtistDetailsPage />} />
      <Route path="/artwork/:objectId" element={<ArtworkDetailsPage />} />
      <Route path="/tinder" element={<Tinder />} />

    </Routes>
  );
}

export default App;
