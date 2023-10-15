"use client"

import './style.css'

const Rightbar = ({ sources }: { sources: [{ pageContent: string, metadata: { fileId: string } }] | [] }) => {

    const messages = [
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas debitis architecto, atque obcaecati hic delectus culpa? Facere explicabo praesentium voluptates quibusdam soluta sit dolorum dicta omnis, iste doloremque vero porro voluptatibus labore, culpa suscipit.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas debitis architecto, atque obcaecati hic delectus culpa? Facere explicabo praesentium voluptates vero porro voluptatibus labore, culpa suscipit.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas debitis architecto, atque obcaecati hic quibusdam soluta sit dolorum dicta omnis, iste doloremque vero porro voluptatibus labore, culpa suscipit.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas debitis architecto, atque obcaecati hic quibusdam soluta sit dolorum dicta omnis, iste doloremque vero porro voluptatibus labore, culpa suscipit.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas debitis architecto, atque obcaecati hic delectus culpa? Facere explicabo praesentium voluptates ",
    ]

    return (
        <section style={{ height: 'calc(100vh - 6rem)' }} className="w-[30%] min-w-[25rem] p-[1rem] bg-light-silver " >

            <div className="chatbox overflow-y-scroll h-full p-[1rem] flex flex-col gap-[1rem] ">
                {
                    sources.map((message, index) => (
                        <span key={index} className={`${'text-main-blue '}`} >
                            {message.pageContent}
                        </span>
                    ))
                }
            </div>

        </section>
    )
}

export default Rightbar