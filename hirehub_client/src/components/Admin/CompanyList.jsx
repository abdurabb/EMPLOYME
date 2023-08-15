import React, { useEffect, useState } from 'react'
import { AdminApi } from '../../Api/AdminApi'

function CompanyList() {
    const [data, setData] = useState([])
    const [status, setStatus] = useState('')

    useEffect(() => {
        AdminApi.get('/companyData').then((res) => {
            setData(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [data,status])


    const approveHandle = (event, id) => {
        console.log(event, id);
        AdminApi.patch(`/updateStatus`, { event, id }).then((res) => {
            setStatus(res.data.applicationStatus)
        }).catch((err) => {
            console.log(err);
        })


    }

    return (
        <div>
            {data.length > 0 ?
                <div className='flex justify-center pt-4 ml-14 ' >
                    <table className="bg-white border border-gray-300 table-auto  ">
                        <thead>
                            <tr>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Sl-No</th>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Image</th>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Name</th>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Address</th>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Phone</th>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Email</th>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Company Type</th>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Gst Number</th>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Licence</th>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Employee Nuber</th>
                                <th className="py-3 px-6 bg-gray-100 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((data, index) => {
                                return (
                                    <tr>
                                        <td className="py-4 px-6 border-b border-gray-300">{index + 1}</td>
                                        <td className="py-4 px-6 border-b border-gray-300"> {data.Image ? <img class="w-10 h-10 rounded-full" src={data.Image} alt=""></img> : ' '}</td>
                                        <td className="py-4 px-6 border-b border-gray-300"> {data.company_name}</td>
                                        <td className="py-4 px-6 border-b border-gray-300">{data.address}</td>
                                        <td className="py-4 px-6 border-b border-gray-300">{data.mobile}</td>
                                        <td className="py-4 px-6 border-b border-gray-300">{data.email}</td>
                                        <td className="py-4 px-6 border-b border-gray-300">{data.category}</td>
                                        <td className="py-4 px-6 border-b border-gray-300" >{data.gstNumber}</td>
                                        <td className="py-4 px-6 border-b border-gray-300" >{data.licence}</td>
                                        <td className="py-4 px-6 border-b border-gray-300" >{data.employeeNumber}</td>
                                        <td className="py-4 px-6 border-b border-gray-300" >
                                            {/* {
                                                !data.is_Approved ? (
                                                    <div><button className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                        onClick={approveHandle.bind(null, data._id)}
                                                    >Approve</button></div>
                                                ) : (
                                                    <div><button className='bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                                        onClick={approveHandle.bind(null, data._id)}
                                                    >Approved</button></div>
                                                )
                                            } */}



                                            <select className="p-2"
                                                value={data.Status}
                                                onChange={(e) => {
                                                    let confirm = window.confirm('Do You want Change the Status')
                                                    if (confirm === true) {
                                                        setStatus(e.target.value)
                                                        approveHandle(e.target.value, data._id)
                                                    }
                                                }
                                                }
                                            >
                                                <option className='bg-yellow-300 ' value="Pending">Pending</option>
                                                <option className='bg-green-500' value="Accept">Accept</option>
                                                <option className='bg-red-500' value="Reject">Reject</option>
                                            </select>


                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
                : <div>Companies Not Registred</div>}
        </div>
    )
}

export default CompanyList
