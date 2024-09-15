// import Layout from 'antd/es/layout/layout'
import Layout from "../components/layout/Layout";
import React, { useEffect, useState } from "react";
import API from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CategoryProduct() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  //get product
  const getProductByCat = async () => {
    // console.log("slug", slug)
    try {
      const { data } = await API.get(`/product/product-category/${slug}`);

      console.log("data", data?.category);
      //   category,
      //   products,
      setProduct(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  //invoke the fun

  useEffect(() => {
    if (slug) {
      getProductByCat();
    }
  }, [slug]);
  return (
    <Layout>
      <div className="container tm-3 text-center">
        <h4>Category - {category?.name}</h4>
        <h6>Total Products - {product?.length} found</h6>
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
                  <p className="card-text">
                    {prod.description.substring(0, 30)}
                  </p>
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
