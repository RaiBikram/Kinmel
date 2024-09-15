import React from "react";
import { NavLink } from "react-router-dom";
export default function UserMenu() {
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col text-center">
          <ul className="list-group">
            <h2>Dashboard</h2>
            <NavLink to="/dashboard/user" className="list-group-item">
            Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/user/profile-update"
              className="list-group-item"
            >
              Profile Update
            </NavLink>
            <NavLink to="/dashboard/user/orders" className="list-group-item">
              Orders
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
