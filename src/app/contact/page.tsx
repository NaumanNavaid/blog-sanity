import React from 'react'

const Page = () => {
    return (
        <div className='max-w-7xl  mx-auto flex flex-col justify-center items-center mt-10'>
            <h1 className='text-4xl font-bold font-serif'>
                Contact us
            </h1>


            <div>
                <h1 className='text-2xl font-bold font-serif mt-5'>
                    Office Address
                </h1>
                <p className='mt-5 max-w-2xl font-serif text-lg'>
                    1234 Blog Street,
                    Suite 567,
                    Cityville, State 12345
                    Country
                </p>
                <h1 className='text-2xl font-bold font-serif mt-5'>
                    Phone:
                    <span className='text-lg font-normal pl-1'>
                        (123) 456-7890
                    </span>
                </h1>
                <p className='mt-5 max-w-2xl font-serif text-lg font-medium'> Feel free to visit our Office or drop a Phone Call</p>

            </div>
        </div>
    )
}

export default Page
