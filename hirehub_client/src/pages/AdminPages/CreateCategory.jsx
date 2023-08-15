import React from 'react'
import { useFormik } from 'formik'
import { AdminApi } from '../../Api/AdminApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
function CreateCategory() {
    const navigate = useNavigate()
    // -----------------
    const initialValues = {
        name: '',
        description: '',
    }

    const onSubmit = async (values) => {
        try {
            AdminApi.post('/createCategory', { values }).then((res) => {
                toast.success(res.data.messege, {
                    duration: 3000,
                    position: 'top-center',
                    style: {
                        background: '#00FF00',
                        color: '#333',
                    }
                })
                navigate('/category')
            })
        } catch (error) {
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

        if (!values.name || values.name.trim() === '') {
            errors.name = 'required';
        }

        if (!values.description || values.description.trim() === '') {
            errors.description = 'required';
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

            <div className="flex items-center justify-center bg-gray-100 h-screen">
                <form onSubmit={formik.handleSubmit} className="w-full bg-gray-200 max-w-md p-6 bg-white rounded shadow">
                    <h2 className="text-2xl font-bold mb-6">Category Form</h2>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <div className="error" style={{ color: 'red' }}>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : ''}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
                    >
                        Submit
                    </button>
                </form>
            </div>

        </div>
    )
}

export default CreateCategory
