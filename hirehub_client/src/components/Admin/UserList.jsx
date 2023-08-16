import React, { useEffect, useState } from 'react'
import { AdminApi } from '../../Api/AdminApi'
import { toast } from 'react-hot-toast';


function UserList() {
    const [data, setDatas] = useState([])
    useEffect(() => {
        AdminApi.get('/userData').then((res) => {
            setDatas(res.data.data)

        }).catch((err) => {
            console.log(err.response.data.error);
        })
    }, [data])

    const blockHandle = (data) => {
        let confirm = window.confirm('Do You Want Update This Action')
        if (confirm) {
            AdminApi.get(`/blockHandle?data=${data}`).then((res) => {
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
    return (

        <>
            <div className='mt-24 xl:ml-32'>


                {data.length > 0 ?
                    <div className='ml-32 flex justify-center pt-4 ml-14 w-full h-auto overflow-x-auto overflow-y-auto' >
                        <table className="bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Sl-No</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">image</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Name</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Gender</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Phone</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Email</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">qualification</th>
                                    <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data, index) => {
                                    return (
                                        <tr>
                                            <td className="py-4 px-6 border-b border-gray-300">{index + 1}</td>
                                            <td className="py-4 px-6 border-b border-gray-300"> <img class="w-10 h-10 rounded-full" src={data.Image} alt="Rounded avatar"></img></td>
                                            <td className="py-4 px-6 border-b border-gray-300">{data.first_name}</td>
                                            <td className="py-4 px-6 border-b border-gray-300">{data.gender}</td>
                                            <td className="py-4 px-6 border-b border-gray-300">{data.mobile}</td>
                                            <td className="py-4 px-6 border-b border-gray-300">{data.email}</td>
                                            <td className="py-4 px-6 border-b border-gray-300" >{data.qualification}</td>
                                            <td className="py-4 px-6 border-b border-gray-300">{
                                                data.isBlocked ? (
                                                    <div><button className='bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"'
                                                        onClick={blockHandle.bind(null, data._id)}>UnBlock</button></div>
                                                ) : (
                                                    <div ><button className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                        onClick={blockHandle.bind(null, data._id)}>Block</button></div>
                                                )
                                            }</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                    :
                    <div className='bg-green-100'>No User Data Here</div>
                }
            </div>
        </>

    )
}

export default UserList
