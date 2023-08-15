import React, { useEffect, useState } from 'react'
import { AdminApi } from '../../Api/AdminApi'

function AdminJobList() {

  const [jobss, setJobs] = useState([])
  const [modal, setModal] = useState(false)
  const [detail, setDetail] = useState()

  useEffect(() => {
    AdminApi.get('/job_data').then((res) => {
      setJobs(res.data.jobData)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const handleDetails = ((id) => {
    setModal(true)
    const filterDetail = jobss.filter(function (job) {
      return job._id === id;
    });
    setDetail(filterDetail)
  })
  const DetailCard = ({ jobTitle, subCategory, id, qualification, description, experience, location, companyName, salary, skills }) => {

    return (
      <div className='flex justify-center'>
        <div className=" text-center bg-gray-100 shadow-md p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2 flex justify-center">{jobTitle}</h2>
          <p className="text-gray-600 mb-4">Company :{companyName}</p>
          <p className="text-gray-600 mb-4">Sub Category:{subCategory}</p>
          <p className="text-gray-600 mb-4">Qualification:-{qualification}</p>
          <p className="text-gray-600 mb-4">We Are Offering {salary} Salary</p>
          <p className="text-gray-600 mb-4">Experience-{experience}</p>
          <p className="text-gray-600 mb-4">Description-{description}</p>
          <p className="text-gray-700">Skills -{skills}</p>
          <p className="text-gray-700">Job Location-{location}</p>
          <div className='mt-4 flex justify-between'>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!modal ?

        <div className=" container mx-auto p-4  ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4">
            {jobss.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <h2 className="text-xl font-semibold mb-2"> Position:{job.position}</h2>
                <p className="text-gray-600 mb-2">SubCategory: {job.subCategory}</p>
                <p className="text-gray-500"> Location:{job.location}</p>
                <p className="text-gray-500"> company:{job.company.company_name}</p>
                <div className='w-full'>
                  <button className=' w-full bg-indigo-500 hover:bg-indigo-700 rounded-xl p-2' onClick={() => {
                    handleDetails(job._id)
                  }} >Details</button>
                </div>

              </div>
            ))}
          </div>
        </div>

        :

        <div className="container  mx-auto p-4">
          {/* <h1>{detail}</h1> */}
          
          {/* ----------------- */}
          <div className="flex justify-center bg-gray-200 ">

            <div className="bg-white p-8 rounded-lg shadow-md w-96">
              <div className='text-end'>
                <button className='bg-red-500 p-2 rounded-xl' onClick={() => {
                  setModal(false) 
                }}>close</button></div>
              <h2 className="text-center text-2xl font-semibold text-blue-500 mb-4">Job Details</h2>
              {detail.map((job, index) => (

                <DetailCard
                  key={index}
                  jobTitle={job.position}
                  subCategory={job.subCategory}
                  qualification={job.qualification}
                  experience={job.experience}
                  location={job.location}
                  description={job.jobDescription}
                  companyName={job.company.company_name}
                  salary={job.salary}
                  skills={job.skills}
                  id={job._id}
                />
              ))}

            </div>
          </div>
          {/* ----------------- */}

        </div>
      }
    </div>
  )
}

export default AdminJobList
