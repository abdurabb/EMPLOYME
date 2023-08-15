import React from 'react'
import { MdOutlineNotifications } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { AdminActions } from '../../Store/AdminAuth';

function AdminNavbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleLogOut = () => {
    // Redux
    dispatch(AdminActions.adminLogout());
    // Local Storage
    localStorage.removeItem('AdminToken')
    navigate('/admin')
    // window.location.reload()

  }

  return (
    <div className=' grid grid-cols-[3fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full bg-gray-200  '>
      <div className='ml-9  py-4'>
        <h2 className='py-5 text-xl  uppercase'> <span className='text-gray-800 font-bold'>Employ</span><span className='text-amber-600 font-bold'>Me</span></h2>
      </div>
      <div className='flex flex-row justify-end mr-9 h-full items-center py-4 '>
        <MdOutlineNotifications className='mt-1 sm:mt-3 md:mt-1' />
        <button className=' bg-slate-300 p-2 rounded-lg ml-6' onClick={handleLogOut} >Logout</button>
      </div>
    </div>
  )
}

export default AdminNavbar