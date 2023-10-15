"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaCircleUser } from 'react-icons/fa6'
import { HiHome } from 'react-icons/hi'
import { IoLogOut } from 'react-icons/io5'
import { PiCaretLeftBold } from 'react-icons/pi'
import { toolsResponse } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import { Menu } from '@mui/icons-material'


const Sidebar = ({ setShowSidebar }: any) => {

    ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const pathname = usePathname()
    const sidebarLinks = [
        {
            name: 'Categories',
            route: '/admin/categories',
        },
        {
            name: 'Subcategories',
            route: '/admin/subcategories',
        },
        {
            name: 'Books',
            route: '/admin/books',
        },
        {
            name: 'Messages',
            route: '/admin/messages',
        },
        {
            name: 'Tools',
            route: '/admin/tools',
        },
        {
            name: 'Plans',
            route: '/admin/plans',
        },
    ]

    ////////////////////////////////////////////// STATES //////////////////////////////////////////////////


    ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////

    ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////


    return (
        <>
            {/* Desktop Sidebar */}
            <div className="h-screen bg-lighter-blue sticky top-0 left-0 w-[25vw] ">
                <div className="hidden md:flex flex-col justify-between w-full h-full bg-light-silver main-blue-main relative">

                    <div className="flex flex-col w-full">

                        <div className="flex flex-col items-start mb-3 mt-6 ">
                            <button className='bg-red text-white flex justify-end items-center  w-[5rem] h-[46px] rounded-r-full ' >
                                <PiCaretLeftBold style={{ fontSize: '28px' }} className='relative right-[1rem]' />
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
                            <div className="w-full px-4 relative">
                                <h2 className='text-[32px] font-bold text-main-blue w-full text-center ' >Admin Panel</h2>
                            </div>

                            {/* Links */}
                            <div className="w-full px-4 mb-2 relative ">
                                <div className="w-full flex flex-col gap-[12px] pl-4 pt-3">
                                    {sidebarLinks.map((link, index) => {
                                        const isActive = pathname.includes(link.name) || pathname == link.route
                                        return (
                                            <Link
                                                href={link.route}
                                                className={`${isActive ? 'bg-red text-white ' : 'bg-slate-200 text-main-blue '} capitalize px-6 py-3 hover:bg-red hover:text-white transition-all duration-75 rounded-lg cursor-pointer`}
                                                key={index}
                                            >
                                                {link.name}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


            {/* Mobile Sidebar */}
            <div className="md:hidden flex flex-col justify-between shadow-box z-[1000] absolute top-0 left-0 w-full h-full bg-light-silver main-blue-main">

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
                            <Menu style={{ fontSize: '40px' }} className='text-main-blue' onClick={() => setShowSidebar(false)} />
                        </button>
                    </div>

                    {/* Searchbar and Links */}
                    <div className="flex flex-col">

                        {/* Search bar */}
                        <div className="w-full px-4 relative">
                            <h2 className='text-[32px] font-bold text-main-blue w-full text-center ' >Admin Panel</h2>
                        </div>

                        {/* Links */}
                        <div className="w-full px-4 mb-2 relative ">
                            <div className="w-full flex flex-col gap-[12px] pl-4 pt-3">
                                {sidebarLinks.map((link, index) => {
                                    const isActive = pathname.includes(link.name) || pathname == link.route
                                    return (
                                        <Link
                                            href={link.route}
                                            onClick={() => setShowSidebar(false)}
                                            className={`${isActive ? 'bg-red text-white ' : 'bg-slate-200 text-main-blue '} capitalize px-6 py-3 hover:bg-red hover:text-white transition-all duration-75 rounded-lg cursor-pointer`}
                                            key={index}
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>

                
            </div>
        </>
    )
}

export default Sidebar