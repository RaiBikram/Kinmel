import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/axiosInstance";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  // const [check, setChecked] = useState(false);
  const navigate = useNavigate();
  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", {
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        answer: answer,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/login");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Register - Kinmel"}>
      <div className="row justify-content-center m-5">
        <div
          className="col-12 col-sm-8 col-md-6 col-lg-4 register rounded"
          style={{
            backgroundColor: "#006699",
          }}
        >
          <h1 style={{ color: "#bfbfbf" }} className="mt-3 border-bottom">
            Create account
          </h1>
          <form
            className="needs-validation my-4 "
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="col">
              <input
                type="text"
                className="form-control my-2"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full Name"
                required
              />

              <input
                type="text"
                className="form-control my-2"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />

              <input
                type="email"
                className="form-control my-2"
                id="email1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />

              <input
                type="text"
                className="form-control my-2"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
              <input
                type="number"
                className="form-control my-2"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                required
              />

              <input
                type="password"
                className="form-control my-2"
                id="password1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <input
                type="password"
                className="form-control my-2"
                id="confirmPassword1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
              <input
                type="text"
                className="form-control my-2"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your secret?"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success ">
                Continue
              </button>
              <br />
              <br />
              <h6 style={{ color: "#bfbfbf" }}>
                {" "}
                Already have an account? &nbsp;
                <Link style={{ color: "white" }} href="/login">
                  login
                </Link>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
