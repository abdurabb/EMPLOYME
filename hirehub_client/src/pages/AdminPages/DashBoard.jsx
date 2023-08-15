import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavBar'
import AdminSidebar from '../../components/Admin/AdminSideBar'
import DashboardList from '../../components/Admin/DashboardList'
function DashBoard() {
  return (
    <div>
    <AdminNavbar />
    <div className='flex '>
        <AdminSidebar />
        <div className=''>
            <DashboardList />
        </div>
    </div>


</div>
  )
}

export default DashBoard
