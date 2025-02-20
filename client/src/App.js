import { Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Plolicy from "./pages/Plolicy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import UserDashboard from "./pages/user/UserDashboard";
import PrivateRoute from "./components/Routers/Private.Router";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routers/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import UserProfile from "./pages/user/UserProfile";
import UserOrders from "./pages/user/UserOrders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import AllCategories from "./pages/AllCategories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import UserUpdate from "./pages/user/UserProfile";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Plolicy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected User Route */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/profile-update" element={<UserUpdate />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        {/* Protected Admin Route */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/cretate-category" element={<CreateCategory />} />
          <Route path="admin/cretate-product" element={<CreateProduct />} />
          <Route
            path="admin/update-product/:slug"
            element={<UpdateProduct />}
          />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/all-user" element={<Users />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
