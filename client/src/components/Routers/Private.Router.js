import { useState, useEffect } from "react";
import { useAuth } from "../../contextAPI/Auth.Context";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../Spinner";
import API from "../../utils/axiosInstance";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // Use the context without setter

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await API.get("/auth/user-auth");
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
    }
  }, [auth?.token]);

  // Redirect to login if not authenticated
  return ok ? <Outlet /> : <Spinner />;
}
