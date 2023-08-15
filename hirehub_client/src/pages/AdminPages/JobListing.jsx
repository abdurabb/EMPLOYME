import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavBar'
import AdminSidebar from '../../components/Admin/AdminSideBar'
import AdminJobList from '../../components/Admin/AdminJobList'

function JobListing() {
    return (
        <div>
            <div>
                <AdminNavbar />
                <div className='flex '>
                    <AdminSidebar />
                    <div className=''>
                        <AdminJobList />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default JobListing
