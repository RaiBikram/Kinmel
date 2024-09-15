import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <Layout>

<div className="notFound">
    <h1>404</h1>
    <h2>OOps ! Page Not Found </h2>
    <Link to="/home">Go Back Home</Link>
</div>
    </Layout>
    
  )
}
