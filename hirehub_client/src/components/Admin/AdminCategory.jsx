import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminApi } from '../../Api/AdminApi'
import { toast } from 'react-hot-toast';


function AdminCategory() {
    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        AdminApi.get('/categoryData').then((res) => {
            setData(res.data.data)

        }).catch((err) => {
            console.log(err);
            console.log(err.response.data.error);
        })
    }, [data])


    const editHandle = (data) => {
        navigate(`/editCategory?data=${encodeURIComponent(data)}`)
    }


    const deleteHandle = (data) => {
        let confirm = window.confirm('do You Want delete this Category')
        if (confirm) {
            AdminApi.delete(`/deleteCategory?data=${data}`).then((res) => {
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
        }

    }

    const handleCreate = () => {
        navigate('/createCategory')
    }

    
    return (
        <>

            <div className='mt-24 xl:ml-32'>
                <div className='p-4 ml-32 '>
                    <button className='bg-red-100' onClick={handleCreate}>Create Category</button>
                </div>
                {data.length > 0 ?
                    <div className='ml-32 flex justify-center items-center ml-14 w-full h-auto overflow-x-auto overflow-y-auto' >
                        <table className=" display text-dark bg-white table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Sl-No</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Name</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Description</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Edit</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data.map((datas, index) => {
                                    return (

                                        <tr>
                                            <td className="py-4 px-6 border-b border-gray-300">{index + 1}</td>
                                            <td className="py-4 px-6 border-b border-gray-300"> {datas.name}</td>
                                            <td className="py-4 px-6 border-b border-gray-300">{datas.description}</td>
                                            <td className="py-4 px-6 border-b border-gray-300" onClick={editHandle.bind(null, datas._id)}><button>Edit</button></td>
                                            <td className="py-4 px-6 border-b border-gray-300" onClick={deleteHandle.bind(null, datas._id)}><button>Delete</button></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                    </div>

                    :
                    <div className='bg-green-100'>Please Add The Category</div>

                }
            </div>

        </>

    )
}

export default AdminCategory
