import * as api from '../api'
import { AsyncAction } from '@/redux/store'
import {
    start, end, error,
    getAllBookSubcategoriesReducer,
    getBookSubcategoriesReducer,
    getBookSubcategoryReducer,
    createBookSubcategoryReducer,
    updateBookSubcategoryReducer,
    deleteBookSubcategoryReducer,

    getAllToolSubcategoriesReducer,
    getToolSubcategoriesReducer,
    createToolSubcategoryReducer,
    getToolSubcategoryReducer,
    updateToolSubcategoryReducer,
    deleteToolSubcategoryReducer,
} from '@/redux/reducer/subcategory'
import { LiveTvSharp } from '@mui/icons-material'

export const getAllBookSubcategories = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        let { data } = await api.getAllBookSubcategories()
        dispatch(getAllBookSubcategoriesReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getBookSubcategories = (categoryId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        let { data } = await api.getBookSubcategories(categoryId)
        dispatch(getBookSubcategoriesReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getBookSubcategory = (categoryId: string, subcategoryId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        let { data } = await api.getBookSubcategory(categoryId, subcategoryId)
        dispatch(getBookSubcategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const createBookSubcategory = (categoryId: string, subcategoryData: { name: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.createBookSubcategory(categoryId, subcategoryData)
        dispatch(createBookSubcategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const updateBookSubcategory = (categoryId: string, subcategoryId: string, subcategoryData: { name: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.updateBookSubcategory(categoryId, subcategoryId, subcategoryData)
        dispatch(updateBookSubcategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteBookSubcategory = (categoryId: string, subcategoryId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.deleteBookSubcategory(categoryId, subcategoryId)
        dispatch(deleteBookSubcategoryReducer(subcategoryId))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}







export const getAllToolSubcategories = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        let { data } = await api.getAllToolSubcategories()
        dispatch(getAllToolSubcategoriesReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getToolSubcategories = (categoryId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        let { data } = await api.getToolSubcategories(categoryId)
        dispatch(getToolSubcategoriesReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const createToolSubcategory = (categoryId: string, subcategoryData: { name: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.createToolSubcategory(categoryId, subcategoryData)
        dispatch(createToolSubcategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getToolSubcategory = (categoryId: string, subcategoryId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getToolSubcategory(categoryId, subcategoryId)
        dispatch(getToolSubcategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const updateToolSubcategory = (categoryId: string, subcategoryId: string, subcategoryData: { name: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.updateToolSubcategory(categoryId, subcategoryId, subcategoryData)
        console.log('data', data)
        dispatch(updateToolSubcategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteToolSubcategory = (categoryId: string, subcategoryId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.deleteToolSubcategory(categoryId, subcategoryId)
        dispatch(deleteToolSubcategoryReducer(subcategoryId))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}