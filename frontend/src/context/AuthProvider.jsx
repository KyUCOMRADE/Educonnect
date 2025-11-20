// src/context/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoadingAuth(false);
      return;
    }

    // fetch current user
    (async () => {
      try {
        const res = await api.get("/auth/me");
        // backend returns { user } — adapt if different
        setUser(res.data.user || res.data);
      } catch (err) {
        console.warn("Auth fetch failed:", err?.response?.data || err.message);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
