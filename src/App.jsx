import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import MuseumPage from "./pages/MuseumPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
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
    </Routes>
  );
}

export default App;
