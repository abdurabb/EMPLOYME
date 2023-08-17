import React from 'react'
import {Link} from 'react-router-dom'
function Error() {
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="text-gray-700 text-center">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-2xl mb-4">Oops! The page you're looking for doesn't exist.</p>
                    <p className="text-lg mb-8">You might have mistyped the URL or the page has been moved.</p>
                    <Link  to={'/'} className="text-blue-500 hover:underline">Go back to home</Link>
                </div>
            </div>
        </div>
    )
}

export default Error
