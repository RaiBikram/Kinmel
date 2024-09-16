import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import API from "../utils/axiosInstance";
import { Checkbox, Radio } from "antd";
import toast from "react-hot-toast";
import { prices } from "../utils/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextAPI/cartContext";

export default function HomePage() {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // get total count
  const getToatl = async () => {
    try {
      const { data } = await API.get("product/product-count");
      setTotal(data?.total_product);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle filter change for categories
  const handleFilter = (booleanVal, id) => {
    let updatedChecked = [...checked];

    if (booleanVal) {
      updatedChecked.push(id);
    } else {
      updatedChecked = updatedChecked.filter((c) => c !== id);
    }
    setChecked(updatedChecked);
  };

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await API.get("/category/all-category");
      if (data?.success) {
        setCategories(data.allCategories);
      } else {
        toast.error(data.message || "Failed to fetch categories.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching categories.");
    }
  };

  // Fetch all products
  const getAllProducts = async () => {
    try {
      setLoadingFilter(true);
      const { data } = await API.get("/product/get-all-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching products.");
    } finally {
      setLoadingFilter(false);
    }
  };

  // // page
  // // Fetch all products
  // const getAllProductPage = async () => {
  //   try {
  //     setLoadingFilter(true);
  //     setLoadingPage(true);
  //     const { data } = await API.get(`/product/product-list/${page}`);
  //     setLoadingPage(false);
  //     setProducts(data.products);
  //   } catch (error) {
  //     setLoadingPage(false);
  //     console.log(error);
  //     toast.error("An error occurred while fetching products.");
  //   } finally {
  //     setLoadingFilter(false);
  //   }
  // };

  // Apply filters
  const filterProduct = async () => {
    try {
      setLoadingFilter(true);
      const { data } = await API.post("/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      toast.error("An error occurred while filtering products.");
    } finally {
      setLoadingFilter(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    getAllProducts(); // Fetch all products again
  };

  // Fetch categories and products initially
  useEffect(() => {
    getAllCategory();
    getAllProducts();
    // getAllProductPage();
    getToatl();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  return (
    <Layout title="Kinmel - All Products - Best offers">
      <div className="row my-4">
        <div style={{ backgroundColor: "#f5eedc" }} className="col-2 ms-3">
          {/* Filter by category */}
          <h4 className="my-3 border-bottom">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((cat) => (
              <Checkbox
                key={cat._id}
                checked={checked.includes(cat._id)}
                onChange={(e) => handleFilter(e.target.checked, cat._id)}
              >
                {cat.name}
              </Checkbox>
            ))}
          </div>

          {/* Filter by price */}
          <h4 className="my-3 border-bottom">Filter By Price</h4>
          <Radio.Group
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
            // onChange={(e) => setRadio(window.location.reload())}

            className="d-flex flex-column"
          >
            {prices.map((p) => (
              <Radio key={p._id} value={p.array}>
                {p.name}
              </Radio>
            ))}
          </Radio.Group>
          <div className="row-2 mt-3">
            <button onClick={resetFilters} className="btn btn-danger">
              Reset Filter
            </button>
          </div>
        </div>

        <div className="col-9">
          <h1 className="text-center border-bottom">All Products</h1>

          {loadingFilter ? (
            <h3 className="text-center ">Loading...</h3>
          ) : (
            <div className="row">
              {products?.map((product) => (
                <div className="col-md-4 col-lg-4 col-sm-4" key={product._id}>
                  <div className="card m-3 ">
                    <img
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 30)}
                      </p>
                      <p className="card-text">$ {product.price}</p>
                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          );
                          toast.success("Item added to cart");
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* //page loading */}
        {/* <div className="m-2 p-3 text-center">
          {products && products.length < total && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loadingPage ? "Loading ..." : "Loadmore"}
            </button>
          )}
        </div> */}
      </div>
    </Layout>
  );
}
