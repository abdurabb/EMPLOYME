import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminApi } from '../../Api/AdminApi';
import { toast } from 'react-hot-toast';

function AdminPremium() {
    const [datas, setDatas] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        AdminApi.get('/premiumData').then((res) => {
            setDatas(res.data.data)
        }).catch((err) => {
            console.log('somthing Wrong' + err);
        })
    }, [datas])

    const activeHandle = (id) => {
        let confirm = window.confirm('Do you Want do this Action')
        if (confirm) {
            AdminApi.patch(`/activePremium?id=${id}`).then((res) => {
                toast.success(res.data.messege, {
                    duration: 3000,
                    position: 'top-center',
                    style: {
                        background: '#00FF00',
                        color: '#333',
                    }
                })
            }).catch((err) => {
                console.log(err);
            })
        }

    }

    const editHandle = (data)=>{
        navigate(`/editPremium?data=${encodeURIComponent(data)}`)
    }
    return (
        <>

            <div className='mt-24 xl:ml-32'>
                <div className='p-4 ml-32 '>
                    <button className='bg-red-300 border rounded-xl p-2' onClick={() => { navigate('/createPremium') }}  >Create New Premium </button>
                </div>

                {datas.length > 0 ?
                    <div className=' ml-32 flex justify-center items-center ml-14' >
                        <table className="ml-14 w-full h-auto overflow-x-auto overflow-y-auto bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Sl-No</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Name</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Description</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Plan Price</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">planDuration</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Edit</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Action</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((data, index) => {
                                    return (


                                        <tr>
                                            <td className="py-4 px-6 border-b border-gray-300">{index + 1}</td>
                                            <td className="py-4 px-6 border-b border-gray-300"> {data.planName}</td>
                                            <td className="py-4 px-6 border-b border-gray-300">{data.description}</td>
                                            <td className="py-4 px-6 border-b border-gray-300">{data.planPrice}</td>
                                            <td className="py-4 px-6 border-b border-gray-300">{data.planDuration.value + data.planDuration.unit}</td>
                                            <td className="py-4 px-6 border-b border-gray-300" ><button onClick={editHandle.bind(null,data._id)} className='border rounded-xl bg-blue-500 p-2' >Edit</button></td>

                                            {data.isActive === 'true' ? < td className="py-4 px-6 border-b border-gray-300" ><button className='bg-green-800 border rounded-xl p-2' onClick={() => { activeHandle(data._id) }}>Actived </button></td>
                                                : < td className="py-4 px-6 border-b border-gray-300" ><button className='bg-red-800 border rounded-xl p-2' onClick={() => { activeHandle(data._id) }}> NoActive </button></td>}



                                            <td className="py-4 px-6 border-b border-gray-300" ><button onClick={() => {
                                                const confirm = window.confirm('Do you want Delete')
                                                if (confirm) {
                                                    AdminApi.delete(`/deletePremium?id=${data._id}`).then((res) => {
                                                        toast.success(res.data.messege, {
                                                            duration: 3000,
                                                            position: 'top-center',
                                                            style: {
                                                                background: '#00FF00',
                                                                color: '#333',
                                                            }
                                                        })
                                                    }).catch((err) => {
                                                        console.log(err);
                                                    })
                                                }

                                            }}>Delete</button></td>
                                        </tr>


                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                    :
                    (
                        <div className='ml-4 mt-4'>
                            No Premium Created
                        </div>
                    )}

            </div >
        </>
    )
}

export default AdminPremium
