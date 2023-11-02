import React from 'react'

function Banner() {
    // const backgroundImage = {
    //     backgroundImage: 'url(/banner.jpg)',
    //     backgroundSize: 'cover', // Adjusted background size for zooming out
    //     backgroundPosition: 'center',
    //     height: 600,
    // };

    const backgroundImage = {
        backgroundImage: 'url(/banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: 600,
    };
    return (
        <div className="relative">
            <div className="object-cover h-60 sm:h-80 md:h-96 lg:h-120" style={backgroundImage}>
                {/* Content inside the banner */}
            </div>
        </div>
    )
}

export default Banner
