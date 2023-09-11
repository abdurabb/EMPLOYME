import React, { useEffect, useState } from 'react'
import { AdminApi } from '../../Api/AdminApi'
import ReactApexChart from 'react-apexcharts';

function DashboardList() {
    const [category, setCategory] = useState([])
    const [company, setCompany] = useState([])
    const [user, setUser] = useState([])
    const [plans, setPlans] = useState([])
    const [options, setOptions] = useState({
        options: {
            chart: {
                width: 380,
                type: 'pie',
            }
        }
    })
    // const [blockedUser, setBlockedUser] = useState([44, 55])
    let blockedUser = [1]
    const [series, setSeries] = useState([44, 55, 13, 43])
    const labels = ['Team A', 'Team B']
    useEffect(()=>{
        let blocked = user.reduce((acc,cur)=>{
            if(cur.isBlocked === true ){
                acc++;
            }
            return acc;
        },0)
        
        
        blockedUser.push(blocked)
        console.log(blockedUser);
    },[user])
    useEffect(() => {
        function fetchDatas() {
            AdminApi.get('/fetchDatas').then((res) => {
                setCategory(res.data.categoryData)
                setCompany(res.data.companyData)
                setUser(res.data.userData)
                setPlans(res.data.plans)
            }).catch((err) => {
                console.log(err);
            })

        }
        fetchDatas()
    }, [])





    return (
        <>

            <div className="container mx-auto p-4  mt-24 xl:ml-32 ">
                <div className=" ml-32 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">

                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-xl font-semibold mb-2">Users</h1>
                        <p className="text-gray-600 mb-2">{user.length}</p>
                        {/* Add any additional content here */}
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-xl font-semibold mb-2">Companies</h1>
                        <p className="text-gray-600 mb-2">{company.length}</p>
                        {/* Add any additional content here */}
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-xl font-semibold mb-2">Categories</h1>
                        <p className="text-gray-600 mb-2">{category.length}</p>
                        {/* Add any additional content here */}
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-xl font-semibold mb-2">Plans</h1>
                        <p className="text-gray-600 mb-2">{plans.length}</p>
                        {/* Add any additional content here */}
                    </div>
                </div>
            </div>

            {/* Chart  */}

            <div className="container mx-auto p-4   xl:ml-32 ">
                <div className=" ml-32  grid grid-cols-1 md:grid-cols-2  gap-4 ">


                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="w-full  md:w-1/2 text-center">
                            <div className="chart-wrap">
                                <h1 className="flex text-red-500">Users</h1>
                                <ReactApexChart options={options} series={blockedUser}  type="donut" width={380} />
                            </div>
                        </div>
                        {/* Add any additional content here */}
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="w-full  md:w-1/2 text-center">
                            <div className="pie-chart">
                                <h1 className="flex text-red-500">Companies</h1>
                                <ReactApexChart labels={labels} options={options} series={series} type="pie" width={380} />
                            </div>
                        </div>
                        {/* Add any additional content here */}
                    </div>
                </div>
            </div>
        </>

    )
}

export default DashboardList
