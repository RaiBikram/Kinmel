import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../contextAPI/cartContext";
import { useAuth } from "../contextAPI/Auth.Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
// import API from "../utils/axiosInstance";

export default function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("Nepal", {
        style: "currency",
        currency: "NPR",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  // Get Braintree payment gateway token
  // const getToken = async () => {
  //   try {
  //     const { data } = await API.get("/product/braintree/token");
  //     setClientToken(data?.clientToken);
  //   } catch (error) {
  //     console.error("Error fetching Braintree token", error);
  //   }
  // };

  // useEffect(() => {
  //   if (auth?.token) getToken();
  // }, [auth?.token]);

  // // Handle payment
  const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await API.post("/product/braintree/payment", {
  //       nonce,
  //       cart,
  //     });

  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/order");
  //     toast.success("Payment completed successfully.");
  //   } catch (error) {
  //     console.error("Payment error", error);
  //     setLoading(false);
  //     toast.error("Payment failed, please try again.");
  //   }
  };

  return (
    <Layout title={"Cart - Kinmel"}>
      <div className="container my-3">
        <div className="row ">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello, ${auth?.token && auth?.user?.username?.toUpperCase() }`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart?.length} items in your cart. ${
                    auth?.token ? "" : "Please login to checkout."
                  }`
                : "Your cart is empty."}
            </h4>
          </div>
          <div className="row">
            <div className="col-md-6">
              {cart?.map((p) => (
                <div className="row m-2 border" key={p._id}>
                  <div className="col-4 my-3">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p?.name}
                    />
                  </div>
                  <div className="col-md-6 ms-4 my-3">
                    <h4>{p?.name}</h4>
                    <p>{p?.description.substring(0, 30)}...</p>
                    <p>Price: Rs {p?.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 offset-md-2 text-center border rounded" 
            style={{backgroundColor:"#00b300", color:"white", height:"300px"}}
            >
              <h2 className="my-3">Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h4>Current Address : {auth?.user?.address.toUpperCase()} </h4>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                    style={{color:"black"}}
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {clientToken &&
                  cart?.length(
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: { flow: "vault" },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing..." : "Make Payment"}
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
