
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import API from "../services/api";

// CREATE AUTH CONTEXT
const AuthContext = createContext(null);

// AUTH PROVIDER
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // CHECK EXISTING TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, []);

  // REGISTER CUSTOMER
  const register = async (userData) => {
    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        full_name: userData.full_name,
        email: userData.email.trim().toLowerCase(),
        phone: userData.phone,
        password: userData.password,
      });

      return response.data;

    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // LOGIN ADMIN OR CUSTOMER
  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const data = response.data;

      if (!data.token || !data.user) {
        throw new Error("Invalid login response.");
      }

      if (
        data.user.role !== "admin" &&
        data.user.role !== "customer"
      ) {
        throw new Error("Invalid user role.");
      }

      // SAVE AUTHENTICATION DATA
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      return data;

    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  // AUTHENTICATION VALUES
  const value = {
    user,
    loading,
    register,
    login,
    logout,

    isAuthenticated: !!user,

    isAdmin: user?.role === "admin",

    isCustomer: user?.role === "customer",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM AUTH HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export default AuthContext;
