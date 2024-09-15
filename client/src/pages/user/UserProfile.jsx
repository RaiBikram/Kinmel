import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../contextAPI/Auth.Context";
import toast from "react-hot-toast";
import API from "../../utils/axiosInstance";

export default function UserProfile() {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  // Get user data
  useEffect(() => {
    const { fullname, email, username, address, phone } = auth.user;
    setFullname(fullname);
    setUsername(username);
    setAddress(address);
    setEmail(email);
    setPhone(phone);
  }, [auth?.user]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/auth/profile-update", {
        fullname,
        email,
        phone,
        address,
        username,
        password,
      });

      if (res?.data?.error) {
        toast.error(res.data.error);
      } else {
        setAuth({ ...auth, user: res?.data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res?.data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile - Kinmel"}>
      <div className="container-fluid mt-3 ">
        <div className="row  justify-content-center" >
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9 col-sm-12 col-lg-9 d-flex justify-content-center align-items-center">
            <div
              className=" col-lg-5 p-5 rounded 
              "
              style={{ backgroundColor: "#006699" }}
            >
              <h1 className="border-bottom " style={{ color: "#bfbfbf" }}>
                USER PROFILE
              </h1>
              <form
                className="needs-validation "
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="col ">
                  <input
                    placeholder="Full Name"
                    type="text"
                    className="form-control my-4"
                    id="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control my-4"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=" Username"
                    required
                  />

                  <input
                    type="email"
                    className="form-control my-4"
                    id="email1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    required
                    disabled
                  />

                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    placeholder="Current Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control my-4"
                    id="phone"
                    value={phone}
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />

                  <input
                    type="password"
                    className="form-control my-4"
                    id="password1"
                    value={password}
                    placeholder=" Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="row text-center mx-1" >
                  <button type="submit" className=" btn btn-success">
                  Update
                </button>
                  </div>
             
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
