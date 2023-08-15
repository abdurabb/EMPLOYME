import React, { useEffect, useState } from 'react';
import { UserApi } from '../../Api/UserApi'
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


function Jobs() {

  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [detail, setDetail] = useState()
  const [title, setTitle] = useState()
  const [location, setLocation] = useState()
  const [jobs, setJobs] = useState([])
  const [appliedJob, setAppliedJob] = useState([])



  useEffect(() => {
    let token = localStorage.getItem('UserToken')
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.id) {
        const id = decodedToken.id

        UserApi.get(`/jobData?id=${id}`).then((res) => {
          setJobs(res.data.data)
          setAppliedJob(res.data.appliedJobId)
        }).catch((err) => {
          console.log(err.response.data);
        })

      }
    } else {
      UserApi.get('/jobData').then((res) => {
        setJobs(res.data.data)
      }).catch((err) => {
        console.log(err.response.data);
      })
    }
  }, [])

  const handleDetails = (id) => {
    setModal(true)
    const filterDetail = jobs.filter(function (job) {
      return job._id === id;
    });
    setDetail(filterDetail)
  }
  const searchHandle = () => {
    UserApi.get(`/jobData?title=${title}&location=${location}`).then((res) => {
      setJobs(res.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  const applyHandle = async (id) => {
    let token = localStorage.getItem('UserToken')
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.id) {
        const ids = decodedToken.id
        const user = await UserApi.get(`/userData?id=${ids}`)
        const userData = user.data.data


        if (userData.hasPlan) {
          const today = new Date();
          const planEndingDateObject = new Date(userData.planEndingDate);
          if (today < planEndingDateObject) {
            navigate(`/jobApply?data=${encodeURIComponent(id)}`)

          } else {
            navigate(`/planList?data=${encodeURIComponent(id)}`)
            toast.error('Your Plan Experied', {
              duration: 5000,
              position: 'top-center',
              style: {
                background: '#ff0000',
                color: '#fff',
              },
            });
          }
        } else {
          navigate(`/planList?data=${encodeURIComponent(id)}`)
          toast.error('Only Premium Member Can Apply the Job', {
            duration: 5000,
            position: 'top-center',
            style: {
              background: '#ff0000',
              color: '#fff',
            },
          });
        }

      }
    } else {
      navigate('/login')
    }
  }

  const JobCard = ({ jobTitle, subCategory, id, qualification, image, experience, location, companyName, salary, skills }) => {
    const matched = appliedJob.find((element) => {
      return (
        element === id)
    })
    return (
      <div className=" text-center bg-gray-100 shadow-md p-4 rounded-md">
        <img className=' w-full  h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56' src={image} alt="" />
        <h2 className="text-xl font-semibold mb-2 flex justify-center">{jobTitle}</h2>
        <p className="text-gray-600 mb-4">Company :{companyName}</p>
        <p className="text-gray-700">Job Location-{location}</p>

        <div className='mt-4 flex justify-between'>
          {matched ?
            <button className="px-4 ml-2 py-2 bg-red-500 hover:bg-red-700 text-white rounded flex justify-center" >
              Already Applied
            </button> :
            <button className="px-4 ml-2 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded flex justify-center" onClick={applyHandle.bind(null, id)}>
              Apply Now
            </button>
          }
          <button className="px-4 ml-2 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded flex justify-center" onClick={handleDetails.bind(null, id)}>
            Details
          </button>
        </div>


      </div>
    );
  };
  const DetailCard = ({ jobTitle, subCategory, id, qualification, description, experience, location, companyName, salary, skills }) => {
    const matched = appliedJob.find((element) => {
      return (
        element === id)
    })
    return (
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
          {matched ?
            <button className="px-4 w-full py-2 bg-red-500 hover:bg-red-700 text-white rounded " >
              Already Applied
            </button>
            :
            <button className="px-4 w-full py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded " onClick={applyHandle.bind(null, id)}>
              Apply Now
            </button>
          }

        </div>


      </div>
    );
  };

  return (
    <div>

      <div className="bg-gray-100 ">
        {!modal ?
          <div className="container  mx-auto p-4">
            <div className="flex flex-col items-center mb-4 sm:flex-row sm:justify-center  sm:items-center w-full">
              <input
                className="px-4 py-2 border rounded-md w-64 mr-4"
                type="search"
                placeholder="Job Title"
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
              <input
                className="px-4 py-2 border rounded-md w-64"
                type="search"
                placeholder="Location"
                onChange={(e) => {
                  setLocation(e.target.value)
                }}
              />
              <button className="px-4 ml-2 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md" onClick={searchHandle}>
                Search
              </button>

            </div>

            <h1 className="text-3xl font-bold mb-4 text-center">JOB LISTING</h1>

            <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4">
              {

                jobs.map((job, index) => (

                  <JobCard
                    key={index}
                    image={job.company.Image}
                    jobTitle={job.position}
                    subCategory={job.subCategory}
                    qualification={job.qualification}
                    experience={job.experience}
                    location={job.location}
                    companyName={job.company.company_name}
                    salary={job.salary}
                    skills={job.skills}
                    id={job._id}
                  />


                ))}
            </div>
          </div>
          :
          // After Click the Job Details
          <div className="container  mx-auto p-4">
            {/* <h1>{detail}</h1> */}
            {console.log(detail)}
            {/* ----------------- */}
            <div className="bg-gray-200 flex justify-center items-center h-screen">

              <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className='text-end'>
                  <button className='' onClick={() => {
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
    </div>

  );
}

export default Jobs;
