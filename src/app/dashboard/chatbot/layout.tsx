"use client"
import Navbar from "@/components/client/Navbar/ChatbotNavbar";
import React, { useState } from "react";
import BookChat from './[bookName]/page'

const ChatbotLayout = ({ children }: any) => {

    const [showRightbar, setShowRightbar] = useState<boolean>(false);


    return (
        <div style={{ overflow: 'hidden' }} className='w-screen h-screen overflow-hidden flex'>
            <div className="w-full h-full overflow-y-scroll flex flex-col">
                <Navbar setShowRightbar={setShowRightbar} showRightbar={showRightbar} />
                <BookChat showRightbar={showRightbar} setShowRightbar={setShowRightbar} />
                {/* BookChar instead of children used because of passing the prop in the component */}
            </div>
        </div>
    );
};

export default ChatbotLayout;
