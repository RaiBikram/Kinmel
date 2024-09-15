import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../contextAPI/Auth.Context";

export default function Dashboard() {
  const [auth] = useAuth();
  return (
    <>
      <Layout title="User Dashboard - Kinmel">
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h3>{auth?.user?.username}</h3>
                <h3>{auth?.user?.email}</h3>
                <h3>{auth?.user?.phone}</h3>
                <h3>{auth?.user?.address}</h3>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
