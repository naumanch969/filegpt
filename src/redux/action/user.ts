"use client"

import { useRouter } from 'next/navigation'
import * as api from '../api'
import { start, end, error, getUserReducer, setUserCategoryReducer, updateUserReducer, createCheckoutSubscriptionReducer } from '../reducer/user'
import { AsyncAction } from '../store'

export const getUser = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getUser()
        dispatch(getUserReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const setUserCategory = (category: string, router: ReturnType<typeof useRouter>): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.setUserCategory(category)
        router.push("/auth/login");
        // dispatch(setUserCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const updateUser = (userData: { name: string, imageUrl: string, oldPassword: string, newPassword: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.updateUser(userData)
        dispatch(updateUserReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
} 