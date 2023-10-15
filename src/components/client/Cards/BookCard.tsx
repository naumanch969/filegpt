"use client"

import { Book } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setBookReducer } from '@/redux/reducer/book'
import { useDispatch } from 'react-redux'


export default function CategoryCard({ book }: { book: Book }) {

    const dispatch = useDispatch()

    return (
        <div className="bg-lighter-blue md:col-span-3 sm:col-span-2 col-span-1 h-[20rem] flex flex-col justify-between items-start p-[1rem] rounded-[1rem]  ">

            <div className="w-full h-[13rem] bg-main-blue rounded-[1rem] relative overflow-hidden ">
                {
                    book?.webImage &&
                    <Image
                        src={book.webImage}
                        alt="Doctor Guide"
                        layout='fill'
                        className=" mx-auto object-contain  "
                    />
                }
            </div>

            <div className="flex flex-col justify-around h-[5rem] ">
                <h3 className='text-main-blue text-[18px] font-semibold ' >{book.name}</h3>
                <Link
                    href={`/dashboard/chatbot/${book.name.toLocaleLowerCase()}?book=${book._id}&category=${book.category.toLocaleLowerCase()}&subcategory=${book.subcategory.toLocaleLowerCase()}`}
                    onClick={() => dispatch<any>(setBookReducer(book))}
                    className='bg-red text-white w-fit px-[2rem] py-[4px] rounded-[1rem] text-[18px] '
                >Chat</Link>
            </div>


        </div>
    )
}
