"use client"

import { Plan } from '@/interfaces'
import { getPlans } from '@/redux/action/plan'
import { checkoutSubscription } from '@/redux/api'
import { RootState } from '@/redux/store'
import { ArrowRightAlt, Check, CheckCircle, Person } from '@mui/icons-material'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaCrown } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {

    //////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { plans }: { plans: Plan[] } = useSelector((state: RootState) => state.plan)
    console.log('plans', plans)

    //////////////////////////////////////////////// STATES ////////////////////////////////////////////////////

    //////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getPlans())
    }, [])

    //////////////////////////////////////////////// FUNCTION ////////////////////////////////////////////////////
    const handleCheckout = async (plan: Plan) => {
        try {
            const { data } = await checkoutSubscription({ planName: plan.name, billing: plan.billing })
            console.log('sessionId', data)
        }
        catch (err) {

        }
    }


    const Board = ({ plan }: { plan: Plan }) => {

        const isFree = plan.name == 'FREE'
        const isBasic = plan.name == 'BASIC'
        const isPro = plan.name == 'PRO'

        return (
            <div className={`
                w-[32%] flex flex-col gap-[8px] p-[2rem] border-[1px] border-light-gray rounded-[1rem] relative
                ${isBasic ? 'bg-main-blue text-white ' : isPro ? 'bg-white border-orange text-main-blue ' : 'bg-lighter-gray text-main-blue '}
            `}>

                {
                    isPro && <FaCrown style={{ fontSize: '64px' }} className='text-orange rotate-[45deg] absolute top-[-2rem] right-[-2rem] ' />
                }

                <h3 className='text-text-gray text-[24px] font-medium  ' >{plan.name}</h3>
                <div className={`
                    text-[36px] font-medium 
                    ${isBasic ? 'text-white ' : isPro ? 'text-main-blue ' : 'text-main-blue '}
                `} >
                    <span  >${plan.price}</span>
                    <span className={`
                        text-[1rem] font-medium ml-[8px]
                        ${isBasic ? 'text-white ' : isPro ? 'text-main-blue ' : 'text-light-gray '}
                    `} >/Month</span>
                </div>
                <div className="flex flex-col gap-[1rem] ">
                    {
                        plan.features.map((feature: any, index: number) => (
                            <div className="flex justify-start gap-[1rem] " key={index} >
                                <CheckCircle
                                    style={{ fontSize: '20px' }}
                                    className={`
                                        ${isBasic ? 'text-white ' : isPro ? 'text-orange ' : 'text-main-blue '}
                                    `} />
                                <span
                                    className={`
                                        text-[16px] font-light 
                                        ${isBasic ? 'text-white ' : isPro ? 'text-main-blue ' : 'text-main-blue '}
                                `} >
                                    {feature}
                                </span>
                            </div>
                        ))
                    }
                </div>
                <button onClick={() => handleCheckout(plan)} className={`
                    border-[2px] w-full h-[50px] rounded-[8px] mt-[12px] font-bold 
                    ${isBasic ? 'bg-white text-main-blue border-white' : isPro ? 'bg-orange text-main-blue border-orange' : 'bg-white text-main-blue border-main-blue '}
                `} >Choose Plan</button>
            </div >
        )
    }

    return (
        <>


            <div className="flex flex-col gap-[2rem] px-[2.5rem] pt-[3rem] pb-[2rem] bg-white ">
                <h2 className='flex items-center gap-[8px] font-bold text-[2rem] ' >
                    <Person />
                    <span>Account Details</span>
                </h2>


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

                <div className="flex justify-between mt-[1rem] ">
                    {
                        plans.map((plan, index) => (
                            <Board plan={plan} key={index} />
                        ))
                    }
                </div>

                {/* <div className="flex justify-center ">
                    <button className='bg-red text-white w-[18rem] text-[20px] py-[12px] rounded-full shadow-lg ' >
                        Go To Plans <ArrowRightAlt style={{ fontSize: '32px' }} />
                    </button>
                </div> */}

            </div>

        </>
    )
}

export default page