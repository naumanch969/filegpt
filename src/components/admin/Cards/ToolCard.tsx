"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Book {
    _id: string,
    name: string,
    category: string,
    subcategory: string,
    indexName: string,
    webImage: string,
    mobileImage: string,
    __v: number
}

export default function CategoryCard({ book }: { book: Book }) {

    const router = useRouter()

    return (
        <div className="bg-lighter-blue lg:w-[32%] sm:w-[48%] w-full  h-[20rem] flex flex-col justify-between items-start p-[1rem] rounded-[1rem]  ">

            <div className="w-full h-[13rem] bg-main-blue rounded-[1rem]  ">
                {/* {
                    book?.webImage &&
                    <Image
                        src={book.webImage}
                        width={16 * 16}
                        height={13 * 16}
                        alt="Doctor Guide"
                        className=" mx-auto object-contain  "
                    />
                } */}
            </div>

            <div className="flex flex-col justify-around h-[5rem] ">
                <h3 className='text-main-blue text-[18px] font-semibold ' >{book.name}</h3>
                <Link
                    href={`/chatbot/${book.name.toLocaleLowerCase()}?category=${book.category.toLocaleLowerCase()}&subcategory=${book.subcategory.toLocaleLowerCase()}`}
                    className='bg-red text-white w-fit px-[2rem] py-[4px] rounded-[1rem] text-[18px] '
                >Chat</Link>
            </div>


        </div>
    )
}
