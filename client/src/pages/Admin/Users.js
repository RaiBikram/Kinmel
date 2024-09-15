import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'

export default function Users() {
  return (
    <Layout title={" Dashboard - All users"}>
<div className='row'>
<div className='col-md-3'>
<AdminMenu />
</div>
<div className='col-md-9'>
All users
</div>
</div>
    </Layout>
    
  )
}
