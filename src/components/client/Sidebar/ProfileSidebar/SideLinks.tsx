"use client";

import React from 'react'
import Link from "next/link";
// import { Link } from "react-router-dom";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
interface SideLinksProps {
  title?: string;
  subtitleList?: {
    name: string;
    id: string;
  }[];
  active?: boolean;
  tools?: Tools | null;
}
interface Tools {
  _id: string;
  name: string;
  category: string;
  subcategory: string;
  webImage: string;
  mobileImage: string;
  inputFields: {
    fieldName: string;
    placeholder: string;
  }[];
  systemRole: string;
  prompt: string;
  languageDropdown: string;
}
[];

export default function SideLinks({ links }: any) {

  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
  const router = useRouter()
  const pathname = usePathname()

  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////////

  return (
    <div className="w-full flex flex-col gap-[12px] pl-4 pt-3">
      {links.map((link: any, index: number) => {
        const isActive = (pathname.includes(link.route.toLowerCase()) && link.route.length > 1) || pathname == link.route

        return (
          <Link
            // shallow={true}
            href={link.route}
            className={`${isActive ? 'bg-pink hover:bg-pink-300 ' : 'hover:bg-pink'} px-6 py-3 flex gap-[1rem] text-main-blue font-bold transition-all duration-75 rounded-lg cursor-pointer`}
            key={index}
          >
            {link.icon}
            {link.name}
          </Link>
        )
      })}
    </div>
  )
}
