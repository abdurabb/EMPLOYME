import React, { useEffect, useState } from 'react'
import { UserApi } from '../../Api/UserApi'
import { useNavigate } from 'react-router-dom';

function SectionLandPage() {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        UserApi.get('/latestJobLIst').then((res) => {
            setJobs(res.data.latestJob)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    console.log(jobs);
    return (
        <div>
            <div className='mt-2 bg-gray-200 font-[Poppins]'>
                <h1 className='ml-2 mt-2 text-3xl text-gray-800 font-bold'>Latest Job Listing</h1>


                <div class="flex flex-wrap justify-center">
                    {jobs.map((job, index) => {
                        return (
                            <div key={index} class="w-full md:w-1/2 lg:w-1/4 p-4">
                                <div class="bg-blue-100 rounded-lg p-4">
                                    <img src={job.company.Image} className='w-full  h-32' alt="Job Image" class="w-full h-auto mb-4" />

                                    <div className='mt-2'>
                                        <h3 class="text-xl font-semibold mb-2">Position :  {job.position}</h3>
                                        <p class="text-gray-600"> Company :  {job.company.company_name}</p>
                                        <p class="text-gray-600"> Location : {job.location}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='flex justify-center mb-4'>
                    <button className='bg-indigo-500 mb-4 p-2 rounded-xl text-white' onClick={() => {
                        navigate('/jobListing')
                    }}>Search Your Dream Jobs</button>
                </div>
            </div>

        </div>
    )
}

export default SectionLandPage
