"use client"

import Sidebar from "@/components/client/Sidebar/AiToolSidebar/Sidebar";
import Navbar from "@/components/client/Navbar/ChatbotNavbar";
import { useSearchParams } from "react-router-dom";


const AiToolLayout = ({ children }: any) => {



  return (
    <div style={{ overflow: 'hidden' }} className='w-screen h-screen overflow-hidden flex  ' >

      <div style={{ width: '25vw', overflowY: 'scroll' }} className="h-screen bg-lighter-blue overflow-y-scroll sticky top-0 left-0 w-[33vw] ">
        <Sidebar />
      </div>
      <div style={{ width: '75vw', overflowY: 'scroll' }} className="w-[67vw] h-full overflow-y-scroll flex flex-col">
        {children}
      </div>

    </div>
  )
}

export default AiToolLayout