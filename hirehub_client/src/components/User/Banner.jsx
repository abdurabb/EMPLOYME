import React from 'react'

function Banner() {
    const backgroundImage = {
        backgroundImage: 'url(/banner.jpg)',
        backgroundSize: 'cover', // Adjusted background size for zooming out
        backgroundPosition: 'center',
        height: 600,

    };
    return (
        <div className=''>
            <div className=" object-cover" style={backgroundImage}>
                {/* <button className='  font-[Poppins] rounded-xl text-white p-4  bg-indigo-600'>SEARCH THE JOBS</button> */}
            </div>
        </div>
    )
}

export default Banner
