"use client"

import Topbar from "@/components/client/Shared/ToolbarTopbar"
import ToolCard from "@/components/client/Cards/ToolCard"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Category, Subcategory, Tool } from "@/interfaces"
import { RootState } from "@/redux/store"
import { getTools } from "@/redux/action/tool"
import { getTools as GetTools } from "@/redux/api"
import { useEffect } from "react"
import { getToolCategory } from "@/redux/action/category"
import { getToolSubcategory } from "@/redux/action/subcategory"

const Tools = () => {

  const { tool: toolCategoryId, toolSubcategoryId }: { tool: string, toolSubcategoryId: string } = useParams()


  ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { currentCategory }: { currentCategory: Category } = useSelector((state: RootState) => state.category)
  const { currentSubcategory }: { currentSubcategory: Subcategory } = useSelector((state: RootState) => state.subcategory)

  ////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const { tools }: { tools: Tool[] } = useSelector((state: RootState) => state.tool)
  console.log('tools', tools)

  ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getTools({ cat: toolCategoryId, sub: toolSubcategoryId }))
  }, [])
  useEffect(() => {
    dispatch<any>(getToolCategory(toolCategoryId))
  }, [toolCategoryId])
  useEffect(() => {
    dispatch<any>(getToolSubcategory(toolCategoryId, toolSubcategoryId))
  }, [toolSubcategoryId])

  ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////


  return (

    <div className="w-full overflow-x-hidden ">

      <div className="flex flex-col gap-[1.5rem] px-[3rem] py-[1.5rem] bg-white ">
        <Topbar
          title={currentCategory.name}
          subTitle={currentSubcategory.name}
        />

        <div className="flex justify-between flex-wrap gap-[1.3rem] ">
          {
            tools.map((tool, index) => (
              <ToolCard tool={tool} key={index} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Tools

// export const getStaticProps = async (params: object) => {
//   const { data } = await GetTools({})
//   console.log('data', data)
// }