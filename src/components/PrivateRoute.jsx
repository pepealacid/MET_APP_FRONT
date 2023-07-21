import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { LanguageContext } from "../context/language.context";

export default function PrivateRoute({ children, redirectTo = "/login" }) {
  const { user, loading } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

  if (loading) {
    return t?.main && <p>{t?.main.loading || "Loading..."}</p>;
  }

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}
