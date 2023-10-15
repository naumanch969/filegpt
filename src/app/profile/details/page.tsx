"use client"

import ProfileWrapper from '@/wrappers/ProfileWrapper'
import { Image as ImageIcon, Person } from '@mui/icons-material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { person1 } from '../../../../public'
import EditAccount from '@/components/client/Modals/EditAccount'
import DeleteAccount from '@/components/client/Modals/DeleteAccount'
import { useDispatch, useSelector } from 'react-redux'
import { getUser as getUserProfile } from '@/redux/action/user'
import { RootState } from '@/redux/store'
import { User } from '@/interfaces'
import Loader from '@/utils/components/Loader'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {

    ////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////
    const dispatch = useDispatch()
    const router = useRouter()
    const { loggedUser, isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    console.log('loggedUser', loggedUser)
    ////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

    ////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getUserProfile())
    }, [])

    ////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////



    return (
        <>

            <EditAccount open={openEditModal} setOpen={setOpenEditModal} setOpenDeleteModal={setOpenDeleteModal} />
            <DeleteAccount open={openDeleteModal} setOpen={setOpenDeleteModal} />

            <div className="flex flex-col gap-[2rem] px-[2.5rem] pt-[3rem] pb-[2rem] bg-white ">
                <h2 className='flex items-center gap-[8px] font-bold text-[2rem] ' >
                    <Person />
                    <span>Account Details</span>
                </h2>
                {
                    isFetching
                        ?
                        <div className="w-full flex justify-center items-center">
                            <Loader />
                        </div>
                        :
                        <>
                            <div className="flex flex-col gap-[2rem] ">

                                <div className="flex justify-start items-center gap-[2rem] ">
                                    <div className="w-40 h-40 rounded-full relative  ">
                                        {
                                            loggedUser.imageUrl
                                                ?
                                                <Image
                                                    src={loggedUser.imageUrl}
                                                    alt='User'
                                                    layout='fill'
                                                    className='rounded-full'
                                                />
                                                :
                                                <ImageIcon className='w-full border-[1px] border-black rounded-full ' />
                                        }
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h2 className='text-[2rem] font-bold ' >{loggedUser.name || 'User'}</h2>
                                        <span className='text-[18px] text-black ' >{loggedUser.email || 'user@gmail.com'}</span>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <hr className='bg-light-gray h-[2px] w-[80%] flex justify-center ' />
                                </div>

                                <div className="flex flex-wrap gap-[2rem] w-full ">
                                    <div className='flex flex-col gap-[4px] lg:w-[28rem] w-full' >
                                        <span className='text-black font-medium ' >Name</span>
                                        <input disabled value={loggedUser.name} type="text" placeholder='Your Fullname' className='border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] ' />
                                    </div>
                                    <div className='flex flex-col gap-[4px] lg:w-[28rem] w-full' >
                                        <span className='text-black font-medium ' >Email</span>
                                        <input disabled value={loggedUser.email} type="text" placeholder='email@example.com' className='border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] ' />
                                    </div>
                                    <div className='flex flex-col gap-[4px] lg:w-[28rem] w-full' >
                                        <span className='text-black font-medium ' >Password</span>
                                        <input disabled type="text" placeholder='Your Password' className='border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] ' />
                                    </div>
                                </div>

                            </div>

                            <button onClick={() => setOpenEditModal(true)} className='py-[12px] w-[14rem] bg-red text-white rounded-full ' >Edit Account Info</button>

                            <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start gap-3 lg:gap-4 border-[2px] border-light-gray rounded-[8px] lg:px-[3rem] lg:py-[2rem] sm:p-4 p-3 relative ">
                                <div className="flex justify-start gap-[1rem] ">
                                    <span className='bg-main-blue rounded-full w-[4rem] h-[4rem] ' />
                                    <div className="flex flex-col gap-2 ">
                                        <div className="flex lg:gap-12 md:gap-8 sm:gap-6 gap-4 ">
                                            <h4 className='text-main-blue lg:text-[24px] md:text-[22px] sm:text-[20px] text-[18px] font-bold ' >Premium Plan</h4>
                                            <span className='bg-green-300 border-[2px] border-green-700 text-green-700 rounded-full px-[10px] py-[2px] ' >Active</span>
                                        </div>
                                        <div className="flex gap-[1rem] text-light-gray ">
                                            <h4>Billing  Month</h4>
                                            <span>|</span>
                                            <span>Next Invoice on Jul 29 for $99.9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex lg:w-fit w-full ">
                                    <Link
                                        href={'/profile/plans'}
                                        className='bg-black text-white px-[2rem] py-[12px] rounded-full shadow-lg '
                                    >Upgrade Plan</Link>
                                </div>
                            </div>
                        </>
                }
            </div>

        </>
    )
}

export default page