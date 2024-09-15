import React from "react";
import { NavLink } from "react-router-dom";
export default function AdminMenu() {
  return (
    <>
      <div className="text-center">
        <h4>Admin Panel</h4>
        <ul className="list-group">
       
          <NavLink
            to="/dashboard/admin/cretate-category"
            className="list-group-item"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/cretate-product"
            className="list-group-item"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/all-user"
            className="list-group-item"
          >
            Users
          </NavLink>
        </ul>
      </div>
    </>
  );
}
