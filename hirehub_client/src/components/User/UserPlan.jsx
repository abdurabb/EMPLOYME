import React, { useState, useEffect } from 'react'
import { UserApi } from '../../Api/UserApi'
import { useLocation } from 'react-router-dom';


function UserPlan() {
    const location = useLocation()
    const [premium, setPremium] = useState([])
    const [selectedPlan, setSelectedPlan] = useState('');
    const [jobId,setJobId]=useState()

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const data = decodeURIComponent(queryParams.get('data'));
        setJobId(data)

        UserApi.get('/premiumData').then((res) => {
            setPremium(res.data.data)
        }).catch((err) => {
            console.log('something issue' + err);
        })
    }, [])


    // Function to handel Select and submit to Payment
    const handleSelect = () => {
        const values = {
            selectedPlan,
            jobId
        }
        
        UserApi.post('/checkout', { values }).then((res) => {
            window.location.href = res.data.url
        }).catch((err) => {
            console.log(err);
        })
    }


    // Function to handle selecting a plan
    const handleSelectPlan = (planId) => {
        setSelectedPlan(planId);
    };
    return (
        <div>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-semibold mb-6 text-center text-blue-500">Select a Premium Plan</h1>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    {premium.map((plan) => (
                        <div
                            key={plan._id}
                            className={`border rounded-md p-4 cursor-pointer ${selectedPlan === plan._id ? 'bg-blue-400 text-white' : 'bg-white text-gray-800'
                                }`}
                            onClick={() => handleSelectPlan(plan._id)}
                        >
                            <h2 className="text-xl font-semibold mb-2">{plan.planName}</h2>
                            <p className="text-sm text-gray-600">{plan.description}</p>
                            <p className="text-lg font-bold mt-4">₹ {plan.planPrice}</p>
                            <p className="text-sm text-gray-600">{plan.planDuration.value} {plan.planDuration.unit}</p>
                        </div>
                    ))}
                </div>
                {selectedPlan && (
                    <div className="text-center mt-6">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSelect}>
                            Select Plan
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserPlan
