"use client"

import { Book, Category, Subcategory } from '@/interfaces';
import { getBookCategory } from '@/redux/action/category';
import { getBookSubcategory } from '@/redux/action/subcategory';
import { RootState } from '@/redux/store';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { BsStack } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { PiCaretLeftBold } from 'react-icons/pi';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = ({ showRightbar, setShowRightbar }: { showRightbar: boolean, setShowRightbar: any }) => {

    ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////
    const router = useRouter()
    const dispatch = useDispatch()
    const { currentCategory }: { currentCategory: Category } = useSelector((state: RootState) => state.category)
    const { currentSubcategory }: { currentSubcategory: Subcategory } = useSelector((state: RootState) => state.subcategory)
    const { bookName }: { bookName: string } = useParams()
    const searchParams = useSearchParams()
    const categoryId = searchParams.get('category')
    const subcategoryId = searchParams.get('subcategory')

    ////////////////////////////////////////////// STATES //////////////////////////////////////////////

    ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////
    useEffect(() => {
        categoryId && dispatch<any>(getBookCategory(categoryId))
        categoryId && subcategoryId && dispatch<any>(getBookSubcategory(categoryId, subcategoryId))
    }, [])

    ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////

    return (
        <div className="bg-light-silver shadow-lg w-full py-6 flex justify-between items-center ">

            <div className="flex items-center gap-[2rem] ">
                <button onClick={() => router.back()} className=' bg-red text-white hidden md:flex justify-end items-center  w-[5rem] h-[46px] rounded-r-full ' >
                    <PiCaretLeftBold style={{ fontSize: '28px' }} className='relative right-[1rem]' />
                </button>
                <h2 className='md:text-[2rem] sm:text-[24px] text-[20px] font-bold capitalize ' >
                    {currentCategory.name}: {currentSubcategory.name} {'> '} {bookName?.replaceAll('%20', ' ')}
                </h2>
            </div>

            {
                showRightbar
                    ?
                    <div className="w-[30%] min-w-[25rem] max-w-[25rem] px-[2rem] flex justify-between items-center ">
                        <div className="flex justify-start items-center gap-[12px] ">
                            <BsStack style={{ fontSize: '32px' }} />
                            <span className='text-[20px] font-medium '   >Sources</span>
                        </div>
                        <button onClick={() => setShowRightbar((pre: boolean) => !pre)} className='text-main-blue underline ' >Collapse</button>
                    </div>
                    :
                    <div className="flex justify-end items-center px-8 ">
                        <button onClick={() => setShowRightbar((pre: boolean) => !pre)} className='' >
                            <BsStack style={{ fontSize: '32px' }} />
                        </button>
                    </div>
            }

        </div>
    )
}

export default Navbar