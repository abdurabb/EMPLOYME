import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavBar'
import AdminSidebar from '../../components/Admin/AdminSideBar'
import AdminPremium from '../../components/Admin/AdminPremium'

function Premium() {
    return (
        <div>
            <AdminNavbar />
            <div className='flex '>
                <AdminSidebar />
                <div className=''>
                   <AdminPremium/>
                </div>
            </div>


        </div>
    )
}

export default Premium
