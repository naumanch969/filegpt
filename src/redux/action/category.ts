import * as api from '../api'
import {
    start, end, error,
    getAllBookCategoriesReducer,
    getBookCategoryReducer,
    createBookCategoryReducer,
    deleteBookCategoryReducer,
    udpateBookCategoryReducer,
    getAllToolCategoriesReducer,
    getToolCategoryReducer,
    createToolCategoryReducer,
    updateToolCategoryReducer,
    deleteToolCategoryReducer,
} from '../reducer/category'

import { AsyncAction } from '@/redux/store'

export const getAllBookCategories = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getAllBookCategories()
        dispatch(getAllBookCategoriesReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getBookCategory = (categoryId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getBookCategory(categoryId)
        console.log('data', data)
        dispatch(getBookCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const createBookCategory = (categoryData: { name: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start());
        const { data } = await api.createBookCategory(categoryData);
        dispatch(createBookCategoryReducer(data));
        dispatch(end());
    } catch (err: any) {
        dispatch(error(err.message));
    }
};

export const udpateBookCategory = (categoryId: string, categoryData: object): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.udpateBookCategory(categoryId, categoryData)
        dispatch(udpateBookCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteBookCategory = (categoryId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.deleteBookCategory(categoryId)
        dispatch(deleteBookCategoryReducer(categoryId))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}

export const getAllToolCategories = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getAllToolCategories()
        dispatch(getAllToolCategoriesReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getToolCategory = (categoryId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getToolCategory(categoryId)
        dispatch(getToolCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const createToolCategory = (categoryData: { name: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.createToolCategory(categoryData)
        dispatch(createToolCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const updateToolCategory = (categoryId: string, categoryData: { name: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.updateToolCategory(categoryId, categoryData)
        dispatch(updateToolCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteToolCategory = (categoryId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.deleteToolCategory(categoryId)
        dispatch(deleteToolCategoryReducer(categoryId))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}