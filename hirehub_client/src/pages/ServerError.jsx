import React from 'react'
import {Link} from 'react-router-dom'

function ServerError() {
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="text-gray-700 text-center">
                    <h1 className="text-6xl font-bold mb-4">500</h1>
                    <p className="text-2xl mb-4">Oops! Something went wrong on our end.</p>
                    <p className="text-lg mb-8">Our team is working to fix the issue. Please try again later.</p>
                    <Link  to={'/'} className="text-blue-500 hover:underline">Go back to home</Link>
                </div>
            </div>
        </div>
    )
}

export default ServerError
