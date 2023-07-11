import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function PrivateRoute({ children, reverse }) {
  const { currentUser } = useAuth();

  const redirect = window.location.pathname.substring(11);

  if (!reverse)
    return currentUser ? (
      <>{children}</>
    ) : (
      <Navigate
        to={`/login${redirect !== "" ? `?redirect=${redirect}` : ""}`}
      />
    );
  else return !currentUser ? <>{children}</> : <Navigate to="/documents" />;
}
