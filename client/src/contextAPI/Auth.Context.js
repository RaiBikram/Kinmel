import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
import API from "../utils/axiosInstance";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide auth state to children components
const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  // Update axios default headers whenever auth.token changes
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = auth.token;
      API.defaults.headers.common["Authorization"] = auth.token;
    }
  }, [auth.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContextProvider };
