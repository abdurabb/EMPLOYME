import React from 'react'

function UserFooter() {
    
    return (
        <div>
            <footer className='bg-gray-300 mt-1 text-white'>
                <div className='md:flex text-black-500 md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] pt-4 '>
                    <h1 className='lg:text text-black 4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-size-md:w-2/5'>
                        <span className='text-black'></span> You're ready to Build Your Career
                        {/* until */}
                    </h1>
                    <div>
                        <input type="text" placeholder='Enter Your ph.no' className='text-gray-800 sm:w-72 w-full sm:mr-1 lg:mb-0 mb-4 py-2.5
                        rounded px-2 focus:outline-none' />
                        <button className='bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font-[Poppins]
                        rounded-md text-white md:w-auto w-full'>Request Code</button>
                    </div>
                </div>

                <div className='flex justify-center mt-2'>
                    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
          '>
                        <span className='text-gray-800 font-bold'>EMPLOY<span className='text-amber-600 font-bold'>ME</span></span>
                    </div>
                </div>
                {/* <div className='flex justify-center ' >
                    <ul className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4
                    gap-6 sm:px-8  py-16' >
                        <li> Some text</li>
                        <li> Some text</li>
                        <li> Some text</li>
                        <li> Some text</li>


                    </ul>
                </div> */}

                <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10
                text-center pt-2 text-gray-400 text-sm pb-8'>
                    <span> 0 2023 Appy. All rights reserver.</span>
                    <span> Terms . Privacy Policy</span>

                </div>

                {/* <div className='flex justify-end text-teal-500'>
                    <span className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 
                    text-xl hover:text-gray-100 hover:bg-teal-500 duration-300'>
                        f
                    </span>
                    <span className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 
                    text-xl hover:text-gray-100 hover:bg-teal-500 duration-300'>
                        I
                    </span>
                    <span className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 
                    text-xl hover:text-gray-100 hover:bg-teal-500 duration-300'>
                        T
                    </span>
                    <span className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 
                    text-xl hover:text-gray-100 hover:bg-teal-500 duration-300'>
                        L
                    </span>

                </div> */}
            </footer>

        </div>
    )
}

export default UserFooter
