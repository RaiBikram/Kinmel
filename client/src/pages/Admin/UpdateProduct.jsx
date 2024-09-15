import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../utils/axiosInstance";

const { Option } = Select;

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [price, setPrice] = useState("");
  const [pid, setPid] = useState();

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, [slug]);

  const getSingleProduct = async () => {
    try {
      const { data } = await API.get(`/product/get-single-product/${slug}`);
      const product = data.Product;
      setName(product.name);
      setCategory(product.category._id);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setShipping(product.shipping);
      setPid(product._id);
    } catch (error) {
      toast.error("Error fetching product details");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await API.get("/category/all-category");
      if (data?.success) {
        setCategories(data.allCategories);
      } else {
        toast.error(data.message || "Failed to fetch categories.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching categories.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("category", category);
      if (photo) productData.append("photo", photo);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("price", price);

      const response = await API.put(`/product/update-product/${pid}`, productData);

      if (response?.data?.success) {
        toast.success("Product updated successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(response?.data?.message || "Failed to update product.");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the product.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const answer = window.prompt("Are you sure you want to delete this product?, Yes or No " );
      if (answer== "yes" || "YES" || "Yes"){
        const { data } = await API.delete(`/product/delete-product/${pid}`);
        if (data?.success) {
          toast.success("Product deleted successfully");
          navigate("/dashboard/admin/products");
        }
      }

      else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="row my-5">
        <div className="col-md-3 mx-3">
          <AdminMenu />
        </div>
        <div className="col-md-8">
          <h2>Update Product</h2>

          <form onSubmit={handleUpdate}>
            <Select
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              value={category}
              onChange={value => setCategory(value)}
              required
            >
              {categories?.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary">
                {photo ? photo?.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${pid}`}
                    height={"200px"}
                    className="img img-responsive"
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
              <select
                className="form-control"
                onChange={(e) => setShipping(e.target.value)}
                value={shipping}
                required
              >
                <option value="" disabled>
                  Select Shipping Option
                </option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Update Product
              </button>
              <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
