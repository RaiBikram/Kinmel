import { useState, useEffect } from "react";
import { useAuth } from '../../contextAPI/Auth.Context';
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // Use the context without setter

  useEffect(() => {
    const authCheck = async () => {
      try {
        // Make sure to set the Authorization header with the token
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking admin auth:", error);
        setOk(false); // Set false on error to show Spinner or redirect
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false); // Set false if no token is present
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="home"/>;
}
