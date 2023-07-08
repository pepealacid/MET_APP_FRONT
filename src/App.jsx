import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";
import ArtworkDetailsPage from "./pages/ArtworkDetailsPage";

function App() {
  return (
    <Routes>
      <Route
        path="/home/:field"
        element={
          <PrivateRoute>
              <HomePage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/artist/:title" element={<ArtistDetailsPage />} />
      <Route path="/artworks/:objectId" element={<ArtworkDetailsPage />} />
    </Routes>
  );
}

export default App;
