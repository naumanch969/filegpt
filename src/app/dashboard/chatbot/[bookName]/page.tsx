"use client"

import axios from 'axios';
import { Send } from '@mui/icons-material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import '../style.css'
import Rightbar from '@/components/client/Shared/ChatbotRightbar'
import { useParams, useSearchParams, } from 'next/navigation'
import { messagesResponse } from '@/constants'
import { Book, ConversationMessage, User } from '@/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getBookDetailsAndStartConversation, queryBook } from '@/redux/action/conversation'
import Loader from '@/utils/components/Loader'
import { getUser as getUserProfile } from '@/redux/action/user'

const page = ({ showRightbar, setShowRightbar }: { showRightbar: boolean, setShowRightbar: any }) => {

    ////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const bookId = searchParams.get('book')
    const { currentConversation, initialMessage, isFetching }: { isFetching: boolean, currentConversation: ConversationMessage[], initialMessage: { conversationId: string, initialMessage: string, suggestedQuestions: string[] | [] } } = useSelector((state: RootState) => state.conversation)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

    ////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [message, setMessage] = useState<string>('')
    const [sources, setSources] = useState<[{ pageContent: string, metadata: { fileId: string } }] | []>([])

    ////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
    useEffect(() => {
        bookId && dispatch<any>(getBookDetailsAndStartConversation(bookId))
    }, [bookId])
    useEffect(() => {
        dispatch<any>(getUserProfile())
    }, [])

    ////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    // const handleQuery = (query: string) => {
    // dispatch<any>(queryBook({ query, conversationId: initialMessage.conversationId }))
    //     setShowRightbar(true)
    // }


    async function handleQuery(query: string) {
        try {
            const response = await axios.post('http://localhost:8080/books/query', {
                conversationId: initialMessage.conversationId,
                query
            });

            if (response.status !== 200) {
                console.error(`Request failed with status ${response.status}`);
                return;
            }

            // Create a variable to accumulate the received data
            let receivedData = '';

            response.data.on('data', (chunk: any) => {
                receivedData += chunk;
                try {
                    // Try to parse the received data as JSON
                    const parsedData = JSON.parse(receivedData);

                    // Use the parsed data to display results (modify this part based on your requirements)
                    console.log('parsedData', parsedData);

                    // Clear received data after successfully parsing
                    receivedData = '';
                } catch (error) {
                    // JSON parsing failed, continue accumulating data
                }
            });

            response.data.on('end', () => {
                // Handle the end of the stream, if needed
                console.log('Stream ended');
            });

            response.data.on('error', (error: any) => {
                console.error(`Stream error: ${error.message}`);
            });
        } catch (error) {
            console.error(error);
        }
    }



    const Message = ({ message }: { message: ConversationMessage }) => {
        const isReply = message.role == 'AI'
        return (
            <div className={`flex items-start gap-[1rem] w-full ${isReply ? 'flex-row-reverse justify-end ' : 'flex-row justify-end '} `}>
                <div className={`${isReply ? 'bg-lighter-blue text-main-blue' : 'bg-main-blue text-white'} w-fit rounded-[1rem] px-[2rem] py-[1rem] flex flex-col`}>
                    <span className={` `}>
                        {message.text}
                    </span>
                    {
                        isReply
                            ?
                            <div className="flex justify-start flex-wrap gap-2 mt-[6px] ">
                                {
                                    message.questions.map((question: string, index: number) => (
                                        <button onClick={() => handleQuery(question)} key={index} className='px-[1.5rem] py-[4px] rounded-full border-[1px] border-light-gray ' >{question}</button>
                                    ))
                                }
                            </div>
                            :
                            ''
                    }
                </div>
                <div className={`w-[3rem] h-[3rem] relative rounded-full overflow-hidden `}>
                    <Image
                        src={loggedUser.imageUrl ? loggedUser.imageUrl : '/public/ai.jpg'}
                        alt='Image'
                        layout='fill'
                        className={`w-[3rem] h-[3rem] object-cover border-[1px] border-black `}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white flex justify-between">

            <section style={{ height: 'calc(100vh - 6rem)' }} className="px-[2rem] py-[2rem] bg-white w-full ">
                <div className="chatbox h-full  px-[3rem] overflow-y-scroll flex flex-col justify-between gap-[1rem]  ">
                    <div className="flex flex-col gap-[1.5rem] w-full ">
                        {
                            currentConversation.map((message, index) => (
                                <Message key={index} message={message} />
                            ))
                        }
                    </div>

                    <div className="flex flex-col gap-[8px] ">
                        <div className="w-full relative">
                            <input
                                type="text"
                                maxLength={1500}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Search"
                                className="py-3 px-6 pr-12 w-full rounded-full border-[2px] border-main-blue focus-visible:border-light-gray focus-visible:outline-none"
                            />
                            <button onClick={() => handleQuery(message)} className="flex justify-center items-center w-[44px] h-[44px] absolute right-[4px] top-1/2 -translate-y-1/2 bg-main-blue p-3 rounded-full cursor-pointer">
                                <Send className="bg-main-blue text-white " />
                            </button>
                        </div>
                        <span className="text-red text-[14px] ">Word Count {message.length}/1500</span>
                    </div>
                </div>
            </section>

            {showRightbar && <Rightbar sources={sources} />}

        </div>
    )
}

export default page