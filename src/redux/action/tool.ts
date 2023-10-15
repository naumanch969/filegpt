import * as api from '../api'
import {
    start, end, error,
    getToolsReducer,
    queryToolReducer,
    createToolReducer,
    updateToolReducer,
    deleteToolReducer,
} from '../reducer/tool'
import { AsyncAction } from '../store'
import { Tool } from '@/interfaces'

export const getTools = ({ page, size, cat, sub }: { page?: string, size?: string, cat?: string, sub?: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getTools({ page, size, cat, sub })
        dispatch(getToolsReducer(data.results))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const queryTool = (toolId: string, inputs: object): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.queryTool(toolId, inputs)
        dispatch(queryToolReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const createTool = (toolData: Tool): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.createTool(toolData)
        dispatch(createToolReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const updateTool = (toolId: string, toolData: Tool): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.updateTool(toolId, toolData)
        dispatch(updateToolReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteTool = (toolId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.deleteTool(toolId)
        dispatch(deleteToolReducer(toolId))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}