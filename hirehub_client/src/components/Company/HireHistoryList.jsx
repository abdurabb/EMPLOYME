import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { CompanyApi } from '../../Api/CompanyApi'
import {useNavigate } from 'react-router-dom';

function HireHistoryList() {
    const navigate=useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        let token = localStorage.getItem('CompanyToken')
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.id) {
                const id = decodedToken.id
                CompanyApi.get(`/postedJobs?id=${id}`).then((res) => {
                    setData(res.data.data)
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }, [data])

    const statusHandle = (id) => {
        CompanyApi.patch(`/jobStatusChange?id=${id}`).then((res) => {
            console.log('success');
        }).catch((err) => {
            console.log(err + 'error founded');
        })
    }
    const editHandle = (id) => {
        navigate(`/edit_jobs?data=${encodeURIComponent(id)}`) 
    }
    const handleAddNewJob = ()=>{
        navigate('/postJob')
    }
    return (
        <div>

            <div className="bg-gray-200 p-4">
                <div className='text-end'>
                    <button onClick={handleAddNewJob} className='bg-indigo-500 text-white mb-4 rounded-xl p-2'>Post New Job</button>
                </div>
                <table className="w-full bg-white rounded-lg shadow-lg">
                    <thead className="bg-indigo-600  text-white">
                        <tr>
                            <th className="px-4 py-2">Job Title</th>
                            <th className="px-4 py-2">Sub Category</th>
                            <th className="px-4 py-2">Qualification</th>
                            <th className="px-4 py-2">Skills</th>
                            <th className="px-4 py-2">Job Location</th>
                            <th className="px-4 py-2">Salary</th>
                            <th className="px-4 py-2">Experience</th>
                            <th className="px-4 py-2">Edit</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {data.map((job) => (
                            <tr key={job.id} className="border-b border-gray-300">
                                <td className="px-4 py-2">{job.position}</td>
                                <td className="px-4 py-2">{job.subCategory}</td>
                                <td className="px-4 py-2">{job.qualification}</td>
                                <td className="px-4 py-2">{job.skills}</td>
                                <td className="px-4 py-2">{job.location}</td>
                                <td className="px-4 py-2">{job.salary}</td>
                                <td className="px-4 py-2">{job.experience}</td>
                                <td className="px-4 py-2">
                                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={editHandle.bind(null, job._id)}>
                                        Edit
                                    </button>
                                </td>
                                <td className="px-4 py-2">
                                    {job.hiringClosed ?
                                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded' onClick={statusHandle.bind(null, job._id)}>Not Hiring</button>
                                        : <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded' onClick={statusHandle.bind(null, job._id)}>Hiring</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HireHistoryList
