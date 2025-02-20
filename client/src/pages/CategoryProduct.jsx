import Layout from "../components/layout/Layout";
import React, { useEffect, useState } from "react";
import API from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CategoryProduct() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state
  const { slug } = useParams();
  const navigate = useNavigate();

  // Get product by category
  const getProductByCat = async () => {
    try {
      const { data } = await API.get(`/product/product-category/${slug}`);
      setProduct(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products. Please try again.");
    } finally {
      setLoading(false); // Hide loading state once data is fetched
    }
  };

  // Invoke the function
  useEffect(() => {
    if (slug) {
      getProductByCat();
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>; // Display loading message or spinner while loading
  }

  return (
    <Layout>
      <div className="container tm-3 text-center">
        <h4>Category - {category?.name || "Unknown"}</h4>
        <h6>{product?.length > 0 ? `${product.length} Products Found` : "No Products Available"}</h6>
        <div className="row">
          {product?.map((prod) => (
            <div className="col-md-4 col-lg-4 col-sm-4" key={prod._id}>
              <div className="card m-3 ">
                <img
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${prod._id}`}
                  alt={prod.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{prod.name}</h5>
                  <p className="card-text">{prod.description.substring(0, 30)}...</p>
                  <p className="card-text">$ {prod.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${prod.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
