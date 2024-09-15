import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

export default function UserOrders() {
  return (
    <>
      <Layout title={"Your Orders - Kinmel"}>

        <div className="conatiner-fluid mt-5">
          <div className="row">
            
            <div className="col-3">
              <UserMenu />
              </div>
            <div className="col-9">
              <h1>all orders</h1>
            </div>
          </div>
          </div>

      </Layout>
      ;
    </>
  );
}
