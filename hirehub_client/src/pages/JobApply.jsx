import React, { useState, useEffect } from 'react'
import { UserApi } from '../Api/UserApi';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-hot-toast';
import UserHeader from '../components/User/UserHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';




function JobApply() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState('')
  const [job, setJob] = useState()

  const [sslcCertificate, setSslcCertificate] = useState()
  const [plusTwoCertificate, setPlusTwoCertificate] = useState()
  const [degreeCertificate, setDegreeCertificate] = useState()
  const [otherCertificate, setOtherCertificate] = useState()
  const [cv, setCv] = useState()




  const urlData = {}

  const initialValues = {
    skill: '',
    experience: '',
    plustwo: '',
    degree: '',
    otherQualification: '',
  }

  const onSubmit = (values) => {
    console.log(values);

    const sslcStorageRef = ref(storage, `documents/userDocuments/${sslcCertificate.name}`);
    const plusTwoStorageRef = ref(storage, `documents/userDocuments/${plusTwoCertificate.name}`);
    const degreeStorageRef = ref(storage, `documents/userDocuments/${degreeCertificate.name}`);
    const otherStorageRef = ref(storage, `documents/userDocuments/${otherCertificate.name}`);
    const cvStorageRef = ref(storage, `documents/userDocuments/${cv.name}`);

    // 'file' comes from the Blob or File API
    uploadBytes(sslcStorageRef, sslcCertificate).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        urlData.sslcUrl = url;



        // Plus Two Certificate Storing
        uploadBytes(plusTwoStorageRef, plusTwoCertificate).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);
            urlData.plusTwoUrl = url;


            // Degree Certificate Storing
            uploadBytes(degreeStorageRef, degreeCertificate).then((snapshot) => {
              getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
                urlData.degreeUrl = url;


                // other qualification certificate storing
                uploadBytes(otherStorageRef, otherCertificate).then((snapshot) => {
                  getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url);
                    urlData.otherUrl = url;


                    // CV uploading 
                    uploadBytes(cvStorageRef, cv).then((snapshot) => {
                      getDownloadURL(snapshot.ref).then((url) => {
                        console.log(url);
                        urlData.cvUrl = url;

                        UserApi.post('/apply_job', { values, urlData, job, user }).then((res) => {

                          navigate('/jobListing')
                          toast.success(res.data.message, {
                            duration: 3000,
                            position: 'top-center',
                            style: {
                              background: '#00FF00',
                              color: '#333',
                            }
                          })

                        }).catch((err) => {
                          console.log(err + 'Error founded in Job application');
                          toast.error('Already Applied for this job', {
                            duration: 5000,
                            position: 'top-center',
                            style: {
                              background: '#ff0000',
                              color: '#fff',
                            },
                          });
                          navigate('/jobListing')
                        })


                      }).catch((err) => {
                        console.log(err + 'error founded in 5 cv');
                      })
                    }).catch((err) => {
                      console.log(err + 'error founded in 5 cv');
                    })

                  }).catch((err) => {
                    console.log(err + 'error founded in file upload 4 other qualification');
                  })
                }).catch((err) => {
                  console.log(err + 'error founded in file upload 4 other qualification');
                })

              }).catch((err) => {
                console.log(err + 'file uploading err 3 degree');
              })
            }).catch((err) => {
              console.log(err + 'file uploading err 3 degree');
            })

          }).catch((err) => {
            console.log(err + 'storage err 2 plustwo');
          })
        }).catch((err) => {
          console.log(err + 'Storage err 2 plustwo');
        })


      }).catch((err) => {
        console.log(err + 'file uploading err 1 sslc certificate');
      })
    }).catch((err) => {
      console.log(err + 'file uploading err 1 sslc certificate');
    })
  }

  const validate = (values) => {
    let errors = {}

    if (!values.skill || values.skill.trim() === '') {
      errors.skill = 'required';
    }

    if (!values.experience || !values.experience.trim() === '') {
      errors.experience = 'required';
    }

    if (!values.plustwo || !values.plustwo.trim() === '') {
      errors.plustwo = 'required';
    }

    if (!values.degree || !values.degree.trim() === '') {
      errors.degree = 'required';
    }

    if (!values.otherQualification || !values.otherQualification.trim() === '') {
      errors.otherQualification = 'required';
    }

    return errors;
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const data = decodeURIComponent(queryParams.get('data'));
    setJob(data)

    let token = localStorage.getItem('UserToken')
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.id) {
        const id = decodedToken.id
        setUser(id)
      }

    }
    // Function to get query parameters from the URL
    const getQueryParams = () => {
      const queryParams = new URLSearchParams(window.location.search);
      return {
        session_id: queryParams.get('session_id'),
        planId: queryParams.get('planId'),
        jobId: queryParams.get('jobId'),
      };
    };

    // Get the session ID from the URL
    const sessionData = getQueryParams();

    const sessionId = sessionData.session_id;
    const planId = sessionData.planId
    if (sessionId) {
      setJob(sessionData.jobId)
      console.log(user);
      UserApi.patch('/confirmation', { sessionId, userId: user, planId }).then((res) => {
        toast.success(res.data.messege, {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#00FF00',
            color: '#333',
          }
        })
      }).catch((err) => {
        console.log(err);

      })
    } else {
      console.log('NO Session Id');
    }
  }, [user]);

  return (
    <>
      <UserHeader />
      <div className='flex justify-center '>
        <div className=" w-1/2 text-gray-800 p-4 rounded-md shadow-lg border-xl">
          <h2 className="text-2xl uppercase mb-4 text-center bg-indigo-500 py-2 text-white">Job Application Form</h2>
          <form className="grid grid-cols-3 gap-4" onSubmit={formik.handleSubmit} >

            {/* Second Row */}
            <div className="col-span-2">
              <label >Your Skills:</label>
              <input
                type="text"
                name='skill'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.skill}
                className="border rounded-md p-2 w-full"
              />

              <div className="error" style={{ color: 'red' }}>
                {formik.touched.skill && formik.errors.skill ? formik.errors.skill : ''}
              </div>
            </div>


            <div className="col-span-1/2">
              <label >Your Experience:</label>
              <input
                type="text"
                id="experience"
                name='experience'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.experience}
                className="border rounded-md p-2 w-full"
              />
              <div className="error" style={{ color: 'red' }}>
                {formik.touched.experience && formik.errors.experience ? formik.errors.experience : ''}
              </div>
            </div>


            {/* Third Row */}
            <div className="col-span-3">
              <label htmlFor="sslc">SSLC Certificate:</label>
              <input
                type="file"
                id="sslc"
                required
                onChange={(e) => setSslcCertificate(e.target.files[0])}
                className="border rounded-md p-2 w-full"
              />
            </div>
            {/* Forth Row */}
            <div className='md:col-span-1'>
              <label htmlFor="planName" className="block font-medium">
                Your Plus Two Stream:
              </label>
              <select
                id="plustwo"
                name="plustwo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.plustwo}
                className="border rounded-md px-3 py-2 w-full"
              >
                <option value="" >
                  Select
                </option>
                <option value="science">Science</option>
                <option value="comerse">Comerse</option>
                <option value="humanities">Humanities</option>
              </select>
              <div className="error" style={{ color: 'red' }}>
                {formik.touched.plustwo && formik.errors.plustwo ? formik.errors.plustwo : ''}
              </div>
            </div>

            {/* ---- */}
            <div className="col-span-2">
              <label htmlFor="plusTwo">Plus Two Certificate:</label>
              <input
                type="file"
                id="plusTwo"

                onChange={(e) => setPlusTwoCertificate(e.target.files[0])}
                className="border rounded-md p-2 w-full"
              />
            </div>
            {/* Fifth Row */}
            <div className="col-span-1">
              <label htmlFor="name" className='"block font-medium"'>Your Degree:</label>
              <input
                type="text"
                id="degree"
                name='degree'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.degree}
                className="border rounded-md p-2 w-full"
              />
              <div className="error" style={{ color: 'red' }}>
                {formik.touched.degree && formik.errors.degree ? formik.errors.degree : ''}
              </div>
            </div>


            <div className="col-span-2">
              <label htmlFor="degree" >Degree Certificate:</label>
              <input
                type="file"
                id="degree"
                onChange={(e) => setDegreeCertificate(e.target.files[0])}
                className="border rounded-md p-2 w-full"
              />
            </div>
            {/* Seventh Row */}
            <div className="col-span-1">
              <label htmlFor="name" className='"block font-medium"'>Other Qualification:</label>
              <input
                type="text"
                id="otherQualification"
                name='otherQualification'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otherQualification}
                className="border rounded-md p-2 w-full"
              />
              <div className="error" style={{ color: 'red' }}>
                {formik.touched.otherQualification && formik.errors.otherQualification ? formik.errors.otherQualification : ''}
              </div>
            </div>



            <div className="col-span-2">
              <label htmlFor="otherQualification">Other Qualification Certificate:</label>
              <input
                type="file"
                id="otherQualification"
                onChange={(e) => setOtherCertificate(e.target.files[0])}
                className="border rounded-md p-2 w-full"
              />
            </div>
            {/* Eighth Row */}
            <div className=" col-span-3 border-dark">
              <label htmlFor="otherQualification">Upload Your CV:</label>
              <input
                type="file"
                id="otherQualification"
                onChange={(e) => setCv(e.target.files[0])}
                className="border rounded-md p-2 w-full"
              />
            </div>

            {/* Add more fields here */}
            <button type="submit" className="text-center bg-indigo-500 hover:bg-indigo-800 text-white px-4 py-2 rounded-md col-span-3">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </>

  )
}

export default JobApply
