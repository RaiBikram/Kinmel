import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import AdminMenu from "../layout/AdminMenu";

export default function ProductRoute() {
  const [categories, setCategores] = useState([]);
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-3">
            <h1>Create Product</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
