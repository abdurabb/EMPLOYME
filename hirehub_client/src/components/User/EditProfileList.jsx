import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik'
import { UserApi } from '../../Api/UserApi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase/config';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';


function EditProfileList() {
  const [userData, setUserData] = useState()
  const [preview, setPreview] = useState()
  const [image,setImage]=useState()

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const encodedUserData = searchParams.get('data');
  const user = encodedUserData ? JSON.parse(decodeURIComponent(encodedUserData)) : null;

  const handleUpdate = () => {
    const id=userData._id;
    const storageRef = ref(storage, `images/userImages/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        UserApi.post('/updateImage', { id, url }).then((res) => {
          toast.success(res.data.messege, {
            duration: 3000,
            position: 'top-center',
            style: {
              background: '#00FF00',
              color: '#333',
            }
          })
          // navigate('/profile')
        }).catch((err) => {
          toast.error(err.response.data.error, {
            duration: 5000,
            position: 'top-center',
            style: {
              background: '#ff0000',
              color: '#fff',
            },
          });
        })
      })
    })
  }

  const handleImagePreview = (e) => {
    const selectedImage = e.target.files[0]
    setImage(e.target.files[0])

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result)
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreview(null);
    }
  }

  const initialValues = {
    id: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    qualification: '',
    address: '',
    post: '',
    district: '',
    state: '',
    country: '',
    zipCode: ''
  }

  const onSubmit = (values) => {
    UserApi.post('/updateProfile', { values }).then((res) => {
      toast.success(res.data.messege, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#00FF00',
          color: '#333',
        }
      })
      navigate('/profile')
    }).catch((err) => {
      toast.error(err.response.data.error, {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#ff0000',
          color: '#fff',
        },
      });
    })
  }

  const validate = (values) => {
    let errors = {};

    if (!values.firstName || values.firstName.trim() === '') {
      errors.firstName = 'required';
    } else if (!/^[^\s].*$/.test(values.firstName)) {
      errors.firstName = 'should not start with a space.';
    }

    if (!values.lastName || values.lastName.trim() === '') {
      errors.lastName = 'required';
    } else if (!/^[^\s].*$/.test(values.lastName)) {
      errors.lastName = 'should not start with a space.';
    }

    if (!values.dob || values.dob.trim() === '') {
      errors.dob = 'required';
    } else {
      const dobFormat = /^\d{4}-\d{2}-\d{2}$/;

      if (!dobFormat.test(values.dob)) {
        errors.dob = 'Invalid date format. Please enter a date in the format YYYY-MM-DD.';
      } else {
        const dobDate = new Date(values.dob);
        const currentDate = new Date();

        if (isNaN(dobDate)) {
          errors.dob = 'Invalid date. Please enter a valid date.';
        } else if (dobDate > currentDate) {
          errors.dob = 'Date of birth cannot be in the future.';
        }
      }
    }

    if (!values.gender || values.gender.trim() === '') {
      errors.gender = 'required';
    }


    if (!values.email || values.email.trim() === '') {
      errors.email = 'required';
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.email
      )
    ) {
      errors.email = 'invalid email';
    } else if (!/^[^\s].*$/.test(values.email)) {
      errors.email = 'should not start with a space.';
    }

    if (!values.phone || values.phone.trim() === '') {
      errors.phone = 'required';
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = 'Invalid phone number'
    }

    if (!values.qualification || values.qualification.trim() === '') {
      errors.qualification = 'required';
    } else if (!/^[^\s].*$/.test(values.qualification)) {
      errors.qualification = 'should not start with a space.';
    }

    if (!values.address || values.address.trim() === '') {
      errors.address = 'required';
    } else if (!/^[^\s].*$/.test(values.address)) {
      errors.address = 'should not start with a space.';
    }

    if (!values.post || values.post.trim() === '') {
      errors.post = 'required';
    } else if (!/^[^\s].*$/.test(values.post)) {
      errors.post = 'should not start with a space.';
    }

    if (!values.district || values.district.trim() === '') {
      errors.district = 'required';
    } else if (!/^[^\s].*$/.test(values.district)) {
      errors.district = 'should not start with a space.';
    }


    if (!values.state || values.state.trim() === '') {
      errors.state = 'required';
    } else if (!/^[^\s].*$/.test(values.state)) {
      errors.state = 'should not start with a space.';
    }

    if (!values.country || values.country.trim() === '') {
      errors.country = 'required';
    } else if (!/^[^\s].*$/.test(values.country)) {
      errors.country = 'should not start with a space.';
    }

    if (!values.zipCode || values.zipCode.trim() === '') {
      errors.zipCode = 'required';
    } else if (!/^[^\s].*$/.test(values.zipCode)) {
      errors.zipCode = 'should not start with a space.';
    }


    return errors;
  }
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,

  });

  useEffect(() => {
    UserApi.get(`/profileData?id=${user}`).then((res) => {
      setUserData(res.data.data)
      
      // ----------------
      formik.values.id = res.data.data._id
      formik.values.firstName = res.data.data.first_name
      formik.values.lastName = res.data.data.last_name
      formik.values.dob = res.data.data.dob
      formik.values.gender = res.data.data.gender
      formik.values.email = res.data.data.email
      formik.values.phone = res.data.data.mobile
      formik.values.qualification = res.data.data.qualification
      formik.values.address = res.data.data.address
      formik.values.post = res.data.data.post
      formik.values.district = res.data.data.district
      formik.values.state = res.data.data.state
      formik.values.country = res.data.data.country
      formik.values.zipCode = res.data.data.zipCode
      // ----------------
    }).catch((err) => {
      console.log(err);
    })
  }, [])


  return (
    <div>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
          <div className="bg-blue-500 text-white text-center py-4">
            <h1 className="text-2xl font-semibold">Update Profile</h1>
          </div>
          <div className="px-6 py-4">
            {preview ?
              <img
                src={preview ? preview : ''}
                alt=""
                className="w-32 h-32 rounded-full mx-auto"
              />
              : userData ? <img
                src={userData ? userData.Image : ''}
                alt=""
                className="w-32 h-32 rounded-full mx-auto"
              /> : <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' className="w-32 h-32 rounded-full mx-auto" alt='' />}


            <div className='flex justify-between p-0'>
              {/* <button className='bg-blue-500 text-white rounded-xl p-1'>Edit Image</button> */}
              {/* <input type="text" placeholder='Edit Image' className='bg-blue-500 text-white rounded-xl p-1 w-1/4'/> */}

              <div className='bg-blue-500 text-white rounded-xl  w-1/4'>
                <input className=" opacity-0"
                  type="file"
                  name='image'
                  onChange={handleImagePreview}
                  placeholder='Image'
                  accept="image/*"
                  id="fileInput"
                  required />

                <p className='pl-3'>Edit Image</p>
              </div>
              <button className='bg-blue-500 text-white rounded-xl p-0' onClick={handleUpdate}>Save Image</button>
            </div>

            {/* ----------------------------- */}
            <div className="max-w-md mx-auto p-4">
              <form onSubmit={formik.handleSubmit} className="grid grid-cols-8 gap-4">
                {/* First Row */}
                <div className="col-span-4 ">
                  <label htmlFor="jobTitle" className="block font-medium">First Name</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    type="text" id="firstName" name="firstName" placeholder="Enter FirstName" required className="w-full border border-gray-300 rounded-xl p-2" />

                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''}
                  </div>
                </div>

                {/* first row second col */}
                <div className="col-span-4">
                  <label htmlFor="jobTitle" className="block font-medium">Last Name:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required className="w-full border border-gray-300 rounded-xl p-2" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''}
                  </div>
                </div>

                {/* Second Row */}
                <div className="col-span-3">
                  <label htmlFor="jobTitle" className="block font-medium">Qualifications:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.qualification}
                    type="text" id="qualification" name="qualification" placeholder="Qualification" required className="w-full border border-gray-300 rounded-xl p-2" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.qualification && formik.errors.qualification ? formik.errors.qualification : ''}
                  </div>
                </div>

                {/* second Row second col */}
                <div className="col-span-2">
                  <label htmlFor="jobTitle" className="block font-medium">Gender</label>
                  <select
                    className="w-full border border-gray-300 rounded-xl p-2"
                    type='dropdown'
                    name="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.gender && formik.errors.gender ? formik.errors.gender : ''}
                  </div>
                </div>

                {/* second Row third col */}
                <div className="col-span-3">
                  <label htmlFor="jobTitle" className="block font-medium">Date of Birth:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dob}
                    type="text" id="dob" name="dob" placeholder="Date Of Birth" required className="w-full border border-gray-300 rounded-xl p-2" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.dob && formik.errors.dob ? formik.errors.dob : ''}
                  </div>
                </div>

                {/* third Row  */}
                <div className="col-span-5">
                  <label htmlFor="jobDescription" className="block font-medium">Email:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    type='text' id="email" name="email" placeholder="Enter Email" required className="w-full border border-gray-300 rounded-xl p-2 resize-none" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                  </div>
                </div>

                {/* third Row second col */}
                <div className="col-span-3">
                  <label htmlFor="jobLocation" className="block font-medium">Mobile :</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    type="text" id="phone" name="phone" placeholder="Enter Phone Number" required className="w-full border border-gray-300 rounded-xl p-2" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
                  </div>
                </div>

                {/* forth row  */}
                <div className="col-span-3">
                  <label htmlFor="salary" className="block font-medium">Post:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.post}
                    type="text" id="post" name="post" placeholder="Enter post" className="w-full border border-gray-300 rounded-xl p-2" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.post && formik.errors.post ? formik.errors.post : ''}
                  </div>
                </div>

                {/* forth row  secod */}
                <div className="col-span-5">
                  <label htmlFor="salary" className="block font-medium">Address:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    type="text" id="address" name="address" placeholder="Enter Address" className="w-full border border-gray-300 rounded-xl p-2" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.address && formik.errors.address ? formik.errors.address : ''}
                  </div>
                </div>

                {/* fifth row */}
                <div className="col-span-4">
                  <label htmlFor="salary" className="block font-medium">District:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.district}
                    type="text" id="district" name="district" placeholder="Enter District" className="w-full border border-gray-300 rounded-xl p-2" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.district && formik.errors.district ? formik.errors.district : ''}
                  </div>
                </div>

                {/* fifth row second col */}
                <div className="col-span-4">
                  <label htmlFor="salary" className="block font-medium">State:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.state}
                    type="text" id="state" name="state" placeholder="Enter State" className="w-full border border-gray-300 rounded-xl p-2" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.state && formik.errors.state ? formik.errors.state : ''}
                  </div>
                </div>
                {/* sixth row  */}
                <div className="col-span-4">
                  <label htmlFor="salary" className="block font-medium">Country:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                    type="text" id="country" name="country" placeholder="Enter Country" className="w-full border border-gray-300 rounded-xl p-2" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.country && formik.errors.country ? formik.errors.country : ''}
                  </div>
                </div>

                {/* sixth row sec-col  */}
                <div className="col-span-4">
                  <label htmlFor="salary" className="block font-medium">Zip Code:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.zipCode}
                    type="text" id="zipcode" name="zipCode" placeholder="Enter ZipCode" className="w-full border border-gray-300 rounded-xl p-2" />
                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.zipCode && formik.errors.zipCode ? formik.errors.zipCode : ''}
                  </div>
                </div>

                <div className="bg-blue-500 text-white text-center  col-span-8">
                  <button type='submit' className='bg-blue-500 hover:bg-blue-800 rounded-xl font-semibold p-3'
                  >Update Profile</button>
                </div>

              </form>
            </div>
            {/* ------------------------- */}

          </div>


        </div>
      </div>
    </div >
  )
}

export default EditProfileList
