import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavBar'
import AdminSidebar from '../../components/Admin/AdminSideBar'
import CompanyList from '../../components/Admin/CompanyList'
function CompanyManagement() {
    return (
        <div>
            <AdminNavbar />
            <div className='flex '>
                <AdminSidebar />
                <div className=''>
                    <CompanyList/>
                </div>
            </div>
        </div>
    )
}

export default CompanyManagement
