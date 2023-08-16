import React, { useEffect, useState } from 'react'
import { AdminApi } from '../../Api/AdminApi'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast';

function AdminProfileList() {
  const [adminData, setAdminData] = useState()
  const [modal, setModal] = useState(false)


  const initialValues = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
  }

  const onSubmit = (values) => {
    AdminApi.put('/updateProfile', { values }).then((res) => {
      toast.success(res.data.messege, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#00FF00',
          color: '#333',
        }
      })
      setModal(false)
    }).catch((err) => {
      console.log(err);
    })
  }
  const validate = (values) => {
    let errors = {}

    if (!values.first_name || values.first_name.trim() === '') {
      errors.first_name = 'required';
    } else if (!/^[^\s].*$/.test(values.first_name)) {
      errors.first_name = 'should not start with a space.';
    }

    if (!values.last_name || values.last_name.trim() === '') {
      errors.last_name = 'required';
    } else if (!/^[^\s].*$/.test(values.last_name)) {
      errors.last_name = 'should not start with a space.';
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

    if (!values.gender) {
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

    if (!values.mobile || values.mobile.trim() === '') {
      errors.mobile = 'required';
    } else if (!/^\d{10}$/.test(values.mobile)) {
      errors.mobile = 'Invalid phone number'
    }

    return errors;
  }
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,

  });


  useEffect(() => {
    AdminApi.get('/profileData').then((res) => {
      setAdminData(res.data.data[0])

      formik.values.id = res.data.data[0]._id
      formik.values.first_name = res.data.data[0].first_name
      formik.values.last_name = res.data.data[0].last_name
      formik.values.email = res.data.data[0].email
      formik.values.mobile = res.data.data[0].mobile
      formik.values.dob = res.data.data[0].dob
      formik.values.gender = res.data.data[0].gender

    }).catch((err) => {
      console.log(err);
    })
  }, [modal])

  return (
    <div className='flex bg-gray-100 w-full ml:24 ml:14 mt-24 xl:ml-32 '>
      <div>
        <div className=" min-h-screen p-8 ml:24 mt-24 xl:ml-32">
          <div className="w-screen max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div className="bg-indigo-400 text-white text-center py-4">
              <h1 className="text-2xl font-semibold">Admin  Profile</h1>
            </div>

            <div className="px-6 py-4">

              <div className="mt-6">
                <p className="text-gray-700 py-2 font-bold">Admin Name: {adminData ? adminData.first_name + ' ' + adminData.last_name : ''}</p>
                <p className="text-gray-700 py-2 font-bold">Date of Birth: {adminData ? adminData.dob : ''}</p>
                <p className="text-gray-700 py-2 font-bold">Gender: {adminData ? adminData.gender : ''}</p>
                <p className="text-gray-700 py-2 font-bold">Phone: {adminData ? adminData.mobile : ''}</p>
                <p className="text-gray-700 py-2 font-bold">Email: {adminData ? adminData.email : ''}</p>

              </div>
            </div>
            <div className="bg-indigo-400 text-white text-center py-3">
              <button className='bg-blue-500 hover:bg-blue-800 rounded-xl font-semibold p-3'
                onClick={() => {
                  setModal(true)
                }}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- */}
      {modal ?
        <div>
          <div className=" min-h-screen p-8  mt-24 ">
            <div className="w-screen max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-indigo-400 text-white text-center py-4">
                <h1 className="text-2xl font-semibold">Update Profile</h1>
              </div>

              <form onSubmit={formik.handleSubmit} className="p-4 grid grid-cols-8 gap-4">
                {/* First Row */}
                <div className="col-span-4 ">
                  <label htmlFor="jobTitle" className="block font-medium">First Name</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                    type="text" id="" name="first_name" placeholder="Enter First Name" required className="w-full border border-gray-300 rounded-xl p-2" />

                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : ''}
                  </div>
                </div>

                {/* first Row 2nd */}
                <div className="col-span-4 ">
                  <label htmlFor="" className="block font-medium">Last Name</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                    type="text" id="" name="last_name" placeholder="Enter Last Name" required className="w-full border border-gray-300 rounded-xl p-2" />

                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : ''}
                  </div>
                </div>

                {/* second Row */}
                <div className="col-span-4 ">
                  <label htmlFor="" className="block font-medium">Date of Birth</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dob}
                    type="text" id="" name="dob" placeholder="Enter Date of Birth " required className="w-full border border-gray-300 rounded-xl p-2" />

                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.dob && formik.errors.dob ? formik.errors.dob : ''}
                  </div>
                </div>

                {/* Second Row 2nd */}
                <div className="col-span-4 ">
                  <label htmlFor="" className="block font-medium">Gender</label>
                  <div className="inputControl">

                    <select
                      className="p-2 ml-0 rounded-xl border w-3/4"
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
                      {formik.touched.gender && formik.errors.gender
                        ? formik.errors.gender
                        : ''}
                    </div>
                  </div>
                </div>

                {/* Third Row */}
                <div className="col-span-4 ">
                  <label htmlFor="" className="block font-medium">Mobile Number</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                    type="text" id="" name="mobile" placeholder="Enter Mobile Number" required className="w-full border border-gray-300 rounded-xl p-2" />

                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : ''}
                  </div>
                </div>

                {/* third Row 2nd */}
                <div className="col-span-4 ">
                  <label htmlFor="" className="block font-medium">Email</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    type="text" id="" name="email" placeholder="Enter Email" required className="w-full border border-gray-300 rounded-xl p-2" />

                  <div className="error" style={{ color: 'red' }}>
                    {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                  </div>
                </div>


                <div className="col-span-8 bg-indigo-400  text-white text-center py-3">
                  <button className='bg-blue-500 hover:bg-blue-800 rounded-xl font-semibold p-3'
                  >update  Profile</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        : ''}
      {/* ---------------- */}
    </div>

  )
}

export default AdminProfileList
