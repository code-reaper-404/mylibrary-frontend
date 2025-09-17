import React, { createContext, useContext, useState, useEffect } from "react";
import { checkAuth, logoutUser } from "../services/ApiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authCheck = async () => {
    try {
      const response = await checkAuth();

      if (!response.status==200) throw new Error("Not authenticated");
      
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, logout, loading, authCheck }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
