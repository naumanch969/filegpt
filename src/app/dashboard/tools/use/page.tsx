"use client"

import { Tool } from '@/interfaces'
import { queryTool } from '@/redux/action/tool'
import { RootState } from '@/redux/store'
import { Grid3x3, Send } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaCopy } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import {getTool } from '@/redux/api'
import {setToolReducer } from '@/redux/reducer/tool'

const page = () => {

    //////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { queryResponse, isFetching }: { queryResponse: string, isFetching: boolean } = useSelector((state: RootState) => state.tool)
     const searchParams = useSearchParams()
    const toolName = searchParams.get('tool')
    const toolId = searchParams.get('id')
   
    //////////////////////////////////////////////////// STATES /////////////////////////////////////////////////////
    const [loader, setLoader]  =  useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar]  =  useState<boolean>(false)
    const [snackbarText, setSnackbarText]  =  useState<string>('')

    //////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////
    useEffect(()=>{
        const call = async()=>{
            try{
                setLoader(true)
                const {data} = await getTool(toolId)
                dispatch(setToolReducer(data))
                setLoader(false)
            }
            catch(err:any){
                setOpenSnackbar(true)
                setSnackbarText(err.response.data.message)
                setLoader(false)
            }
        }
        call()
    },[])

    //////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////

    return (
        <div className="px-[1rem] py-[2rem] bg-white min-h-screen ">

            <div style={{ height: 'calc(100vh - 4rem)' }} className="relative w-full min-h-full overflow-y-scroll flex flex-col gap-[1rem] p-[2rem] bg-lighter-gray  rounded-[1rem] ">
                <IconButton style={{ position: 'absolute' }} className='absolute top-[1rem] right-[1rem] w-fit ' >
                    <FaCopy />
                </IconButton>

                {
                    isFetching
                        ?
                        <div className='w-full h-full flex flex-col justify-center items-center gap-[8px] ' >
                            Working...
                            <Send style={{ fontSize: '40px' }} className='text-light-gray ' />
                        </div>
                        :
                        (
                            queryResponse
                                ?
                                <p className={`text-black text-[16px] capitalize `} >
                                    {queryResponse}
                                </p>
                                :
                                <div className="w-full">
                                    
                                </div>
                        )
                }



            </div>

        </div>
    )
}

export default page