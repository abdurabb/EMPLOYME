import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { CompanyApi } from '../../Api/CompanyApi'
import { AiFillMessage } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';


function CandidatesList() {
  const [status, setStatus] = useState()
  const navigate = useNavigate()
  const [companyId, setCompanyId] = useState()
  const [applicationData, setApplicationData] = useState([])
  const [modal, setModal] = useState(false)


  const handleStatus = (event, id) => {
    CompanyApi.patch('/updateStatus', { event, id }).then((res) => {
      setStatus(res.data.applicationStatus)
    }).catch((err) => {
      console.log(err);
    })

  }



  useEffect(() => {
    let token = localStorage.getItem('CompanyToken')
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.id) {
        const id = decodedToken.id
        setCompanyId(id)
        CompanyApi.get(`/getCandidates?id=${id}`).then((res) => {
          setApplicationData(res.data.data)
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }, [status])

  const handleChat = (userId) => {
    CompanyApi.post('/createNewChat', { userId, companyId }).then((res) => {

      navigate(`/companyChat`)
    }).catch((err) => {
      console.log(err + 'createnew Chat section in candidateList page');
    })
  }





  return (
    <div>
      {!modal ?
        (
          <div>
            <div className="bg-gray-200 p-4">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-indigo-600  text-white">
                  <tr>
                    <th className="px-4 py-2">Job Title</th>
                    {/* <th className="px-4 py-2">Sub Category</th> */}
                    <th className="px-4 py-2">Candidate</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Mobile</th>
                    <th className='px-4 py-2'>Qualification</th>
                    <th className="px-4 py-2">Details</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Messege</th>
                  </tr>
                </thead>

                <tbody className='text-center'>

                  {applicationData.map((data) => (
                    <tr key={data._id} className="border-b border-gray-300">
                      <td className="px-4 py-2">{data.job.position}</td>
                      <td className="px-4 py-2">{data.user.first_name}</td>
                      <td className="px-4 py-2">{data.user.email}</td>
                      <td className="px-4 py-2">{data.user.mobile}</td>
                      <td className="px-4 py-2">{data.user.qualification}</td>
                      <td className="px-4 py-2"><button className='bg-gray-200 p-2 rounded-xl'
                        onClick={() => {
                          setModal(true)
                        }}
                      >View</button></td>

                      <td className=" pl-2">

                        {/* <button className='bg-red-500 rounded-xl p-2'>Pending</button> */}
                        <select

                          value={data.Status}
                          onChange={(e) => {
                            let confirm = window.confirm('Do You want Change the Status')
                            if (confirm === true) {
                              setStatus(e.target.value)
                              handleStatus(e.target.value, data._id)
                            }
                          }
                          }

                          className="block  w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option className='bg-yellow-300 ' value="pending">Pending</option>
                          <option className='bg-green-500' value="accept">Accept</option>
                          <option className='bg-red-500' value="reject">Reject</option>
                          <option className='bg-blue-400' value="viewed">Viewed</option>
                        </select>

                      </td>

                      <td className="flex justify-center  px-4 py-2">


                        <button onClick={() => {
                          handleChat(data.user._id)
                        }}>
                          <AiFillMessage className="text-indigo-500 w-8 h-8" />
                        </button>
                      </td>  

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )


        :
        (
          < div className=" w-full   p-4">
            {/* <h1>{detail}</h1> */}

            {/* ----------------- */}
            <div className="bg-gray-200 w-full ">

              <div className="bg-gray-300 p-8 rounded-lg shadow-md ">
                <div className='text-end'>
                  <button className='' onClick={() => {
                    setModal(false)
                  }}>close</button></div>


                {applicationData.map((data) => (

                  <div className=" mx-auto p-4">
                    <h2 className="text-center text-2xl font-semibold text-blue-500 mb-4">Employee Details</h2>
                    <div className="grid grid-cols-8 gap-4">

                      <div className="col-span-8">
                        {data.user.Image ?
                          <img
                            src={data.user.Image ? data.user.Image : ''}
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
                      </div>
                      {/* first Row */}
                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 htmlFor="">Candidate's Name : </h1>
                          <h2 className='ml-4'>{data.user.first_name + '  ' + data.user.last_name}</h2>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className='flex '>
                          <h1 > Gender : </h1>
                          <h1 className='ml-4'>{data.user.gender}</h1>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > Date of Birth : </h1>
                          <h1 className='ml-4'>{data.user.dob}</h1>
                        </div>
                      </div>

                      {/* Second Row */}
                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > Email : </h1>
                          <h1 className='ml-4'>{data.user.email}</h1>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className='flex '>
                          <h1 > Phone Number : </h1>
                          <h1 className='ml-4'>{data.user.mobile}</h1>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > Qualification : </h1>
                          <h1 className='ml-4'>{data.user.qualification}</h1>
                        </div>
                      </div>

                      {/* Third Row */}
                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > Address : </h1>
                          <h1 className='ml-4'>{data.user.address}</h1>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className='flex '>
                          <h1 > City : </h1>
                          <h1 className='ml-4'>{data.user?.city}</h1>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > District : </h1>
                          <h1 className='ml-4'>{data.user.district}</h1>
                        </div>
                      </div>

                      {/* Forth Row */}
                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > State : </h1>
                          <h1 className='ml-4'>{data.user.state}</h1>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className='flex '>
                          <h1 > Country : </h1>
                          <h1 className='ml-4'>{data.user.country}</h1>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > Zip Code : </h1>
                          <h1 className='ml-4'>{data.user.zipCode}</h1>
                        </div>
                      </div>


                      {/* Fifth Row */}
                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > Position : </h1>
                          <h1 className='ml-4'>{data.user.post}</h1>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className='flex '>
                          <h1 > Skill : </h1>
                          <h1 className='ml-4'>{data.skill}</h1>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > Experience: </h1>
                          <h1 className='ml-4'>{data.experience}</h1>
                        </div>
                      </div>

                      {/* Sixth Row */}



                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > Plust Two : </h1>
                          <h1 className='ml-4'>{data.plusTwo}</h1>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className='flex '>
                          <h1 > Degree : </h1>
                          <h1 className='ml-4'>{data.degree}</h1>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className='flex '>
                          <h1 > Other Qualification : </h1>
                          <h1 className='ml-4'>{data.otherQualification}</h1>
                        </div>
                      </div>



                      <div className="col-span-4">
                        <div className="flex">
                          <h1> Sslc Certificate: </h1>
                          <a
                            className="ml-4 bg-gray-200 p-1 rounded-xl"
                            href={data.sslcCertificate}  // Provide the correct URL from your Firebase database
                            download   // This attribute indicates that the browser should download the file
                          >
                            Download
                          </a>
                        </div>
                      </div>

                      <div className="col-span-4">
                        <div className="flex">
                          <h1> Plust Two Certificate: </h1>
                          <a
                            className="ml-4 bg-gray-200 p-1 rounded-xl"
                            href={data.sslcCertificate}  // Provide the correct URL from your Firebase database
                            download   // This attribute indicates that the browser should download the file
                          >
                            Download
                          </a>
                        </div>
                      </div>

                      <div className="col-span-4">
                        <div className="flex">
                          <h1> Other Qualification Certificate: </h1>
                          <a
                            className="ml-4 bg-gray-200 p-1 rounded-xl"
                            href={data.sslcCertificate}  // Provide the correct URL from your Firebase database
                            download   // This attribute indicates that the browser should download the file
                          >
                            Download
                          </a>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <div className="flex">
                          <h1> Candidate's CV: </h1>
                          <a
                            className="ml-4 bg-gray-200 p-1 rounded-xl"
                            href={data.sslcCertificate}  // Provide the correct URL from your Firebase database
                            download   // This attribute indicates that the browser should download the file
                          >
                            Download
                          </a>
                        </div>
                      </div>
                      <div className="bg-blue-500 text-white text-center  col-span-8">
                        <button type='submit' className='bg-blue-500 hover:bg-blue-800 rounded-xl font-semibold p-3'
                        >Update Status</button>
                      </div>

                    </div>
                  </div>

                ))}


              </div>
            </div>
            {/* ----------------- */}

          </div>
        )
      }
    </div >
  )
}

export default CandidatesList
