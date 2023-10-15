"use client"

import Sidebar from "@/components/client/Sidebar/ProfileSidebar/Sidebar";
import { useState } from "react";


const ProfileWrapper = ({ children }: any) => {

  const [shwoSidebar, setShwoSidebar] = useState(true)

  return (
    <div style={{ overflow: 'hidden' }} className='w-screen h-screen overflow-hidden flex  ' >

      {shwoSidebar && <Sidebar />}

      <div className="md:w-[75vw] w-full h-full overflow-y-scroll flex flex-col">
        {children}
      </div>

    </div>
  )
}

export default ProfileWrapper