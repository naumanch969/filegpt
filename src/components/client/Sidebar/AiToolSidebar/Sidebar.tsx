"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaCircleUser } from 'react-icons/fa6'
import { HiDocument, HiHome } from 'react-icons/hi'
import { IoLogOut } from 'react-icons/io5'
import { PiCaretLeftBold } from 'react-icons/pi'
import { Grid3x3, Logout, Mail, Person, QuestionMark, Rocket } from '@mui/icons-material'
import { MenuItem, Select } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { queryTool } from '@/redux/action/tool'
import { useDispatch, useSelector } from 'react-redux'
import { Tool } from '@/interfaces'
import { RootState } from '@/redux/store'

const Sidebar = () => {

  ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const router = useRouter()
  const { currentTool }: { currentTool: Tool } = useSelector((state: RootState) => state.tool)
  console.log('currentTol', currentTool)
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const toolId = searchParams.get('id')

  ////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const [inputs, setInputs] = useState<{ [key: string]: any }>({});

  ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
  useEffect(() => {
    console.log('inputs', inputs)
  }, [inputs])
  useEffect(() => {
    !Boolean(currentTool.name) && router.back()
  }, [])

  ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
  const handleQuery = () => {
    toolId && inputs && dispatch<any>(queryTool(toolId, inputs))
  }



  return (
    <div className="flex flex-col justify-between w-full h-full bg-light-silver main-blue-main relative">

      <div className="flex flex-col gap-[1rem] mb-[4rem] ">

        <div className="flex flex-col items-start mt-5 ">
          <button onClick={() => router.back()} className='bg-red text-white flex justify-end items-center  w-[5rem] h-[46px] rounded-r-full ' >
            <PiCaretLeftBold style={{ fontSize: '28px' }} className='relative right-[1rem]' />
          </button>
          {/* logo */}
          <div className="w-full px-[2rem]">
            <h2 className='flex items-center gap-[8px] font-bold text-[2rem] ' >
              <Mail />
              <span>Generate Email</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-[8px] w-full px-[2rem] ">
          {
            currentTool.name && currentTool.inputFields.map((inputField, index) => (
              <div key={index} className='flex flex-col gap-[4px] w-full ' >
                <span className='text-black font-medium capitalize ' >{inputField.placeholder}</span>
                <input
                  type="text"
                  value={inputs[inputField.fieldName] ?? ""}
                  placeholder={inputField.placeholder}
                  onChange={(e) => setInputs({ ...inputs, [inputField.fieldName]: e.target.value })}
                  className='bg-lighter-gray border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] '
                />
              </div>
            ))
          }
        </div>

      </div>

      <div className="flex flex-col gap-[1rem] px-[2rem] ">
        <div className='flex flex-col gap-[8px] w-full ' >
          <div className='flex flex-col gap-[4px] w-full ' >
            <span className='text-black font-medium ' >Language</span>
            <select
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
            >
              <option value={'english'}>English</option>
              <option value={'urdu'}>Urdu</option>
              <option value={'greek'}>Greek</option>
            </select>
          </div>
          {/* <div className='flex flex-col gap-[4px] w-full ' >
            <span className='text-black font-medium ' >Number of Generations</span>
            <select
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
            >
              {Array(12).fill('').map((_, index: number) => (
                <option value={index + 1}>{index + 1}</option>
              ))}
            </select>
          </div> */}
        </div>
        <div className="flex flex-col gap-[8px] ">
          <button onClick={handleQuery} className='py-[12px] w-full bg-main-blue text-white rounded-full ' >Generate</button>
          {/* <span>Email Generations 5/1500</span> */}
        </div>
      </div>


    </div>
  )
}

export default Sidebar