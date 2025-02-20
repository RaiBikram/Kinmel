import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";
import API from "../../utils/axiosInstance";

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle form submission for creating a new category
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("category/create-category", { name });
      if (data.success) {
        toast.success(`${name} is created.`);
        setName(""); // Clear the form field
        getAllCategory(); // Refresh category list
      } else {
        toast.error(data.message || "Failed to create category.");
      }
    } catch (error) {
      toast.error("Something went wrong while creating the category.");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await API.get(`category/all-category`);
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

  // Handle category update
  const handleUpdated = async (e) => {
    e.preventDefault();
    if (!selected?._id || !updatedName.trim()) {
      toast.error("Category ID and updated name are required.");
      return;
    }
    try {
      const { data } = await API.put(
        `category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success("Category updated successfully.");
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message || "Failed to update category.");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the category.");
    }
  };

  // Handle category deletion
  const handleDelete = async (categoryId) => {
    try {
      const { data } = await API.delete(
        `category/delete-category/${categoryId}`
      );
      if (data?.success) {
        toast.success("Category deleted successfully.");
        getAllCategory();
      } else {
        toast.error(data.message || "Failed to delete category.");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the category.");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="row my-5">
        <div className="col-md-3 mx-3 col-4">
          <AdminMenu />
        </div>
        <div className="col-md-8">
          <h1>Manage Categories</h1>
          <CategoryForm
            handleSubmit={handleForm}
            value={name}
            setValue={setName}
            placeholder="Enter new category"
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>
                    <button
                      className="btn btn-primary mx-3"
                      onClick={() => {
                        setVisible(true);
                        setSelected(category);
                        setUpdatedName(category.name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-3"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            title="Edit Category"
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={null}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdated}
              placeholder="Update category name"
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}
