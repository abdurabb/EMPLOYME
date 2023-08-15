import React from 'react'
import { useNavigate } from 'react-router-dom';


function SetLogin() {

  const navigate = useNavigate()


  const handleUser = () => {
    navigate('/login')
  }
  const companyLogin = ()=>{
    navigate('/companyLogin')
  }

  return (
    <div>
      <div className="flex bg-gray-50 justify-center items-center h-screen gap-6">
        <button onClick={handleUser} className="bg-gray-100 rounded-lg shadow-md w-1/4 p-6"><div >
          <img src="userLogin.jpg" alt="" />
          <h2 className="text-xl pt-4 flex justify-center font-bold mb-4">User Login</h2>
          <p className="text-gray-700">You can Find  Dream Job From Here.</p>
        </div></button>

        <button onClick={companyLogin} className="bg-gray-100 rounded-lg shadow-md w-1/4 p-6"> <div >
          <img className='' src="companyLogin.jpeg" alt="" />
          <h2 className="text-xl pt-4 font-bold mb-4 flex justify-center">Company Login</h2>
          <p className="text-gray-700">You Can Find Your Employee From here.</p>
        </div></button>

      </div>
    </div>
  )
}

export default SetLogin
