import React from "react";
import { useSearch } from "../../contextAPI/SearchContext";
import API from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Layout from "antd/es/layout/layout";

export default function SearchInput() {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  // Handle the search form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.keyword) {
      return; // Prevent search if the keyword is empty
    }

    try {
      const { data } = await API.get(`/product/search/${values.keyword}`);
      setValues({
        ...values,
        results: data,
      });
      navigate("/search");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <Layout>
      {/* <nav className="navbar bg-body-tertiary rounded"> */}
      <div style={{ backgroundColor: "#cf293d" }}>
        <form className="d-flex " role="search" onSubmit={handleSubmit}>
          <input
            className="form-control h-60  rounded-start-pill mt-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword || ""} // Ensure value is a string
            onChange={(e) =>
              setValues({
                ...values,
                keyword: e.target.value,
              })
            }
          />
          <button
            className="rounded-end-circle ms-1 p-1  mt-2   "
            type="submit"
            style={{
              backgroundColor: "white",
              color: "black",
              borderColor:"white",
              fontSize:"12px"
            }}
          >
            Search
          </button>
        </form>
      </div>
      {/* </nav> */}
    </Layout>
  );
}
