import React from 'react'
import { useFormik } from 'formik';
import { CompanyApi } from '../../Api/CompanyApi'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function JobPostForm() {

    const navigate = useNavigate()
    const onSubmit = (values) => {
        let token = localStorage.getItem('CompanyToken')
        if (token) {
            try {
                const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode the base64 payload
                if (tokenPayload && tokenPayload.id) {
                    let id = tokenPayload.id; // Return the company ID
                    CompanyApi.post('/jobPost', { values, id }).then((res) => {
                        toast.success(res.data.messege, {
                            duration: 3000,
                            position: 'top-center',
                            style: {
                                background: '#00FF00',
                                color: '#333',
                            }
                        })
                        navigate('/hire_history')
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
                } else {
                    console.error('Invalid token or missing companyId claimmmm.');
                }
            } catch (error) {
                console.error('Error decoding token:', error.message);
            }
        } else {
            console.error('CompanyToken not found in localStorage.');
        }
    }

    const initialValues = {
        position: '',
        subCategory: '',
        qualification: '',
        skills: '',
        jobDescription: '',
        location: '',
        salary: '',
        experience: ''
    }


    const validate = (values) => {
        let errors = {};

        if (!values.position || values.position.trim() === '') {
            errors.position = 'Required ';
        }

        if (!values.subCategory || values.subCategory.trim() === '') {
            errors.subCategory = 'Required ';
        }

        if (!values.qualification || values.qualification.trim() === '') {
            errors.qualification = 'Required ';
        }

        if (!values.skills || values.skills.trim() === '') {
            errors.skills = 'Required ';
        }

        if (!values.jobDescription || values.jobDescription.trim() === '') {
            errors.jobDescription = 'Required ';
        }

        if (!values.location || values.location.trim() === '') {
            errors.location = 'Required ';
        }

        if (!values.salary || values.salary.trim() === '') {
            errors.salary = 'Required ';
        }

        if (!values.experience || values.experience.trim() === '') {
            errors.experience = 'Required'
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
            <div className="max-w-md mx-auto p-4">
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-3 gap-4">
                    {/* First Row */}
                    <div className="col-span-3">
                        <label htmlFor="jobTitle" className="block font-medium">Job Position:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.position}
                            type="text" id="position" name="position" placeholder="Enter job Position" required className="w-full border border-gray-300 rounded p-2" />

                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.position && formik.errors.position ? formik.errors.position : ''}
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="col-span-3">
                        <label htmlFor="jobTitle" className="block font-medium">Sub Category:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.subCategory}
                            type="text" id="subCategory" name="subCategory" placeholder="Enter Sub Category" required className="w-full border border-gray-300 rounded p-2" />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.subCategory && formik.errors.subCategory ? formik.errors.subCategory : ''}
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="col-span-3">
                        <label htmlFor="jobTitle" className="block font-medium">Qualifications:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.qualification}
                            type="text" id="qualification" name="qualification" placeholder="Enter Qualifications" required className="w-full border border-gray-300 rounded p-2" />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.qualification && formik.errors.qualification ? formik.errors.qualification : ''}
                        </div>
                    </div>

                    {/* Forth Row */}
                    <div className="col-span-3">
                        <label htmlFor="jobTitle" className="block font-medium">Experience:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.experience}
                            type="text" id="experience" name="experience" placeholder="Enter Exprience" required className="w-full border border-gray-300 rounded p-2" />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.experience && formik.errors.experience ? formik.errors.experience : ''}
                        </div>
                    </div>

                    {/* Forth Row */}
                    <div className="col-span-3">
                        <label htmlFor="jobTitle" className="block font-medium">Skills:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.skills}
                            type="text" id="skills" name="skills" placeholder="Enter Skills" required className="w-full border border-gray-300 rounded p-2" />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.skills && formik.errors.skills ? formik.errors.skills : ''}
                        </div>
                    </div>

                    {/* Fifth Row */}
                    <div className="col-span-3">
                        <label htmlFor="jobDescription" className="block font-medium">Job Description:</label>
                        <textarea
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.jobDescription}
                            id="jobDescription" name="jobDescription" placeholder="Enter job description" required className="w-full border border-gray-300 rounded p-2 resize-none" />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.jobDescription && formik.errors.jobDescription ? formik.errors.jobDescription : ''}
                        </div>
                    </div>

                    {/* Seventh Row */}
                    <div className="col-span-2">
                        <label htmlFor="jobLocation" className="block font-medium">Job Location:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.location}
                            type="text" id="location" name="location" placeholder="Enter job location" required className="w-full border border-gray-300 rounded p-2" />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.location && formik.errors.location ? formik.errors.location : ''}
                        </div>
                    </div>

                    {/* Additional Column */}
                    <div className="col-span-1">
                        <label htmlFor="salary" className="block font-medium">Salary:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.salary}
                            type="text" id="salary" name="salary" placeholder="Enter salary" className="w-full border border-gray-300 rounded p-2" />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.salary && formik.errors.salary ? formik.errors.salary : ''}
                        </div>
                    </div>

                    <button type="submit" className="col-span-3 bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded">Post Job</button>
                </form>
            </div>
        </div>
    )
}

export default JobPostForm
