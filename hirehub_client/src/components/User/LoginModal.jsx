import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginModal({ onClose }) {
    const navigate = useNavigate()
    const handleUser = () => {
        navigate('/login')
    }
    const companyLogin = () => {
        navigate('/companyLogin')
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-bold mb-4">Select Login Type</h1>
                    <button className="mt-4 text-white hover:text-white bg-red-500 p-2 rounded-xl" onClick={onClose}>
                        Close
                    </button>
                </div>

                <div className='p-4'>
                    <button className="bg-indigo-500 text-white py-2 px-4 rounded-md mr-2" onClick={companyLogin}>
                        Company Login
                    </button>
                    <button className="bg-indigo-500 text-white py-2 px-4 rounded-md" onClick={handleUser}>
                        User Login
                    </button>
                </div>


            </div>
        </div>
    );
}

export default LoginModal;
