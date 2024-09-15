import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../../utils/axiosInstance";

const { Option } = Select;

export default function CreateProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("0");
  const [price, setPrice] = useState("");

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await API.get(
        "/category/all-category"
      );
      if (data?.success) {
        setCategories(data.allCategories);
      } else {
        toast.error(data.message || "Failed to fetch categories.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching categories.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("category", category);
      productData.append("photo", photo);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("price", price);

      const response = await API.post("/product/create-product",
        productData
      );
      if (response?.data?.success) {
        toast.success("Product created successfully!");
       navigate("/dashboard/admin/products");
       
      } else {
        toast.error(response?.data?.message || "Failed to create product.");
      }
    } catch (error) {
      toast.error("Something went wrong while creating the product.");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="row my-5   " >
        
        <div className="col-lg-3 mx-3">
          <AdminMenu />
        </div>
        <div className="col-lg-6 p-5 justify-content-center"   style={{
      backgroundColor: "#006699",
    }}>
          <h1 className="border-bottom">Create Product</h1>
          <div className="col m-1">
            <Select
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3 "
              onChange={handleCategoryChange}
              value={category}
              required
            >
              {categories?.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
            <div className="col mb-3">
              <label className="btn btn-outline-secondary">
                {photo ? photo?.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                    required
                  />
                </div>
              )}
            </div>
            <div className="mb-3 col-12">
              <input
                type="text"
                value={name}
                placeholder="Product Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12">
              <input
                type="text"
                value={description}
                placeholder="Product Description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12">
              <input
                type="number"
                value={price}
                placeholder="Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12">
              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12">
              <div className="mb-3 col-12">
                <select
                  value={shipping}
                  className="form-control"
                  onChange={(e) => setShipping(e.target.value)}
                  required
                >
                  <option value="" disabled selected className="text-mute">
                    Select Shipping Option
                  </option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
