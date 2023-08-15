import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavBar'
import AdminSidebar from '../../components/Admin/AdminSideBar'
import AdminCategory from '../../components/Admin/AdminCategory'

function Category() {
    return (
        <div>
            <AdminNavbar />
            <div className='flex '>
                <AdminSidebar />
                <div className=''>
                    <AdminCategory />
                </div>
            </div>


        </div>
    )
}

export default Category
