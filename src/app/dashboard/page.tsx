"use client"

import { useState } from 'react'
import DashboardWrapper from "@/wrappers/DashboardWrapper"
import Topbar from "@/components/client/Shared/ToolbarTopbar"
import BookCard from "@/components/client/Cards/BookCard"
import { booksResponse } from "@/constants"
import { useParams, useRouter } from "next/navigation"
import { Book, Category, Subcategory, User } from "@/interfaces"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { getBookCategory, getBookSubcategory, getBooks } from "@/redux/api"
import { getBooksReducer } from "@/redux/reducer/book"
import SnackbarComponent from "@/utils/components/Snackbar"
import Cookie from 'js-cookie'
import { getBookCategoryReducer } from '@/redux/reducer/category'
import { getBookSubcategoryReducer } from '@/redux/reducer/subcategory'

const Books = () => {

  /////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////

  const dispatch = useDispatch()
  const router = useRouter()
  const { category, subcategory }: { category: string, subcategory: string } = useParams()
  const { currentCategory }: { currentCategory: Category } = useSelector((state: RootState) => state.category)
  const { currentSubcategory }: { currentSubcategory: Subcategory } = useSelector((state: RootState) => state.subcategory)
  const { books }: { books: Book[] } = useSelector((state: RootState) => state.book)
  // const { loggedUser }: { loggedUser: User } = useSelector((state: RootState) => state.user)
  console.log('Cookie.get(askexpert_profile', Cookie.get('askexpert_profile'))
  const stringifiedProfile = Cookie.get('/askexpert_profile')
  const loggedUser: User | null = stringifiedProfile ? JSON.parse(stringifiedProfile) : null

  /////////////////////////////////////////// STATES ///////////////////////////////////////////////
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [snackbarText, setSnackbarText] = useState<string>('')

  /////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////
  useEffect(() => {
    // console.log('loggedUser',loggedUser)
    // console.log('Boolean(loggedUser?.name)', Boolean(loggedUser?.name))
    // if (!(loggedUser?.name?.length > 0)) return router.push('/auth/login')
    // if (!(loggedUser?.category?.length > 0)) return router.push('/auth/category')
    const call = async () => {
      try {
        const { data: catResult }: { data: Category } = await getBookCategory(category)
        dispatch(getBookCategoryReducer(catResult))

        const { data: subcatResult }: { data: Category } = await getBookSubcategory(category, subcategory)
        dispatch(getBookSubcategoryReducer(subcatResult))

        const { data } = await getBooks(`?page=1&size=20&cat=${category}`)
        dispatch(getBooksReducer(data.results))
      }
      catch (error) {
        console.log('error', error)
      }
    }
    call()
  }, [])
  /////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////


  return (
    <div className="w-full overflow-x-hidden ">

      <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />

      <DashboardWrapper>

        <div className="flex flex-col gap-[1.5rem] md:px-[3rem] md:py-[1.5rem] p-4 bg-white ">
          <Topbar
            title={currentCategory?.name}
            subTitle={currentSubcategory?.name}
          />

          <div className="flex justify-between flex-wrap gap-4 ">
            {
              books.map((book, index) => (
                <BookCard book={book} key={index} />
              ))
            }
          </div>
        </div>

      </DashboardWrapper>
    </div>
  )
}

export default Books