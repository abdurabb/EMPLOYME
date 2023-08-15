import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu, AiOutlineMessage } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdOutlineNotifications } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { UserActions } from '../../Store/UserAuth';
import LoginModal from '../../components/User/LoginModal'

function UserHeader() {
  const dispatch = useDispatch()
  const [user1, setUser] = useState(false)
  let [open, setOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('UserToken')
    // console.log(user + 'this is user');
    if (user) {
      setUser(true)
    }
  }, [user1])

  const handleLog = () => {
    setShowModal(true); // Open the modal
  }



  const handleLogout = () => {
    // Redux --
    dispatch(UserActions.userLogout());
    // Local Storage
    localStorage.removeItem('UserToken')
    // window.location.reload()
    setUser(false)
    navigate('/')
  }

  return (
    <div>

      <div className='shadow-md w-full  top-0 left-0'>
        <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
          <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
          '>
            <span className='text-gray-800 font-bold'>EMPLOY<span className='text-amber-600 font-bold'>ME</span></span>
          </div>

          <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden '  >
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>

          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px] md:opacity-100 opacity-0'} `}>
            <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500 ' ><Link to={'/'} > Home</Link> </li>
            <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500'><Link to={'/jobListing'}> Jobs</Link></li>
            {/* <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500'><Link> About Us</Link></li>
            <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500'><Link> Organise</Link></li> */}



            {!user1 ? (
              <button
                onClick={handleLog}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500"
              >
                Login
              </button>
            ) : (
              <>
                <li className="md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500">
                  <Link to={'/application_listing'}>Applications</Link>
                </li>

                <li className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500'><Link to={'/profile'}> Profile</Link></li>
                <li className='hover:cursor-pointer md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500' ><Link to={'/chat'}><AiOutlineMessage /></Link></li>
                <MdOutlineNotifications className='md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500' />

                <button
                  onClick={handleLogout}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500"
                >
                  Logout
                </button>
              </>
            )}

          </ul>
        </div>
      </div>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default UserHeader