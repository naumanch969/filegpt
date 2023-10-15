"use client"

import Sidebar from "@/components/admin/Shared/Sidebar";
import { Menu } from "@mui/icons-material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiCaretLeftBold } from "react-icons/pi";
import {useSelector} from 'react-redux'
import {useRouter} from 'next/navigation'
import { RootState } from "@/redux/store";


const AdminWrapper = ({ children }: any) => {

    ///////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////
    const { loggedUser }:{loggedUser:boolean} = useSelector((state:RootState)=>state.user)
    const router = useRouter()

    ///////////////////////////////////////////////// STATES /////////////////////////////////////////////////
    const [showSidebar, setShowSidebar] = useState<boolean>(true)

    ///////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////
    useEffect(()=>{
        // if(!Boolean(loggedUser.name)){
        //     console.log('this is something')
        //     router.push('/auth/login')
        // }
    },[])
 

    ///////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////



    const MobileNavbar = () => (
        <div className="flex items-center mb-4 mt-2 md:hidden ">
            {/* Arrow Left */}
            <button className='' >
                <PiCaretLeftBold style={{ fontSize: '28px' }} className='' onClick={() => setShowSidebar(false)} />
            </button>
            {/* logo */}
            <div className="w-full px-4">
                <Image
                    src={"/logo-mini.png"}
                    height={196}
                    width={156}
                    alt="Doctor Guide"
                    className="w-[156px] mx-auto"
                />
            </div>
            {/* Hamburger */}
            <button className='' >
                <Menu style={{ fontSize: '40px' }} className='' onClick={() => setShowSidebar(true)} />
            </button>
        </div>
    )

    return (
        <div style={{ overflow: 'hidden' }} className='w-screen h-screen overflow-hidden flex mb-4 ' >

            {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
            <div className="bg-white h-full overflow-y-scroll flex flex-col md:p-[3rem] px-4 md:w-[75vw] w-full ">
                <MobileNavbar />
                {children}
            </div>

        </div>
    )
}

export default AdminWrapper