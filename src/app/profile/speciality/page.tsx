import ProfileWrapper from '@/wrappers/ProfileWrapper'
import { Grid3x3 } from '@mui/icons-material'
import React from 'react'

const page = () => {

    ///////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////
    const specialities = [
        'The Medical Field',
        'Medical Textbooks',
        'Diagnostis Ai Assistant',
        'Marketing Ai Assistant',
        'Physical Therapy',
        'Pharmacy'
    ]
    ///////////////////////////////////////////////// STATES //////////////////////////////////////////////////////

    ///////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////

    ///////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////

    return (
        <>

            <div className="flex flex-col gap-[2rem] px-[2.5rem] pt-[3rem] bg-white ">
                <h2 className='flex items-center gap-[8px] font-bold text-[2rem] ' >
                    <Grid3x3 />
                    <span>Speciality</span>
                </h2>
                <div className="flex flex-col gap-[8px] ">
                    {
                        specialities.map((speciality, index) => (
                            <React.Fragment key={index} >
                                <div key={index} className='rounded-[4px] cursor-pointer flex justify-between items-center py-[1.4rem] px-[2rem] hover:bg-pink hover:font-bold font-medium ' >
                                    <span className='text-main-blue Capitalize ' >{speciality}</span>
                                    <span className='underline text-red ' >Change</span>
                                </div>
                                <hr className='bg-grey-main-500 w-full h-[2px] ' />
                            </React.Fragment>
                        ))
                    }
                </div>
                <button className='py-[12px] w-[14rem] bg-main-blue text-white rounded-full ' >Start the magic</button>
            </div>

        </>
    )
}

export default page