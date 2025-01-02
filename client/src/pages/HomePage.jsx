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
  // const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(1);

  // Get total product count
  // const getTotal = async () => {
  //   try {
  //     const { data } = await API.get("product/product-count");
  //     setTotal(data?.total_product);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Handle category filter
  const handleFilter = (checkedValue, id) => {
    const updatedChecked = checkedValue
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    setChecked(updatedChecked);
  };

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await API.get("/category/all-category");
      if (data?.success) {
        setCategories(data.allCategories);
      } else {
        toast.error(data.message || "Failed to fetch categories.");
      }
    } catch (error) {
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
      toast.error("An error occurred while fetching products.");
    } finally {
      setLoadingFilter(false);
    }
  };

  // Apply filters
  const filterProducts = async () => {
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
    getAllProducts(); // Reload all products
  };

  // Initial data fetch
  useEffect(() => {
    getAllCategories();
    getAllProducts();
    // getTotal();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  return (
    <Layout title="Kinmel - All Products - Best offers">
      <div className="row my-4">
        {/* Sidebar for filters */}
        <div style={{ backgroundColor: "#f5eedc" }} className="col-2 ms-3">
          <h4 className="my-3 border-bottom">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories.map((cat) => (
              <Checkbox
                key={cat._id}
                checked={checked.includes(cat._id)}
                onChange={(e) => handleFilter(e.target.checked, cat._id)}
              >
                {cat.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="my-3 border-bottom">Filter By Price</h4>
          <Radio.Group
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
            className="d-flex flex-column"
          >
            {prices.map((p) => (
              <Radio key={p._id} value={p.array}>
                {p.name}
              </Radio>
            ))}
          </Radio.Group>
          <div className="mt-3">
            <button onClick={resetFilters} className="btn btn-danger">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Product list */}
        <div className="col-9">
          <h1 className="text-center border-bottom">All Products</h1>
          {loadingFilter ? (
            <h3 className="text-center">Loading...</h3>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div className="col-md-4 col-lg-4 col-sm-4" key={product._id}>
                  <div className="card m-3">
                    <img
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      loading="lazy"
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
      </div>
    </Layout>
  );
}
