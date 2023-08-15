import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { UserApi } from '../../Api/UserApi'
import { AiFillMessage } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

function Application() {
    const navigate = useNavigate()
    // storing application datas in this state;
    const [appData, setAppData] = useState([])
    const [userId, setUserId] = useState()


    useEffect(() => {
        let token = localStorage.getItem('UserToken')
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.id) {
                const id = decodedToken.id
                setUserId(id)
                UserApi.get(`/getApplication?id=${id}`).then((res) => {
                    setAppData(res.data.data)

                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }, [])
    const handleChat = (companyId) => {
        UserApi.post('/createNewChat', { userId, companyId }).then((res) => {
            console.log(res.data.chatId);
            navigate(`/chat`)
        }).catch((err) => {
            console.log(err + 'createnew Chat section in candidateList page');
        })
    }

    return (
        <div>
            <div>
                <div className="bg-gray-200 p-4">
                    <table className="w-full bg-white rounded-lg shadow-lg">
                        <thead className="bg-indigo-600  text-white">
                            <tr>
                                <th className="px-4 py-2">Job Title</th>
                                {/* <th className="px-4 py-2">Sub Category</th> */}
                                <th className="px-4 py-2">Company</th>
                                <th className="px-4 py-2">Job Location</th>
                                <th className="px-4 py-2">Salary</th>

                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Messege</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>

                            {appData.map((job) => (
                                <tr key={job.id} className="border-b border-gray-300">
                                    <td className="px-4 py-2">{job.job.position}</td>
                                    {/* <td className="px-4 py-2">{job.subCategory}</td> */}
                                    <td className="px-4 py-2">{job.job.company.company_name}</td>
                                    <td className="px-4 py-2">{job.job.location}</td>
                                    <td className="px-4 py-2">{job.job.salary}</td>


                                    <td className="px-4 py-2">
                                        <button className={`  text-white font-bold py-1 px-2 rounded 
                                        ${job.Status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-700' :
                                                job.Status === 'accept' ? 'bg-green-500 hover:bg-green-700' :
                                                    job.Status === 'reject' ? 'bg-red-500 hover:bg-red-700' :
                                                        job.Status === 'viewed' ? 'bg-blue-500 hover:bg-blue-700' : ''

                                            } `}>{job.Status === 'accept' ? 'Accepted' :
                                            job.Status === 'pending'?'Pending':
                                            job.Status === 'reject'?'Rejected':
                                            job.Status === 'viewed'?'Viewed':''}</button>
                                    </td>

                                    <td className="flex justify-center  px-4 py-2">
                                        <button onClick={() => {
                                            handleChat(job.job.company._id)
                                        }}>
                                            <AiFillMessage className="text-indigo-500 w-8 h-8" />
                                        </button>


                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Application
