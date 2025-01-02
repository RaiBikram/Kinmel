import React, { useState, useEffect } from "react";
import API from "../utils/axiosInstance";

export default function useCategory() {
  const [categories, setCategories] = useState();

  //get category
  const getCategories = async () => {
    try {
      const { data } = await API.get("category/all-category");
      setCategories(data?.allCategories);
    } catch (error) {
      console.log(error);
    }
  };

  //
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
}
