import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contextAPI/Auth.Context";
import API from "../../utils/axiosInstance";

export default function Login() {
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState(""); // Single input for username, email, or phone
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login", {
        identifier: identifier.trim(), // Send identifier directly
        password: password.trim(),
      });

      // console.log("Response:", res);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setAuth({
          ...auth,
          user: res?.data?.user,
          token: res?.data?.token,
        });
        // save at locationstore
        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login - Kinmel"}>
      <div className="row justify-content-center m-5">
        <div
          className="col-12 col-sm-10 col-md-6 col-lg-4 rounded "
          style={{
            backgroundColor: "#006699",
          }}
        >
          <h1
            className="text-center mt-3 border-bottom"
            style={{ color: "#bfbfbf" }}
          >
            Login Page
          </h1>
          <form
            className="needs-validation m-4"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <input
                type="text"
                className="form-control mt-3"
                style={{ color: "#808080" }}
                id="identifier"
                placeholder="Username, email, or phone"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mt-4"
                id="password1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success my-3">
                Login
              </button>
              <br />
              <a
                style={{
                  color: "white",
                  textAlign: "center",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/forgot-password");
                }}
                className="my-3"
              >
                Forgot Password?
              </a>
              <hr style={{ color: "white" }} />

              <a
                style={{ color: "white" }}
                className="btn btn-outline-dark rounded"
                href="/register"
              >
                Create Your Kinmel Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
