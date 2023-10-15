"use client"

import Topbar from "@/components/client/Shared/ToolbarTopbar"
import BookCard from "@/components/client/Cards/BookCard"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Book, Category, Subcategory } from '@/interfaces'
import { useEffect } from "react"
import { getBookCategory, getBookSubcategory, getBooks } from "@/redux/api"
import { getBooksReducer } from "@/redux/reducer/book"
import { getBookCategoryReducer } from "@/redux/reducer/category"
import { getBookSubcategoryReducer } from "@/redux/reducer/subcategory"

const Books = () => {

  ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const { category, subcategory }: { category: string, subcategory: string } = useParams()
  const { currentCategory }: { currentCategory: Category } = useSelector((state: RootState) => state.category)
  const { currentSubcategory }: { currentSubcategory: Subcategory } = useSelector((state: RootState) => state.subcategory)
  const dispatch = useDispatch()

  ////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const { books }: { books: Book[] } = useSelector((state: RootState) => state.book)

  ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
  useEffect(() => {
    const call = async () => {
      try {
        const { data: catResult }: { data: Category } = await getBookCategory(category)
        dispatch(getBookCategoryReducer(catResult))

        const { data: subcatResult }: { data: Category } = await getBookSubcategory(category, subcategory)
        dispatch(getBookSubcategoryReducer(subcatResult))

        const { data } = await getBooks({ page: '1', size: '1', cat: category, sub: subcategory })
        dispatch(getBooksReducer(data.results))
      }
      catch (error) {
        console.log('error', error)
      }
    }
    call()
  }, [])

  ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////

  return (
    <div className="w-full overflow-x-hidden ">

      <div className="flex flex-col gap-[1.5rem] px-[3rem] py-[1.5rem] bg-white ">
        <Topbar
          title={currentCategory.name}
          subTitle={currentSubcategory.name}
        />

        <div className="grid gap-[1.3rem]">
          {books.map((book, index) => (
            <BookCard book={book} key={index} />
          ))}
        </div>

      </div>

    </div>
  )
}

export default Books