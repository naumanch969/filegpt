"use client"

import { Category, Subcategory, Book } from '@/interfaces'
import { getAllBookCategories } from '@/redux/action/category'
import { getAllBookSubcategories, getBookSubcategories } from '@/redux/action/subcategory'
import { uploadImage } from '@/redux/api'
import { RootState } from '@/redux/store'
import { Add, Create, Delete, DeleteOutlined, Edit } from '@mui/icons-material'
import { IconButton, Switch } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { BsEye, BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { createBook, getBooks } from '@/redux/action/book'
import { getBooks as GetBooks } from '@/redux/api'
import CreateBookModal from '@/components/admin/Modals/CreateBookModal'
import ViewBookModal from '@/components/admin/Modals/ViewBookModal'
import UpdateBookModal from '@/components/admin/Modals/UpdateBookModal'
import DeleteBookModal from '@/components/admin/Modals/DeleteBookModal'
import Loader from '@/utils/components/Loader'

const Books =async () => {
  //////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
  const dispatch = useDispatch()
  const booksPerPage = 20;
  const page = 1;
  const { books, isFetching }: { books: Book[], isFetching: boolean } = useSelector((state: RootState) => state.book)
  const initialState: Book = {
    _id: '',
    name: '',
    category: '',
    subcategory: '',
    webImage: '',
    mobileImage: '',
    files: [],
    indexName: '',
    initialMessage: '',
    suggestedQuestions: []
  }

  //////////////////////////////////////////// STATES ///////////////////////////////////////////////
  const [selectedBook, setSelectedBook] = useState<Book>(initialState)
  const [openViewModal, setOpenViewModal] = useState<boolean>(false)
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  //////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getBooks(''))
  }, [])


  //////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////


  //////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////
  const BookCard = ({ book }: { book: Book }) => {
    return (
      <div className="bg-lighter-blue md:w-[31.5%] sm:w-[47.5%] w-full  h-[20rem] flex flex-col justify-between items-start p-[1rem] rounded-[1rem]  ">

        <div className="w-full h-[13rem] bg-main-blue rounded-[1rem] relative overflow-hidden ">
          {
            book?.webImage &&
            <Image
              src={book.webImage}
              layout='fill'
              alt="Doctor Guide"
              className="w-full h-full mx-auto  "
            />
          }
        </div>

        <div className="flex flex-col justify-around h-[5rem] ">
          <h3 className='text-main-blue text-lg font-semibold capitalize ' >{book.name}</h3>
          <div className="w-full flex justify-end items-center gap-2 ">
            <IconButton onClick={() => { setSelectedBook(book); setOpenViewModal(true) }} >
              <BsEye />
            </IconButton>
            <IconButton onClick={() => { setSelectedBook(book); setOpenUpdateModal(true) }} >
              <Edit />
            </IconButton>
            <IconButton onClick={() => { setSelectedBook(book); setOpenDeleteModal(true) }} >
              <Delete />
            </IconButton>
          </div>
        </div>

      </div>
    )
  }






  return (
    <div className='flex flex-col gap-[1.5rem] ' >

      <ViewBookModal open={openViewModal} setOpen={setOpenViewModal} book={selectedBook} />
      <CreateBookModal open={openCreateModal} setOpen={setOpenCreateModal} />
      <UpdateBookModal open={openUpdateModal} setOpen={setOpenUpdateModal} book={selectedBook} />
      <DeleteBookModal open={openDeleteModal} setOpen={setOpenDeleteModal} bookId={selectedBook._id} />

      <div className="flex flex-col gap-[1rem] ">
        {/* topbar */}
        <div className="flex justify-between items-center">
          <h1 className='text-main-blue font-bold text-[36px] ' >Books</h1>
          <button onClick={() => setOpenCreateModal(true)} className='flex justify-center items-center gap-4 text-[18px] md:px-[1rem] px-[12px] py-[12px] rounded-full md:w-[12rem] w-fit bg-white text-red border-[2px] border-red'>
            <span className='hidden md:block' >Create Book</span>  {/* for md devices */}
            <Add className='block md:hidden' />  {/* for xs devices */}
          </button>
        </div>
      </div>

      <div className="flex justify-start flex-wrap gap-4 ">
        {
          isFetching
            ?
            <div className="flex justify-center items-center w-full">
              <Loader />
            </div>
            :
            books.map((book, index) => (
              <BookCard book={book} key={index} />
            ))
        }
      </div>


    </div >
  )
}



export default Books