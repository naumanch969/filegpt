"use client"

import { Category, Subcategory, Tool } from '@/interfaces'
import { getAllToolCategories } from '@/redux/action/category'
import { getAllToolSubcategories, getToolSubcategories } from '@/redux/action/subcategory'
import { uploadImage } from '@/redux/api'
import { RootState } from '@/redux/store'
import { Add, Create, Delete, DeleteOutlined, Edit } from '@mui/icons-material'
import { IconButton, Switch } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { BsEye, BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { createTool, getTools } from '@/redux/action/tool'
import DeleteBookModal from '@/components/admin/Modals/DeleteBookModal'
import CreateToolModal from '@/components/admin/Modals/CreateToolModal'
import ViewToolModal from '@/components/admin/Modals/ViewToolModal'
import UpdateToolModal from '@/components/admin/Modals/UpdateToolModal'
import DeleteToolModal from '@/components/admin/Modals/DeleteToolModal'
import Loader from '@/utils/components/Loader'

const Tools = () => {

  //////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
  const dispatch = useDispatch()
  const toolsPerPage = 20;
  const page = 1;
  const { tools, isFetching }: { tools: Tool[], isFetching: boolean } = useSelector((state: RootState) => state.tool)
  const initialState: Tool = {
    _id: '',
    name: '',
    category: '',
    subcategory: '',
    webImage: '',
    mobileImage: '',
    inputFields: [{ fieldName: '', placeholder: '' }],
    systemRole: 'test',
    prompt: '',
    languageDropdown: 'true'
  }

  //////////////////////////////////////////// STATES ///////////////////////////////////////////////
  const [selectedTool, setSelectedTool] = useState<Tool>(initialState)
  const [openViewModal, setOpenViewModal] = useState<boolean>(false)
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  //////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getTools({}))
  }, [])


  //////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////


  //////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////
  const ToolCard = ({ tool }: { tool: Tool }) => {
    return (
      <div className="bg-lighter-blue md:w-[31.5%] sm:w-[47.5%] w-full  h-[20rem] flex flex-col justify-between items-start p-[1rem] rounded-[1rem]  ">

        <div className="w-full h-[13rem] bg-main-blue rounded-[1rem] relative overflow-hidden ">
          {
            tool?.webImage &&
            <Image
              src={tool.webImage}
              layout='fill'
              alt="Doctor Guide"
              className=" mx-auto  "
            />
          }
        </div>

        <div className="flex flex-col justify-around h-[5rem] ">
          <h3 className='text-main-blue text-lg font-semibold capitalize ' >{tool.name}</h3>
          <div className="w-full flex justify-end items-center gap-2 ">
            <IconButton onClick={() => { setSelectedTool(tool); setOpenViewModal(true) }} >
              <BsEye />
            </IconButton>
            <IconButton onClick={() => { setSelectedTool(tool); setOpenUpdateModal(true) }} >
              <Edit />
            </IconButton>
            <IconButton onClick={() => { setSelectedTool(tool); setOpenDeleteModal(true) }} >
              <Delete />
            </IconButton>
          </div>
        </div>

      </div>
    )
  }






  return (
    <div className='flex flex-col gap-[1.5rem] ' >

      <ViewToolModal open={openViewModal} setOpen={setOpenViewModal} tool={selectedTool} />
      <CreateToolModal open={openCreateModal} setOpen={setOpenCreateModal} />
      <UpdateToolModal open={openUpdateModal} setOpen={setOpenUpdateModal} tool={selectedTool} />
      <DeleteToolModal open={openDeleteModal} setOpen={setOpenDeleteModal} toolId={selectedTool._id} />

      <div className="flex flex-col gap-[1rem] ">
        {/* topbar */}
        <div className="flex justify-between items-center">
          <h1 className='text-main-blue font-bold text-[36px] ' >Tools</h1>
          <button onClick={()=>setOpenCreateModal(true)} className='flex justify-center items-center gap-4 text-[18px] md:px-[1rem] px-[12px] py-[12px] rounded-full md:w-[12rem] w-fit bg-white text-red border-[2px] border-red'>
            <span className='hidden md:block' >Create Tool</span>  {/* for md devices */}
            <Add className='block md:hidden' />  {/* for xs devices */}
          </button>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4 ">
        {
          isFetching
            ?
            <div className="flex justify-center items-center w-full">
              <Loader />
            </div>
            :
            tools.map((tool, index) => (
              <ToolCard tool={tool} key={index} />
            ))
        }
      </div>


    </div >
  )
}



export default Tools