import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from "../../components/layout/Layout";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import API from '../../utils/axiosInstance';

export default function Products() {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await API.get('/product/get-all-product');
      setProducts(data.products);
    } catch (error) {
      toast.error("Something went wrong while fetching products.");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row my-5 mx-1">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center mb-4">All Products List</h1>
          <div className="row">
            {products?.map(product => (
              <div className="col-md-4 mb-4" key={product._id}>
                <Link className='text-decoration-none' to={`/dashboard/admin/update-product/${product.slug}`}>
                  <div className="card h-100 shadow-sm">
                    <img 
                      className="card-img-top" 
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} 
                      alt={product.name} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text flex-grow-1">{product.description.substring(0, 100)}...</p>
                      
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
