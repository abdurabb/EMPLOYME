import React, { useState } from 'react'
import { AdminApi } from '../../Api/AdminApi'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { AdminActions } from '../../Store/AdminAuth'

function AdminLogin() {
    const [error,setError] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // -----------------
    const initialValues = {
        email: '',
        password: '',
    }


    const onSubmit = async (values) => {
        try {
            await AdminApi.post('/login', { values }).then((res) => {

                // Redux---
                const result = res.data.adminLogin
                
                if (result.status) {
                    dispatch(AdminActions.adminAddDetails({ name: result.name, token: result.token, adminId: result.adminId}))
                } else {
                    setError(result.message)
                    console.log(error);
                    console.log(result.message);
                }

                // Local Storage
                localStorage.setItem('AdminToken', res.data.obj.token)
                // window.location.reload()
                navigate('/dashboard')

            })
        } catch (error) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error, {
                duration: 5000,
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


        console.log(errors);
        if (!values.email || values.email.trim() === '') {
            errors.email = 'required';
        } else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                values.email
            )
        ) {
            errors.email = 'invalid email';
        }

        if (!values.password || values.password.trim() === '') {
            errors.password = 'required';
        }

        return errors;
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit,

    });

    return (
        <div>
            <div>
                <section className='bg-gray-50 min-h-screen flex items-center justify-center '>
                    {/* login container */}
                    <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5'>
                        {/* form */}
                        <div className='md:w-1/2 px-16' >
                            <h2 className='font-bold text-2xl text-[#002074]'>Admin Login</h2>
                            <p className='text-sm mt-4 text-[#002074]'>if you Admin , easily log in</p>
                            <form action="" onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                                <input className='p-2 mt-8 rounded-xl border'
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


                                <div className='relative'>
                                    <input className='p-2  rounded-xl border w-full'
                                        type="password"
                                        name='password'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        placeholder='Enter Password'
                                        required />

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye-fill absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg>
                                </div>
                                <div className="error" style={{ color: 'red' }}>
                                    {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                </div>

                                <button type='submit' className='bg-[#002074] rounded-xl text-white py-2 hover:scale-105 duration-300'>Login In</button>
                            </form>

                        </div>

                        {/* image */}
                        <div className='md:block hidden   w-1/2  '>
                            <img className='h-86 object-cover rounded-2xl ' src="login2.jpg" alt="" />

                            <p className='flex justify-center py-5 text-xl  uppercase'> <span className='text-gray-800 font-bold'>Employ</span><span className='text-amber-600 font-bold'>Me</span></p>
                        </div>
                    </div>
                </section>




            </div>
        </div>
    )
}

export default AdminLogin
