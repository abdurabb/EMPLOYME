import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavBar'
import AdminSidebar from '../../components/Admin/AdminSideBar'
import AdminProfileList from '../../components/Admin/AdminProfileList'

function AdminProfile() {
    return (
        <div>
            <AdminNavbar />
            <div className='flex '>
                <AdminSidebar />
                <div className=''>
                    <AdminProfileList />
                </div>
            </div>
        </div>
    )
}

export default AdminProfile
