import React, {  useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { RiCalendarTodoFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
    const [handle, setHandle] = useState('dashboard')
    const navigate = useNavigate();

    // useEffect(() => {
    //     setHandle('dashboard')
    // }, [])

    return (
        <div className="h-screen  bg-gray-200 py-4 w-1/6 pt-16  font-serif">
            <div onClick={() => {
                setHandle('dashboard')
                navigate('/dashboard')
            }} className={`h-14  rounded-full flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-gray-400 ${handle === 'dashboard' ? 'bg-gray-400' : ''}`} >
                <MdSpaceDashboard className="mr-1" />
                <p className="hidden md:block">Dashboard</p>
            </div>

            <div onClick={()=>{
                setHandle('user')
                navigate('/userManage')
            }}
             className={`h-14  rounded-full flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-gray-400 ${handle === 'user' ? 'bg-gray-400' : ''}`}>
                <MdSpaceDashboard className="mr-1" />
                <p className="hidden md:block">Users</p>
            </div>
            <div onClick={()=>{
                setHandle('company')
                navigate('/companyManage')
            }}
             className={`h-14  rounded-full flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-gray-400 ${handle === 'company' ? 'bg-gray-400' : ''}`}>
                <BiSolidUser className="mr-1" />
                <p className="hidden md:block">HR & Companies</p>
            </div>
            <div onClick={()=>{ 
                setHandle('job')
                navigate('/job_list')
            }}
            className={`h-14 rounded-full flex items-center justify-center  pl-4 md:justify-start text-sm lg:text-lg hover:bg-gray-400 ${handle==='job'?'bg-gray-400':''}`}>
                <MdOutlineSettingsApplications className="mr-1" />
                <p className="hidden md:block">Jobs</p>
            </div>


            <div onClick={() => {
                setHandle('category')
                navigate('/category')
            }} className={`h-14 rounded-full flex items-center justify-center  pl-4 md:justify-start text-sm lg:text-lg hover:bg-gray-400 ${handle==='category'?'bg-gray-400':''}`}>
                <RiCalendarTodoFill className="mr-1 text-gray-500" />
                <p className="hidden md:block ">Company Category</p>
            </div>

             <div onClick={()=>{ 
                setHandle('premium')
                navigate('/premiumManage')
             }}
             className={`h-14  rounded-full flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-gray-400 ${handle === 'premium' ? 'bg-gray-400' : ''}`}>
                <MdOutlineSettingsApplications className="mr-1" />
                <p className="hidden md:block">Premium Management</p>
            </div>

            <div onClick={()=>{
                setHandle('profile')
                navigate('/admin_profile')
             }}
             className={`h-14  rounded-full flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-gray-400 ${handle === 'profile' ? 'bg-gray-400' : ''}`}>
                <MdOutlineSettingsApplications className="mr-1" />
                <p className="hidden md:block">Profile</p>
            </div>

        </div>
    );
}

export default AdminSidebar;