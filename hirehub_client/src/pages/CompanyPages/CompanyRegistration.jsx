import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { CompanyApi } from '../../Api/CompanyApi'
import { toast } from 'react-hot-toast';
import { storage } from '../../firebase/config';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

function CompanyRegistration() {
    const [category, setCategory] = useState([])
    const [image, setImage] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        CompanyApi.get('/categoryGet').then((res) => {
            setCategory(res.data.data)
        })
    }, [])

    const initialValues = {
        name: '',
        gst: '',
        phone: '',
        email: '',
        category: '',
        address: '',
        password: '',
        password2: '',
        licence: '',
        employeeNum: '',
        country: ''
    }
    const handleLogin = () => {
        navigate('/companyLogin')
    }
    const onSubmit = async (values) => {
        try {

            
            const companyCheck = await CompanyApi.post(`/companyCheck`,{values})
            console.log(companyCheck);
            const storageRef = ref(storage, `images/companyImages/${image.name}`);
            uploadBytes(storageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    CompanyApi.post('/companyRegistration', { values, url }).then((res) => {
                        toast.success(res.data.messege, {
                            duration: 3000,
                            position: 'top-center',
                            style: {
                                background: '#00FF00',
                                color: '#333',
                            }
                        })
                        navigate('/companyLogin')
                        
                    }).catch((err) => {
                        toast.error(err.response.data.error, {
                            duration: 3000,
                            position: 'top-center',
                            style: {
                                background: '#ff0000',
                                color: '#fff',
                            },
                        });
                    })
                })
            }).catch((err) => {
                console.log(err + 'company image upload');
            })

        } catch (error) {
            toast.error(error.response.data.error, {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#ff0000',
                    color: '#fff',
                },
            });
        }
    };



    const validate = (values) => {
        let errors = {};

        if (!values.name || values.name.trim() === '') {
            errors.name = 'required';
        } else if (!/^[^\s].*$/.test(values.name)) {
            errors.name = 'should not start with a space.';
        }

        if (!values.gst || values.gst.trim() === '') {
            errors.gst = 'required'
        } else if (!/^[^\s].*$/.test(values.gst)) {
            errors.gst = 'should not start with a space.';
        }

        if (!values.licence || values.licence.trim() === '') {
            errors.licence = 'required'
        } else if (!/^[^\s].*$/.test(values.licence)) {
            errors.licence = 'should not start with a space.';
        }

        if (!values.employeeNum || values.employeeNum.trim() === '') {
            errors.employeeNum = 'required'
        } else if (!/^[^\s].*$/.test(values.employeeNum)) {
            errors.employeeNum = 'should not start with a space.';
        }

        if (!values.category || values.category.trim() === '') {
            errors.category = 'required'
        }

        if (!values.phone || values.phone.trim() === '') {
            errors.phone = 'required'
        } else if (!/^\d{10}$/.test(values.phone)) {
            errors.phone = 'Invalid phone number'
        }

        if (!values.address || values.address.trim() === '') {
            errors.address = 'required'
        } else if (!/^[^\s].*$/.test(values.address)) {
            errors.address = 'should not start with a space.';
        }


        if (!values.email || values.email.trim() === '') {
            errors.email = 'required';
        } else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                values.email
            )
        ) {
            errors.email = 'invalid email';
        }


        if (!values.country || values.country.trim() === '') {
            errors.country = 'required';
        } else if (!/^[^\s].*$/.test(values.country)) {
            errors.country = 'should not start with a space.';
        }

        if (!values.password || values.password.trim() === '') {
            errors.password = 'required';
        } else if (values.password.length < 6) {
            errors.password = 'Password should be at least 6 characters long.';
        } else if (!/\d/.test(values.password)) {
            errors.password = 'Password should contain at least one digit.';
        } else if (!/[!@#$%^&*]/.test(values.password)) {
            errors.password = 'Password should contain at least one special character (!@#$%^&*).';
        } else if (!/[A-Z]/.test(values.password)) {
            errors.password = 'Password should contain at least one uppercase letter.';
        }

        if (!values.password2 || values.password2.trim() === "") {
            errors.password2 = 'required'
        } else if (values.password2 !== values.password) {
            errors.password2 = 'Password Not Match'
        }
        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });


    return (
        <div>
            <section className='bg-gray-50 min-h-screen flex items-center justify-center '>
                {/* login container */}
                <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-6xl p-5'>
                    {/* form */}
                    <div className='md:w-1/2 px-16' >
                        <h2 className='flex justify-center font-bold text-2xl text-[#002074]'>Company Registration</h2>
                        <p className='flex justify-center text-sm  text-[#002074]'> Please Register</p>
                        <form action="" onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
                            <div className="flex  inputRow">
                                <div className="inputControl">
                                    <input className="p-2  rounded-xl border w-4/5"
                                        type="text"
                                        name='name'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                        placeholder='Company Name'
                                        required />

                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                                    </div>
                                </div>

                                <div className="inputControl">
                                    <input className="p-2  rounded-xl border w-4/5"
                                        type="text"
                                        name='gst'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.gst}
                                        placeholder='Enter Gst Number'
                                        required />

                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.gst && formik.errors.gst ? formik.errors.gst : ''}
                                    </div>
                                </div>

                            </div>


                            <div className="flex  inputRow">
                                <div className="inputControl">
                                    <input className="p-2  rounded-xl border w-4/5"
                                        type="text"
                                        name='licence'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.licence}
                                        placeholder='Licence Number'
                                        required />

                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.licence && formik.errors.licence ? formik.errors.licence : ''}
                                    </div>
                                </div>

                                <div className="inputControl">
                                    <input className="p-2  rounded-xl border w-4/5"
                                        type="text"
                                        name='employeeNum'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.employeeNum}
                                        placeholder='Employee Number'
                                        required />

                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.employeeNum && formik.errors.employeeNum ? formik.errors.employeeNum : ''}
                                    </div>
                                </div>

                            </div>

                            <div className="flex  inputRow">
                                <div className="inputControl">
                                    <input className="p-2  rounded-xl border w-4/5"
                                        type="email"
                                        name='email'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        placeholder='Enter Email'
                                        required />
                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                                    </div>
                                </div>

                                <div className="inputControl">
                                    <input className="p-2  rounded-xl border w-4/5"
                                        type="text"
                                        name='phone'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                        placeholder='Enter Phone Number'
                                        required />
                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
                                    </div>
                                </div>

                            </div>


                            <div className="flex inputRow">
                                <div className="inputControl">
                                    <div className='ml-4  w-4/5'>
                                        <select
                                            className="p-2 ml-4 rounded-xl border w-5/4"
                                            name="category"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.category}
                                            required
                                        >

                                            <option value='' className='w-4/5'>Company Type</option>
                                            {category.map((item) => (
                                                <option key={item._id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.category && formik.errors.category ? formik.errors.category : ''}
                                    </div>
                                </div>

                                <div className="inputControl">
                                    <div className=' ml-10 '>
                                        <input className="p-2  rounded-xl border w-4/5"
                                            type="text"
                                            name='address'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.address}
                                            placeholder='Address'
                                            required />
                                    </div>
                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.address && formik.errors.address ? formik.errors.address : ''}
                                    </div>
                                </div>

                            </div>

                            <div className="flex  inputRow">
                                <div className="inputControl">
                                    <input className="p-2  rounded-xl border w-4/5"
                                        type="text"
                                        name='country'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.country}
                                        placeholder='Enter country'
                                        required />

                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.country && formik.errors.country ? formik.errors.country : ''}
                                    </div>
                                </div>

                                <div className="inputControl">
                                    <div className="relative w-4/5">
                                        <input className="p-2  rounded-xl border w-4/5 opacity-0"
                                            type="file"
                                            name='image'
                                            onChange={(e) => {
                                                setImage(e.target.files[0])
                                            }}
                                            // placeholder='Image'
                                            accept="image/*"
                                            id="fileInput"
                                            required />

                                        <input
                                            className="absolute top-0 left-0 w-full h-full p-2 rounded-xl border cursor-pointer"
                                            placeholder='Company Image'
                                            onClick={() => {
                                                document.getElementById('fileInput').click();
                                            }}
                                            value={image?.name || 'Image'}
                                            required
                                            tabIndex='-1'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex  inputRow">
                                <div className="inputControl">
                                    <input className="p-2  rounded-xl border w-4/5"
                                        type="password"
                                        name='password'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        placeholder='Enter Password'
                                        required />

                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                    </div>
                                </div>

                                <div className="inputControl">
                                    <input className="p-2  rounded-xl border w-4/5"
                                        type="password"
                                        name='password2'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password2}
                                        placeholder='Confirm Password'
                                        required />

                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.password2 && formik.errors.password2 ? formik.errors.password2 : ''}
                                    </div>
                                </div>
                            </div>

                            <button className='bg-[#002074] rounded-xl text-white py-2 hover:scale-105 duration-300'>Login In</button>
                        </form>

                        {/* <p className=' text-xs border-b py-4'>Forgot your passwo?</p> */}

                        <div className='mt-3 text-sm flex justify-between items-center'>
                            <p>You  have  an account...</p>
                            <button className='py-2 px-3 bg-white border rounded-xl  hover:scale-110 duration-300' onClick={handleLogin}>Login</button>
                        </div>

                    </div>

                    {/* image */}
                    <div className='md:block hidden   w-1/2  '>
                        <img className='h-96 object-cover rounded-2xl ' src="login2.jpg" alt="" />

                        <p className='flex justify-center py-5 text-xl  uppercase'> <span className='text-gray-800 font-bold'>Employ</span><span className='text-amber-600 font-bold'>Me</span></p>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default CompanyRegistration
