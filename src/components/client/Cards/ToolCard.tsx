"use client"

import { Tool } from '@/interfaces';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {useDispatch} from 'react-redux'
import {setToolReducer} from '@/redux/reducer/tool'

export default function ToolCard({ tool }: { tool: Tool }) {

    const dispatch = useDispatch()
    const router = useRouter()

    return (
        <div className="bg-lighter-blue lg:w-[32%] sm:w-[48%] w-full  h-[20rem] flex flex-col justify-between items-start p-[1rem] rounded-[1rem]  ">

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
                <h3 className='text-main-blue text-[18px] font-semibold ' >{tool.name}</h3>
                <a 
                    href={`/dashboard/tools/use?tool=${tool.name.toLowerCase()}&id=${tool._id}`}
                    className='bg-red text-white w-fit px-[2rem] py-[4px] rounded-[1rem] text-[18px] '
                >Use</a>
            </div>

        </div>
    )
}
