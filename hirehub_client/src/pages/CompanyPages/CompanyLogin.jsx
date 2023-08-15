import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { CompanyApi } from '../../Api/CompanyApi'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { CompanyActions } from '../../Store/CompanyAuth'

function CompanyLogin() {
    const dispatch = useDispatch()
    const [error,setError]=useState()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState()

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    const handleRegister = () => {
        navigate('/companyRegistration')
    }

    const initialValues = {
        email: '',
        password: '',
    }

    const onSubmit = async (values) => {
        try {
            CompanyApi.post('/companyLogin', { values }).then((res) => {

                // Redux
                const result = res.data.CompanyLogin
                
                if (result.status) {
                    dispatch(CompanyActions.companyAddDetails({ name: result.name, token: result.token, companyId: result.companyId }))
                } else {
                    setError(result.message)
                    console.log(error);
                    console.log(result.message);
                }


                // Local Storage
                localStorage.setItem('CompanyToken', res.data.obj.token)
                navigate('/companyHome')
                // window.location.reload()

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
        } catch (error) {
            alert(error.response.data.error)
        }
    };

    const validate = (values) => {
        let errors = {};

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
        onSubmit,
        validate,
    });


    return (
        <div>
            <div>

                <section className='bg-gray-50 min-h-screen flex items-center justify-center '>
                    {/* login container */}
                    <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5'>
                        {/* form */}
                        <div className='md:w-1/2 px-16' >

                            <h2 className='flex justify-center font-bold text-2xl text-[#002074]'>Company Login</h2>
                            <p className='flex justify-center text-sm mt-4 text-[#002074]'>if you already a member, easily log in</p>
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
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        placeholder='Enter Password'
                                        required />

                                    <div className="error" style={{ color: 'red' }}>
                                        {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                    </div>

                                    <svg onClick={handleShowPassword} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className=" hover:cursor-pointer bi bi-eye-fill absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg>
                                </div>

                                <button className='bg-[#002074] rounded-xl text-white py-2 hover:scale-105 duration-300'>Login In</button>
                            </form>
                            <div className='mt-10 grid grid-col-3 item-center text-gray-500'>
                                <hr className='outline-gray-500' />
                                <p className='text-center text-sm'>OR</p>
                                <hr className='outline-gray-500' />
                            </div>

                            {/* <button className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="16" fill="currentColor" className="bi bi-google mr-3" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg>
                                Login With Google</button> */}

                            {/* <p className=' text-xs border-b py-4'>Forgot your passwo?</p> */}

                            <div className='mt-3 text-sm flex justify-between items-center'>
                                <p>Don't have an account...</p>
                                <button className='py-2 px-3 bg-white border rounded-xl  hover:scale-110 duration-300' onClick={handleRegister}>Register</button>
                            </div>

                        </div>

                        {/* image */}
                        <div className='md:block hidden   w-1/2  '>
                            <img className='h-96 object-cover rounded-2xl ' src="login2.jpg" alt="" />

                            <p className='flex justify-center py-5 text-xl  uppercase'> <span className='text-gray-800 font-bold'>Employ</span><span className='text-amber-600 font-bold'>Me</span></p>
                        </div>
                    </div>
                </section>




            </div>
        </div>
    )
}

export default CompanyLogin
