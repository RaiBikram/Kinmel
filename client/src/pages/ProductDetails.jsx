import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useCart } from "../contextAPI/cartContext";

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  // Initial product details
  useEffect(() => {
    if (slug) {
      getProduct();
    }
  }, [slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await API.get(`/product/get-single-product/${slug}`);
      setProduct(data?.Product);
      getSimilarProduct(data?.Product?._id, data?.Product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await API.get(`product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist cart in localStorage
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h1>Product Details</h1>
        <div className="row">
          <div className="col-md-6 mt-4">
            <img
              style={{ height: "200px", objectFit: "cover" }}
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
              alt={product?.name}
            />
          </div>

          <div className="col-md-6">
            <h1>Product details</h1>
            <p>Name: {product?.name}</p>
            <p>Description: {product?.description}</p>
            <p>Price: {product?.price}</p>
            <p>Category: {product?.category?.name}</p>
            <button className="btn btn-secondary ms-1" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>

          <div className="row">
            <h4>Similar products</h4>
            <hr />
            {relatedProducts?.length < 1 && <h6 className="text-center">No similar products found!</h6>}
            <div className="row">
              {relatedProducts?.map((product) => (
                <div className="col-md-4 col-lg-4 col-sm-4" key={product._id}>
                  <div className="card m-3">
                    <img
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description.substring(0, 30)}</p>
                      <p className="card-text">$ {product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
