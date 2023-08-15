import React from 'react'
import { useFormik } from 'formik';
import { AdminApi } from '../../Api/AdminApi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



function CreatePremium() {
    const navigate = useNavigate()

    const initialValues = {
        planName: '',
        description: '',
        planPrice: '',
        valid: '',
        unit: ''

    }

    const onSubmit = (values) => {
        console.log(values);
        AdminApi.post('/createPlan', { values }).then((res) => {
            toast.success(res.data.messege, {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#00FF00',
                    color: '#333',
                }
            })
            navigate('/premiumManage')
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
    };

    const validate = (values) => {
        let errors = {};

        if (!values.planName || values.planName.trim() === '') {
            errors.planName = 'required';
        }
        if (!values.description || values.description.trim() === '') {
            errors.description = 'required';
        }
        if (!values.planPrice || values.planPrice.trim() === '') {
            errors.planPrice = 'required';
        }
        if (!values.unit || values.unit.trim() === '') {
            errors.unit = 'required';
        }
        if (!values.valid) {
            errors.valid = 'required';
        }

        return errors;
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit,

    });

    return (
        <div className='flex justify-center bg-gray-200 items-center h-screen'>
            <div className="p-6 w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Create Premium Plan</h1>
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-8 gap-4">
                    {/* Plan Name */}
                    <div className='md:col-span-8'>
                        <label htmlFor="planName" className="block font-medium">
                            Plan Name:
                        </label>
                        <select
                            id="planName"
                            name="planName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.planName}
                            className="border rounded-md px-3 py-2 w-full"
                            required
                        >
                            <option value="" >
                                Select a plan
                            </option>
                            <option value="Basic Plan">Basic Plan</option>
                            <option value="Standard Plan">Standard Plan</option>
                            <option value="Advanced Plan">Advanced Plan</option>
                        </select>
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.planName && formik.errors.planName ? formik.errors.planName : ''}
                        </div>
                    </div>

                    {/* Plan Description */}
                    <div className='md:col-span-8'>
                        <label htmlFor="planDescription" className="block font-medium">
                            Plan Description:
                        </label>
                        <textarea
                            id="planDescription"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className="border rounded-md px-3 py-2 w-full resize-none"
                            required
                        />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : ''}
                        </div>
                    </div>

                    {/* Plan Price */}
                    <div className='md:col-span-8'>
                        <label htmlFor="planPrice" className="block font-medium">
                            Plan Price:
                        </label>
                        <input
                            type="text"
                            id="planPrice"
                            name="planPrice"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.planPrice}
                            className="border rounded-md px-3 py-2 w-full"
                            required
                        />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.planPrice && formik.errors.planPrice ? formik.errors.planPrice : ''}
                        </div>
                    </div>

                    {/* Plan Duration */}
                    <div className='md:col-span-2'>
                        <label htmlFor="planDuration" className="block font-medium">
                            Duration Value:
                        </label>
                        <input
                            type='Number'
                            id="valid"
                            name="valid"
                            placeholder='Enter value of Duration'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.valid}
                            className="border rounded-md px-3 py-2 w-full"
                            required
                        />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.valid && formik.errors.valid ? formik.errors.valid : ''}
                        </div>
                    </div>

                    {/* Other fields can be added here */}
                    <div className='md:col-span-6'>
                        <label htmlFor="planName" className="block font-medium">
                            Plan Duration Unit (Days,Months,Years):
                        </label>
                        <select
                            id="unit"
                            name="unit"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.unit}

                            className="border rounded-md px-3 py-2 w-full"
                            required
                        >
                            <option value="" >
                                Select Duration Unit
                            </option>
                            <option value="days">Days</option>
                            <option value="months">Months</option>
                            <option value="years">Years</option>
                        </select>
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.unit && formik.errors.unit ? formik.errors.unit : ''}
                        </div>
                    </div>
                    {/* Save and Create Button */}
                    <div className='col-span-8 md:col-span-4'>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                        >
                            Create Premium Plan
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default CreatePremium
