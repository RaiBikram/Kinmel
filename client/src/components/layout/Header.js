import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { useAuth } from "../../contextAPI/Auth.Context";
import toast from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../contextAPI/cartContext";
import { Badge } from "antd";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogOut = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully !!!");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ width: "100%", marginTop: 0, paddingTop: 0 }}
    >
      <div className="container-fluid" style={{ padding: 0, margin: 0 }}>
        <div
          className="row p-4"
          style={{
            backgroundColor: "#cf293d",
            color: "white",
            width: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          {/* Brand */}
          <div className="col-lg-3 col-md-4 col-6">
            <Link to="/" className="navbar-brand">
              <RiShoppingBag4Fill /> Kinmel
            </Link>
          </div>

          {/* Search Input */}
          <div className="col-lg-5 col-md-4">
            <SearchInput />
          </div>

          {/* Navbar links */}
          <div className="col-lg-4 col-md-4 col-6">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link" aria-current="page">
                    Home
                  </NavLink>
                </li>

                {/* Categories Dropdown */}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/categories"
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    <li
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Link className="dropdown-item" to="/">
                        All Categories
                      </Link>
                      {/* <Link className="dropdown-item" to="/all-categories">
                        All Categories
                      </Link> */}
                    </li>
                    {categories?.map((cat) => (
                      <li key={cat._id}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${cat.slug}`}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {/* User Account */}
                {auth?.user ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.username}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li className="nav-item">
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          to="/login"
                          className="dropdown-item"
                          onClick={handleLogOut}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </>
                )}

                {/* Cart */}
                <li className="nav-item">
                  <Badge count={cart?.length} offset={[10, 10]}>
                    <NavLink to="/cart" className="nav-link fs-6">
                      Cart
                    </NavLink>
                  </Badge>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
