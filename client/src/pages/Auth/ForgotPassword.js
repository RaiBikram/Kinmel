import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../utils/axiosInstance";

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState(""); // username, email, or phone
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", {
        identifier: identifier.toLowerCase(),
        // Using identifier for username, email, or phone
        answer: answer.trim(),
        newPassword: newPassword,
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate(location.state?.from || "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot-Password - Kinmel"}>
      <div className="row justify-content-center m-2 mt-5 ">
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 rounded"
         style={{
          backgroundColor: "#006699",
        }}
        >
          <h1 style={{ color: "#bfbfbf" }} className="mt-3 border-bottom text-center">Reset Password</h1>
         
          <form
            className="row needs-validation mx-5"
            noValidate
            onSubmit={handleSubmit}
          >
         <div className="col">
                <input
                  type="text"
                  className="form-control my-3"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Username, Email, or Phone"
                  required
                />

                <input
                  type="text"
                  className="form-control my-3"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your secret answer"
                  required
                />
   
                <input
                  type="password"
                  className="form-control my-3"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                />


            <div className="text-center mt-5">
              <button type="submit" className="btn btn-success">
                Reset
              </button>
              <br/>
              <a
              className=" my-3"
              type="button"
              style={{
                color: "white",

                textAlign: "center",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </a>

            </div>


             </div>
            
          </form>
        </div>
        </div>
   
    </Layout>
  );
}
