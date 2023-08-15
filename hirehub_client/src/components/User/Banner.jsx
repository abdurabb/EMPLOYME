import React from 'react'

function Banner() {
    const backgroundImage = {
        backgroundImage: `url(/banner.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 500
    };
    return (
        <div>
            <div className="bg-cover" style={backgroundImage}>
                {/* <button className='  font-[Poppins] rounded-xl text-white p-4  bg-indigo-600'>SEARCH THE JOBS</button> */}
            </div>
        </div>
    )
}

export default Banner
