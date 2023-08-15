import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik'
import { CompanyApi } from '../../Api/CompanyApi'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase/config';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

function EditProfileList() {

    const [category, setCategory] = useState([])
    const [companyData, setCompanyData] = useState()
    const [preview, setPreview] = useState()
    const [image, setImage] = useState()

    const navigate = useNavigate()
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const encodedUserData = searchParams.get('data');
    const company = encodedUserData ? JSON.parse(decodeURIComponent(encodedUserData)) : null;

    const handleUpdate = () => {
        if(image){
        const id = companyData._id;
        const storageRef = ref(storage, `images/companyImage/${image.name}`);
        uploadBytes(storageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                CompanyApi.patch('/updateImage', { id, url }).then((res) => {
                    toast.success(res.data.messege, {
                        duration: 3000,
                        position: 'top-center',
                        style: {
                            background: '#00FF00',
                            color: '#333',
                        }
                    })
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
        company_name: '',
        gstNumber: '',
        email: '',
        mobile: '',
        category: '',
        address: '',
        licence: '',
        employeeNumber: '',
        country: ''
    }
    const onSubmit = (values) => {
        CompanyApi.put('/updateProfile', { values }).then((res) => {
            toast.success(res.data.messege, {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#00FF00',
                    color: '#333',
                }
            })
            navigate('/company_profile')
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
        let errors = {}

        if (!values.company_name || values.company_name.trim() === '') {
            errors.company_name = 'required';
        } else if (!/^[^\s].*$/.test(values.company_name)) {
            errors.company_name = 'should not start with a space.';
        }

        if (!values.gstNumber || values.gstNumber.trim() === '') {
            errors.gstNumber = 'required';
        } else if (!/^[^\s].*$/.test(values.gstNumber)) {
            errors.gstNumber = 'should not start with a space.';
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

        if (!values.category || values.category.trim() === '') {
            errors.category = 'required'
        }

        if (!values.address || values.address.trim() === '') {
            errors.address = 'required'
        } else if (!/^[^\s].*$/.test(values.address)) {
            errors.address = 'should not start with a space.';
        }

        if (!values.country || values.country.trim() === '') {
            errors.country = 'required';
        } else if (!/^[^\s].*$/.test(values.country)) {
            errors.country = 'should not start with a space.';
        }

        if (!values.employeeNumber) {
            errors.employeeNumber = 'required'
        } else if (!/^[^\s].*$/.test(values.employeeNumber)) {
            errors.employeeNumber = 'should not start with a space.';
        }

        if (!values.licence || values.licence.trim() === '') {
            errors.licence = 'required'
        } else if (!/^[^\s].*$/.test(values.licence)) {
            errors.licence = 'should not start with a space.';
        }

        return errors;
    }


    const formik = useFormik({
        initialValues,
        validate,
        onSubmit,

    });

    useEffect(() => {

        CompanyApi.get('/categoryGet').then((res) => {
            setCategory(res.data.data)
        })

        CompanyApi.get(`/company_profileData?id=${company}`).then((res) => {
            setCompanyData(res.data.data)

            formik.values.id = res.data.data._id
            formik.values.company_name = res.data.data.company_name
            formik.values.gstNumber = res.data.data.gstNumber
            formik.values.email = res.data.data.email
            formik.values.mobile = res.data.data.mobile
            formik.values.category = res.data.data.category
            formik.values.address = res.data.data.address
            formik.values.licence = res.data.data.licence
            formik.values.employeeNumber = res.data.data.employeeNumber
            formik.values.country = res.data.data.country

        })
    }, [])

    return (
        <div>
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
                                : companyData ? <img
                                    src={companyData ? companyData.Image : ''}
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
                                <button className='bg-blue-500 text-white rounded-xl p-0' onClick={handleUpdate} >Save Image</button>

                            </div>

                            {/* ----------------------------- */}
                            <div className="max-w-md mx-auto p-4">
                                <form onSubmit={formik.handleSubmit} className="grid grid-cols-8 gap-4">
                                    {/* First Row */}
                                    <div className="col-span-8 ">
                                        <label htmlFor="jobTitle" className="block font-medium">Company Name</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.company_name}
                                            type="text" id="company name" name="company_name" placeholder="Enter Company Name" required className="w-full border border-gray-300 rounded-xl p-2" />

                                        <div className="error" style={{ color: 'red' }}>
                                            {formik.touched.company_name && formik.errors.company_name ? formik.errors.company_name : ''}
                                        </div>
                                    </div>

                                    {/* second row first col */}
                                    <div className="col-span-4">
                                        <label htmlFor="jobTitle" className="block font-medium">GST Number:</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.gstNumber}
                                            type="text" id="lastName" name="gstNumber" placeholder="Enter GST Number" required className="w-full border border-gray-300 rounded-xl p-2" />
                                        <div className="error" style={{ color: 'red' }}>
                                            {formik.touched.gstNumber && formik.errors.gstNumber ? formik.errors.gstNumber : ''}
                                        </div>
                                    </div>

                                    {/* Second Row second Col */}
                                    <div className="col-span-4">
                                        <label htmlFor="" className="block font-medium">Licence Number:</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.licence}
                                            type="text" id="licence" name="licence" placeholder="Enter Licence Number" required className="w-full border border-gray-300 rounded-xl p-2" />
                                        <div className="error" style={{ color: 'red' }}>
                                            {formik.touched.licence && formik.errors.licence ? formik.errors.licence : ''}
                                        </div>
                                    </div>

                                    {/* third Row first col */}

                                    <div className="col-span-4">
                                        <label htmlFor="" className="block font-medium">Mobile Number:</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.mobile}
                                            type="text" id="" name="mobile" placeholder="Enter Mobile Number  " required className="w-full border border-gray-300 rounded-xl p-2" />
                                        <div className="error" style={{ color: 'red' }}>
                                            {formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : ''}
                                        </div>
                                    </div>

                                    {/* third Row  second col */}
                                    <div className="col-span-4">
                                        <label htmlFor="" className="block font-medium">Email:</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            type='text' id="email" name="email" placeholder="Enter Email" required className="w-full border border-gray-300 rounded-xl p-2 resize-none" />
                                        <div className="error" style={{ color: 'red' }}>
                                            {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                                        </div>
                                    </div>



                                    {/* forth row  */}
                                    <div className="col-span-4">
                                        <label htmlFor="" className=" block font-medium">Company Category:</label>
                                        {/* <div className="inputControl"> */}
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
                                        {/* </div> */}
                                    </div>

                                    {/* forth row  secod */}
                                    <div className="col-span-4">
                                        <label htmlFor="salary" className="block font-medium">Employee Number:</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.employeeNumber}
                                            type="text" id="address" name="employeeNumber" placeholder="Enter Employee Number" className="w-full border border-gray-300 rounded-xl p-2" />
                                        <div className="error" style={{ color: 'red' }}>
                                            {formik.touched.employeeNumber && formik.errors.employeeNumber ? formik.errors.employeeNumber : ''}
                                        </div>
                                    </div>

                                    {/* fifth row */}
                                    <div className="col-span-4">
                                        <label htmlFor="" className="block font-medium">Address:</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.address}
                                            type="text" id="district" name="adress" placeholder="Enter Address" className="w-full border border-gray-300 rounded-xl p-2" />
                                        <div className="error" style={{ color: 'red' }}>
                                            {formik.touched.address && formik.errors.address ? formik.errors.address : ''}
                                        </div>
                                    </div>

                                    {/* fifth row second col */}
                                    <div className="col-span-4">
                                        <label htmlFor="" className="block font-medium">Country:</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.country}
                                            type="text" id="country" name="country" placeholder="Enter Country" className="w-full border border-gray-300 rounded-xl p-2" />
                                        <div className="error" style={{ color: 'red' }}>
                                            {formik.touched.country && formik.errors.country ? formik.errors.country : ''}
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
        </div>
    )
}

export default EditProfileList
