import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../contextAPI/Auth.Context'


export default function AdminDashboard() {
  const [auth]=useAuth();
  return (
    <Layout title='admin Dashboard -Ecommerce App'>
      <div className='container-fluid mt-5'>
        <div className='row'>
<div className='col-md-3  my-5'><AdminMenu /></div>
<div className='col-md-8'>
<div className='card w-75 p-3'>
<h3>Admin Name : {auth?.user?.username}</h3>
<h3>Admin Email : {auth?.user?.email}</h3>
<h3>Admin Contact : {auth?.user?.phone}</h3>

</div>

</div>
        </div>
      </div>
    </Layout>
  )
}
