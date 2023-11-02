import React, { useState, useEffect } from 'react';
import { UserApi } from '../Api/UserApi';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
// import { auth, firebase } from '../firebase/config'
import { toast } from 'react-hot-toast';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'


function UserRegistration() {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false);
    const [otp, setOtp] = useState('')
    // const [result, setResult] = useState({})
    const [image, setImage] = useState()
    // const [phone, setPhone] = useState()
    // const [verify, setVerify] = useState()//firebase verify storing in state for use resend otp

    // ----------
    const [remainingTime, setRemainingTime] = useState(); // Set the initial countdown time in seconds
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);


    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setTimeout(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [remainingTime]);

    // --------


    const initialValues = {
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
        zipCode: '',
        password: '',
        password2: '',

    };

    const otpSubmit = async (e) => {
        try {
            e.preventDefault()
            // const confirm = await result.confirm(otp)
            // console.log(confirm);

            const values = formik.values;

            // const storage = getStorage();
            const storageRef = ref(storage, `images/userImages/${image.name}`);
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url);
                    UserApi.post('/registerUser', { values, url, otp }).then((res) => {
                        toast.success('Successfully Registred', {
                            duration: 3000,
                            position: 'top-center',
                            style: {
                                background: '#00FF00',
                                color: '#333',
                            }
                        })
                        navigate('/login')
                    }).catch((err) => {
                        console.log(err);
                        console.log('in user image upload and post user Details ');

                        toast.error('Incorect Otp', {
                            duration: 3000,
                            position: 'top-center',
                            style: {
                                background: '#ff0000',
                                color: '#fff',
                            },
                        });



                    })
                }).catch((err) => {
                    console.log(err);
                })

            }).catch((err) => {
                console.log(err);
            })

        } catch (error) {
            console.log(error + 'error in otp submit side');
            toast.error('Incorect Otp', {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#ff0000',
                    color: '#fff',
                },
            });
        }
    }

    // const resentHandle = async(values) => {
    //     // console.log(phone+'asdf');
    //     // console.log(verify+'sdaf');
    //     // setIsSubmitDisabled(true);

    //     // auth.signInWithPhoneNumber(phone, verify).then((res) => {
    //     //     setResult(res)
    //     //     // setModal(true)
    //     //     alert('then in ressend')
    //     // }).catch((err) => {
    //     //     console.log(err);
    //     //     alert('catch')
    //     //     console.log('otp error');
    //     // })
    //     try {
    //         console.log('this is values section');
    //         console.log(values);
    //         // let userCheck = await UserApi.post('/resendOtp',{values})
    //         setRemainingTime(60);
    //         setIsSubmitDisabled(false);
    //     } catch (error) {
    //     }
    // }

    const handleLogin = async () => {
        navigate('/login')
    }

    const onSubmit = async (values) => {
        // const phoneNum = `+91${values.phone}`
        // setPhone(phoneNum)
        console.log('onsubmit');

        try {
            let userCheck = await UserApi.post('/userCheck', { values })
            console.log(userCheck);

            // let verify1 = await new firebase.auth.RecaptchaVerifier('recaptcha-container')
            // console.log(verify1);
            //  setVerify(verify1)


            // auth.signInWithPhoneNumber(phoneNum, verify1).then((res) => {
            //     setResult(res)
            setModal(true)
            setRemainingTime(60)
            setIsSubmitDisabled(false)
            // }).catch((err) => {
            //     console.log(err);
            //     console.log('otp error');
            // })



        } catch (err) {
            console.log(err + 'on submit side error');
            toast.error(err.response.data.error, {
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

        if (!values.password2 || values.password2.trim() === '') {
            errors.password2 = 'required';
        } else if (values.password !== values.password2) {
            errors.password2 = 'Password Not Matched';
        }




        return errors;
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    return (
        <>
            {modal && (
                <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12">
                    <div className="relative bg-gray-100 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                            <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <div className="font-semibold text-3xl">

                                    <p>Email Verification</p>
                                </div>
                                <div className="flex flex-row text-sm font-medium text-gray-400">
                                    <p>We have sent a code to your Email </p>
                                </div>
                            </div>

                            <div>
                                <form onSubmit={otpSubmit} >

                                    {/* -------------- */}
                                    {/* ... Your existing JSX ... */}
                                    {remainingTime > 0 ? (
                                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p className='text-red-800 text-bold'>Time Out {remainingTime} seconds</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p className='text-red-800 text-bold'>OTP Timeout</p>
                                        </div>
                                    )}
                                    {/* --------------- */}

                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                            <div className="h-16">
                                                <input onChange={(e) => { setOtp(e.target.value) }} required className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />

                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                {!isSubmitDisabled ?

                                                    <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm" >
                                                        Verify Email
                                                    </button>
                                                    : ''}

                                            </div>


                                            {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                                <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" target="_blank" rel="noopener noreferrer">Resend</a>
                                            </div> */}
                                        </div>
                                    </div>
                                </form>
                                {isSubmitDisabled ? <button type='submit' onClick={formik.handleSubmit} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-red-700 border-none text-white text-sm shadow-sm" >
                                    Resent Otp
                                </button> : ''}

                            </div>
                        </div>
                    </div>
                </div>

            )}
            {/* ------------------------ */}
            {!modal && (
                <>

                    <section className='bg-gray-50 min-h-screen flex items-center justify-center '>
                        {/* Sign Up container */}
                        <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-6xl p-5'>
                            {/* form */}
                            <div className='md:w-1/2 px-16 ' >
                                <h2 className='font-bold flex justify-center text-2xl text-[#002074]'>Sign Up</h2>
                                <p className='text-sm flex justify-center mt-4 text-[#002074]'>Sign In</p>
                                <form action="" onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>

                                    {/* --- first row---- */}
                                    <div className="flex  inputRow">
                                        <div className="inputControl">
                                            <input
                                                className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="First Name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.firstName}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''}
                                            </div>
                                        </div>

                                        <div className="inputControl">
                                            <input
                                                className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.lastName}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ----Second Row---- */}
                                    <div className=" flex  inputRow">
                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                name="dob"
                                                placeholder="Date of Birth"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.dob}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.dob && formik.errors.dob ? formik.errors.dob : ''}
                                            </div>
                                        </div>

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
                                    {/* ----------Third Row--------- */}
                                    <div className="flex  inputRow">
                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="email"
                                                name="email"
                                                placeholder="Enter Email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.email && formik.errors.email
                                                    ? formik.errors.email
                                                    : ''}
                                            </div>
                                        </div>

                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                name="phone"
                                                placeholder="Phone number"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.phone}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.phone && formik.errors.phone
                                                    ? formik.errors.phone
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                    {/* -------Forth Row--------- */}
                                    <div className="flex inputRow">
                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                name="qualification"
                                                placeholder="qualification"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.qualification}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.qualification && formik.errors.qualification
                                                    ? formik.errors.qualification
                                                    : ''}
                                            </div>
                                        </div>
                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                name="post"
                                                placeholder="Your Profession"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.post}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.post && formik.errors.post ? formik.errors.post : ''}
                                            </div>
                                        </div>


                                    </div>
                                    {/* -----------Fifth Row--------- */}
                                    <div className=" flex inputRow">
                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                name="address"
                                                placeholder="Address"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.address}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.address && formik.errors.address
                                                    ? formik.errors.address
                                                    : ''}
                                            </div>
                                        </div>

                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                name="district"
                                                placeholder="District"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.district}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.district && formik.errors.district
                                                    ? formik.errors.district
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                    {/* --------------Sixth Row----------------- */}
                                    <div className="flex inputRow">
                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                placeholder="State"
                                                name="state"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.state}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.state && formik.errors.state ? formik.errors.state : ''}
                                            </div>
                                        </div>

                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                placeholder="country"
                                                name="country"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.country}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.country && formik.errors.country
                                                    ? formik.errors.country
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                    {/* ---------------seventh Row--------------------- */}
                                    <div className="flex inputRow">
                                        <div className=" inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="text"
                                                name="zipCode"
                                                placeholder="Zip Code"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.zipCode}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.zipCode && formik.errors.zipCode
                                                    ? formik.errors.zipCode
                                                    : ''}
                                            </div>
                                        </div>

                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5 "
                                                type="file"
                                                placeholder="Image"
                                                name="image"
                                                onChange={(e) => {
                                                    setImage(e.target.files[0])
                                                }}

                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.image && formik.errors.image
                                                    ? formik.errors.image
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                    {/* ---------------------Eighth row------------------- */}
                                    <div className="flex inputRow">
                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.password && formik.errors.password
                                                    ? formik.errors.password
                                                    : ''}
                                            </div>
                                        </div>

                                        <div className="inputControl">
                                            <input className="p-2  rounded-xl border w-4/5"
                                                type="password"
                                                name="password2"
                                                placeholder="Confirm Password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password2}
                                                required
                                            />
                                            <div className="error" style={{ color: 'red' }}>
                                                {formik.touched.password2 && formik.errors.password2
                                                    ? formik.errors.password2
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                    {/* ------------------------------ */}
                                    {/* <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} /> */}
                                    <button type='submit' className='bg-[#002074] rounded-xl text-white py-2 hover:scale-105 duration-300'>Sign Up</button>
                                    <div id='recaptcha-container'>

                                    </div>
                                </form>



                                {/* <p className=' text-xs border-b py-4'>Forgot your passwo?</p> */}

                                <div className='mt-3 text-sm flex justify-between items-center'>
                                    <p> If You have Already  an Account...</p>
                                    <button onClick={handleLogin} className='py-2 px-3 bg-white border rounded-xl  hover:scale-110 duration-300' >Login</button>
                                </div>

                            </div>

                            {/* image */}
                            <div className='md:block hidden pt-14  w-1/2  '>
                                <img className='h-96 object-cover rounded-2xl ' src="login2.jpg" alt="" />

                                <p className='py-5 text-xl flex justify-center  uppercase'> <span className='text-gray-800 font-bold'>Employ</span><span className='text-amber-600 font-bold'>Me</span></p>
                            </div>
                        </div>
                    </section>

                </>

            )}

        </>
    );
}

export default UserRegistration;
