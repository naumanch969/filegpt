import { User } from '@/interfaces';
import * as api from '../api'
import { start, end, error, registerReducer, loginReducer, requestResetPasswordReducer, resendOTPReducer, verifyOTPReducer, validateTokenReducer, resetPasswordReducer, googleAuthReducer, googleAuthCallbackReducer, logoutReducer, } from '../reducer/user'
import { AsyncAction } from '../store'
import { useRouter } from 'next/navigation';

export const register = (userData: { name: string, email: string, password: string }, router: ReturnType<typeof useRouter>): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.register(userData)
        router.push("/auth/verify");
        // dispatch(registerReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const login = (userData: { email: string, password: string }, router: ReturnType<typeof useRouter>): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        await api.login(userData)
        const { data }: { data: User } = await api.getUser()
        data.category
            ?
            router.push("/dashboard")
            :
            router.push("/auth/category");
        dispatch(loginReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err?.response?.data?.message))
    }
}
export const requestResetPassword = (datad: any): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.requestResetPassword(datad)
        dispatch(requestResetPasswordReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const resendOTP = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.resendOTP()
        dispatch(resendOTPReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const verifyOTP = (otp: string, router: ReturnType<typeof useRouter>): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.verifyOTP(otp)
        router.push('/auth/category')
        dispatch(verifyOTPReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const validateToken = (datad: any): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.validateToken(datad)
        dispatch(validateTokenReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const resetPassword = (datad: any): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.resetPassword(datad)
        dispatch(resetPasswordReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const googleAuth = (datad: any): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.googleAuth(datad)
        dispatch(googleAuthReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const googleAuthCallback = (datad: any): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.googleAuthCallback(datad)
        dispatch(googleAuthCallbackReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const logout = (router: ReturnType<typeof useRouter>): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.logout()
        router.push('/auth/login')
        dispatch(logoutReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}



