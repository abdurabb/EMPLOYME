import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu, AiOutlineMessage } from 'react-icons/ai';
import { MdOutlineNotifications } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { CompanyActions } from '../../Store/CompanyAuth';

function CompanyHeader() {
    const dispatch = useDispatch()
    let [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const handleLogOut = () => {
        // Redux --
        dispatch(CompanyActions.companyLogout());
        // Local Storage
        localStorage.removeItem('CompanyToken')
        navigate('/')
        // window.location.reload()
    }
    return (
        <div>
            <div className='shadow-md w-full  top-0 left-0'>
                <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] '>
                        <span className='text-gray-800 font-bold'>EMPLOY<span className='text-amber-600 font-bold'>ME</span></span>
                    </div>

                    <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden '  >
                        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </div>

                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px] md:opacity-100 opacity-0'} `}>
                        <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500' ><Link to='/companyHome'> Home</Link> </li>
                        {/* <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500'><Link to='/postJob'> Post Jobs</Link></li> */}
                        <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500'><Link to={'/candidatesList'}>Applications</Link></li>
                        {/* <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500'><Link>AboutUs</Link></li> */}
                        <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500'><Link to={'/hire_history'}>Jobs</Link></li>
                        <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500'><Link to={'/company_profile'}>Profile</Link></li>

                        <li className='hover:cursor-pointer md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500' ><Link to={'/companyChat'}><AiOutlineMessage /></Link></li>
                        {/* <MdOutlineNotifications className='hover:cursor-pointer md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500' /> */}

                        <button onClick={handleLogOut} className='bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'>LogOut</button>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CompanyHeader
