import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavBar'
import AdminSidebar from '../../components/Admin/AdminSideBar'
import UserList from '../../components/Admin/UserList'
function UserManagement() {
    return (
        <div>
            <AdminNavbar />
            <div className='flex '>
                <AdminSidebar />
                <div className=''>
                    <UserList/>
                </div>
            </div>
        </div>
    )
}

export default UserManagement
