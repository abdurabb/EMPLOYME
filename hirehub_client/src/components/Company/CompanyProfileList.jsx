import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { CompanyApi } from '../../Api/CompanyApi'



function CompanyProfileList() {
  const navigate = useNavigate()
  const [company, setCompany] = useState()
  useEffect(() => {
    let token = localStorage.getItem('CompanyToken')
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.id) {
        const id = decodedToken.id
        CompanyApi.get(`/company_profileData?id=${id}`).then((res) => {
          setCompany(res.data.data)
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }, [])
  return (
    <div>
      <div>
        <div className="bg-gray-100 min-h-screen p-8">
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div className="bg-indigo-400 text-white text-center py-4">
              <h1 className="text-2xl font-semibold">Your Company  Profile</h1>
            </div>

            <div className="px-6 py-4">
              {company ?
                <img
                  src={company ? company.Image : ''}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full mx-auto"
                />
                :
                <img
                  src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full mx-auto"
                />
              }

              <h2 className="mt-4 text-xl font-semibold text-gray-800 text-center">{company ? company.company_name : ''}</h2>

              <div className="mt-6">
                <p className="text-gray-700 py-2 font-bold">Email: {company ? company.email : ''}</p>
                <p className="text-gray-700 py-2 font-bold">Phone: {company ? company.mobile : ''}</p>
                <p className="text-gray-700 py-2 font-bold">GST Number: {company ? company.gstNumber : ''}</p>
                <p className="text-gray-700 py-2 font-bold">Company Category: {company ? company.category : ''}</p>
                <p className="text-gray-700 py-2 font-bold">Company Licence Number: {company ? company.licence : ''}</p>
                <p className="text-gray-700 py-2 font-bold">Employees: {company ? company.employeeNumber : ''}</p>
                <p className="text-gray-700 py-2 font-bold"> WebSite Status : {company ?
                  company.Status === 'Accept' ? <button className='bg-green-500 p-2 rounded-xl text-white'>Accepted</button> :
                    company.Status === 'Pending' ? <button className='bg-yellow-500 p-2 rounded-xl'>Pending</button> :
                      company.Status === 'Reject' ? <button className='bg-red-500 p-2 rounded-xl text-white'>Rejected</button> : '' : ''}</p>

                <div>
                  <h3 className='mt-4 flex justify-center'>Address</h3>
                  <div className='flex justify-between '>
                    <p className="  text-gray-700 font-bold">Address: {company ? company.address : ''}</p>
                    <p className="  text-gray-700 font-bold">country: {company ? company.country : ''}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-indigo-400 text-white text-center py-3">
              <button className='bg-blue-500 hover:bg-blue-800 rounded-xl font-semibold p-3'
                onClick={() => {
                  const encodedUserData = encodeURIComponent(JSON.stringify(company._id));
                  navigate(`/edit_company_profile?data=${encodedUserData}`);
                }}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyProfileList
