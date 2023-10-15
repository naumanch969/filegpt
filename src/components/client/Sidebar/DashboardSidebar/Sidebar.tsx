"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaCircleUser } from 'react-icons/fa6'
import { HiHome } from 'react-icons/hi'
import SideLinks from './SideLinks'
import { IoLogOut } from 'react-icons/io5'
import { PiCaretLeftBold, PiHamburger } from 'react-icons/pi'
import { categoriesResponse, toolsResponse } from '@/constants'
import { useRouter } from 'next/navigation'
import { Menu } from '@mui/icons-material'
import { getAllBookCategories, getAllToolCategories } from '@/redux/action/category'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Category } from '@/interfaces'
import Loader from '@/utils/components/Loader'
import { searchBook } from '@/redux/action/book'

const Sidebar = ({ setShowMenu }: any) => {

  ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const router = useRouter()
  const dispatch = useDispatch()
  const { bookCategories, isFetching: booksCategoriesFetching }: { bookCategories: Category[], isFetching: boolean } = useSelector((state: RootState) => state.category)
  const { toolCategories, isFetching: toolsCategoriesFetching }: { toolCategories: Category[], isFetching: boolean } = useSelector((state: RootState) => state.category)
  const toolLinks = [];
  const map = new Map();
  for (const obj of toolsResponse.results) {
    if (!map.has(obj.category)) {
      map.set(obj.category, true);
      toolLinks.push({
        category: obj.category,
        subcategories: [obj.subcategory]
      });
    } else {
      for (const res of toolLinks) {
        if (res.category === obj.category) {
          if (!res.subcategories.includes(obj.subcategory)) {
            res.subcategories.push(obj.subcategory);
          }
        }
      }
    }
  }

  ////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const [searchValue, setSearchValue] = useState<string>('')

  ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getAllBookCategories())
    dispatch<any>(getAllToolCategories())
  }, [])
  useEffect(() => {
    console.log('searchValue',searchValue)
    searchValue && dispatch<any>(searchBook(searchValue))
  }, [searchValue])

  ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////



  return (
    <>
      {/* Desktop Sidebar */}
      <div style={{ width: '25vw', overflowY: 'scroll' }} className="md:flex flex-col hidden h-screen overflow-y-scroll sticky top-0 left-0 w-[25vw] ">
        <div className="flex flex-col justify-between w-full h-full bg-light-silver main-blue-main relative">

          <div className="flex flex-col w-full">

            <div className="flex flex-col items-start mb-3 mt-6 ">
              <button className='bg-red text-white flex justify-end items-center  w-[5rem] h-[46px] rounded-r-full ' >
                <PiCaretLeftBold style={{ fontSize: '28px' }} className='relative right-[1rem]' onClick={() => setShowMenu(false)} />
              </button>
              {/* logo */}
              <div className="w-full px-4">
                <Image
                  src={"/logo-mini.png"}
                  height={196}
                  width={517}
                  alt="Doctor Guide"
                  className="w-52 mx-auto"
                />
              </div>
            </div>

            {/* Searchbar and Links */}
            <div className="flex flex-col">
              {/* Search bar */}
              <div className="w-full px-4 relative mb-10">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search"
                  className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
                />
                <div className="absolute right-[1.3rem] top-1/2 -translate-y-1/2 hover:bg-[#E2E6F2] p-3 rounded-full cursor-pointer">
                  <BsSearch className="" />
                </div>
              </div>
              {/* Links */}

              {
                (booksCategoriesFetching || toolsCategoriesFetching)
                  ?
                  <Loader />
                  :
                  <>
                    <SideLinks
                      title={bookCategories[0]?.name || ""}
                      categoryId={bookCategories[0]?._id}
                      subcategories={bookCategories?.[0]?.bookSubcategories || []}
                      active={false}
                    />
                    {
                      toolCategories.map((category: Category, index: number) => (
                        <React.Fragment key={index} >
                          <SideLinks
                            title={category?.name || ""}
                            // subTools={category.toolSubcategories?.map(((subcategory: { name: string, id: string }) => subcategory.name))}
                            categoryId={category._id}
                            subTools={category.toolSubcategories}
                            active={false}
                          />
                        </React.Fragment>
                      ))
                    }
                  </>
              }


            </div>
          </div>

          {/* below links */}
          <div style={{ position: 'sticky' }} className="bg-light-silver flex items-center justify-center sticky left-0 bottom-0 z-[100] mx-auto w-full h-[3rem] sidebar-tabs-shadow rounded-t-3xl">
            <div className="max-w-[14rem] flex justify-between items-center w-full">
              <Link href={`/`} >
                <HiHome className="text-3xl text-main-blue hover:text-main-blue cursor-pointer  " />
              </Link>
              <Link href={`/profile/speciality`} >
                <FaCircleUser className="text-[1.8rem] text-gray-400 hover:text-main-blue cursor-pointer " />
              </Link>
              <Link href={`/profile/speciality`} >
                <IoLogOut className="text-[2rem] text-gray-400 hover:text-main-blue cursor-pointer " />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden flex flex-col justify-between shadow-box z-[1000] absolute top-0 left-[-100%] w-[80%] h-full bg-light-silver main-blue-main transition-transform duration-500 ease-in-out transform translate-x-0">

        <div className="flex flex-col w-full">

          <div className="flex flex-col items-start mb-2 mt-2 ">
            {/* logo */}
            <div className="w-full px-4">
              <Image
                src={"/logo-mini.png"}
                height={120}
                width={156}
                alt="Doctor Guide"
                className="w-[156px] mx-auto"
              />
            </div>
            <button className="absolute right-4 top-4 ">
              <Menu style={{ fontSize: '40px' }} className='text-main-blue' onClick={() => setShowMenu(false)} />
            </button>
          </div>

          {/* Searchbar and Links */}
          <div className="flex flex-col">
            {/* Search bar */}
            <div className="w-full px-4 relative mb-10">
              <input
                type="text"
                placeholder="Search"
                className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
              />
              <div className="absolute right-[1.3rem] top-1/2 -translate-y-1/2 hover:bg-[#E2E6F2] p-3 rounded-full cursor-pointer">
                <BsSearch className="" />
              </div>
            </div>
            {/* Links */}
            {
              (booksCategoriesFetching || toolsCategoriesFetching)
                ?
                <Loader />
                :
                <>
                  <SideLinks
                    title={bookCategories[0]?.name || ""}
                    categoryId={bookCategories[0]?._id}
                    subcategories={bookCategories?.[0]?.bookSubcategories || []}
                    active={false}
                  />
                  {
                    toolCategories.map((category: Category, index: number) => (
                      <React.Fragment key={index} >
                        <SideLinks
                          onClick={() => setShowMenu(false)}
                          title={category?.name || ""}
                          categoryId={category._id}
                          subTools={category.toolSubcategories}
                          active={false}
                        />
                      </React.Fragment>
                    ))
                  }
                </>
            }


          </div>
        </div>
        {/* below links */}
        <div style={{ position: 'sticky' }} className="bg-light-silver flex items-center justify-center sticky left-0 bottom-0 z-[100] mx-auto w-full h-[3rem] sidebar-tabs-shadow rounded-t-3xl">
          <div className="max-w-[14rem] flex justify-between items-center w-full">
            <Link href={`/`} >
              <HiHome className="text-3xl text-main-blue hover:text-main-blue cursor-pointer  " />
            </Link>
            <Link href={`/profile/speciality`} >
              <FaCircleUser className="text-[1.8rem] text-gray-400 hover:text-main-blue cursor-pointer " />
            </Link>
            <Link href={`/profile/speciality`} >
              <IoLogOut className="text-[2rem] text-gray-400 hover:text-main-blue cursor-pointer " />
            </Link>
          </div>
        </div>

      </div>

    </>
  )
}

export default Sidebar