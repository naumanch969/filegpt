"use client"

import { Add, Check, Clear, Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const Analytics = () => {

  const categories = [
    {
      name: 'Ahmad Ali',
      id: '1'
    },
    {
      name: 'Ahmad Ali',
      id: '2'
    },
    {
      name: 'Ahmad Ali',
      id: '3'
    },
    {
      name: 'Ahmad Ali',
      id: '4'
    },
    {
      name: 'Ahmad Ali',
      id: '5'
    },
    {
      name: 'Ahmad Ali',
      id: '6'
    },
  ]

  const MessageItem = ({ message, index }: { message: { name: string, id: string }, index: number }) => {
    const [showConfirmButtons, setShowConfirmButtons] = useState<boolean>(false)
    return (
      <div className={`${index % 2 == 0 ? 'bg-lighter-blue' : 'bg-white'} w-full flex justify-between px-[2rem] py-[12px] rounded-[8px] `}>
        <div className="flex gap-[1rem] ">
          <input type="checkbox" id={`messageItem${message.id}`} className='w-[1rem] ' />
          <label htmlFor={`messageItem${message.id}`} className='font-semibold text-main-blue text-[20px] ' >{message.name}</label>
        </div>
        <div className="flex gap-[8px] ">
          {
            showConfirmButtons
              ?
              <>
                <IconButton onClick={() => setShowConfirmButtons(false)} ><Check /></IconButton>
                <IconButton onClick={() => setShowConfirmButtons(false)} ><Clear /></IconButton>
              </>
              :
              <IconButton className='' onClick={() => setShowConfirmButtons(true)} ><Delete className='text-main-blue ' /></IconButton>
          }
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-[1rem] ' >

      <div className="flex justify-between items-center">
        <h1 className='text-main-blue font-bold text-[36px] ' >Analytics</h1>
      </div>

      <p>This page is under processsing...</p>

    </div>
  )
}

export default Analytics