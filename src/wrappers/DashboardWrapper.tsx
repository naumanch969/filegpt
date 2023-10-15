"use client"

import Sidebar from "@/components/client/Sidebar/DashboardSidebar/Sidebar";
import Navbar from "@/components/client/Navbar/DashboardNavbar";
import { useState } from "react";


const DashboardWrapper = ({ children }: any) => {

  const [showMenu, setShowMenu] = useState<boolean>(true)


  return (
    <div style={{ overflow: 'hidden' }} className='w-screen h-screen overflow-hidden flex  ' >

      {showMenu && <Sidebar setShowMenu={setShowMenu} />}

      <div className="md:w-[75vw] w-full h-full overflow-y-scroll flex flex-col">
        <Navbar setShowMenu={setShowMenu} />
        {children}
      </div>

    </div>
  )
}

export default DashboardWrapper