import React, { useEffect, useState } from 'react'
import { AdminApi } from '../../Api/AdminApi'

function DashboardList() {
    const [category, setCategory] = useState([])
    const [company, setCompany] = useState([])
    const [user, setUser] = useState([])
    const [plans,setPlans] = useState([])
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
        <div className="container mx-auto p-4  mt-24 xl:ml-32">
            <div className=" ml-32 mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

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

    )
}

export default DashboardList
