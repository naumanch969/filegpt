"use client"
import { useState } from 'react'
import { Search } from '@mui/icons-material'
import { PiCaretRightBold, PiCaretRightLight } from 'react-icons/pi'
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { BsSearch } from 'react-icons/bs'
import { searchBook } from '@/redux/action/book'
import { useDispatch } from 'react-redux'

const Topbar = ({ title, subTitle }: { title: string, subTitle: string }) => {

    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState<any>("")
    const [filterValue, setFilterValue] = useState<any>("")

    return (
        <div className='flex flex-col gap-[8px]  ' >

            <h2 className='text-[36px] text-main-blue font-bold flex items-center gap-[6px] capitalize ' >
                <span>{title?.replaceAll('%20', ' ')} </span>
                {subTitle && <PiCaretRightBold style={{ fontWeight: '800', fontSize: '32px' }} />}
                <span>{subTitle?.replaceAll('%20', ' ')}</span>
            </h2>

            <div className='flex justify-between items-center gap-[1rem] ' >
                <div className="flex-1 relative">
                    <input
                        type="text"
                        onChange={(e) => dispatch<any>(searchBook(e.target.value))}
                        placeholder="Search"
                        className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
                    />
                    <div className="absolute right-[.5rem] top-1/2 -translate-y-1/2 hover:bg-[#E2E6F2] p-3 rounded-full cursor-pointer">
                        <BsSearch className="" />
                    </div>
                </div>
                {/* <select className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500" >
                    <option value={'filter1'}>Filter 1</option>
                    <option value={'filter2'}>Filter 2</option>
                    <option value={'filter3'}>Filter 3</option>
                </select> */}
            </div>

        </div>
    )
}

export default Topbar