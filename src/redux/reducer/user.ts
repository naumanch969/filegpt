"use client"

import { User } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookie from 'js-cookie'

// Define the type for your state
interface UserState {
    isFetching: boolean;
    error: null | Error;
    users: User[];
    loggedUser: User;
}

const emptyUser = {
    email: '',
    googleId: '',
    name: '',
    imageUrl: '',
    verified: false,
    createdAt: '',
    updatedAt: '',
    category: '',
    role: '',
    conversations: [],
    remainingMessages: 0,
    stripeCustomerId: '',
    subscription: '',
    usageLogs: []
}
const initialState: UserState = {
    isFetching: false,
    error: null,
    users: [],
    loggedUser: Cookie.get('askexpert_profile') ? JSON.parse(Cookie.get('askexpert_profile')) : emptyUser
};


const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action: PayloadAction<Error>) => { state.isFetching = false; state.error = action.payload; },

        registerReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        loginReducer: (state, action: PayloadAction<User>) => { state.loggedUser = action.payload },
        requestResetPasswordReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        resendOTPReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        verifyOTPReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        validateTokenReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        resetPasswordReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        googleAuthReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        googleAuthCallbackReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        logoutReducer: (state) => { state.loggedUser = emptyUser },


        getUserReducer: (state, action: PayloadAction<User>) => { state.loggedUser = action.payload },
        setUserCategoryReducer: (state, action: PayloadAction<User[]>) => { },
        updateUserReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        createCheckoutSubscriptionReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },


    }
})

export const {
    start, end, error,
    registerReducer,
    loginReducer,
    requestResetPasswordReducer,
    resendOTPReducer,
    verifyOTPReducer,
    validateTokenReducer,
    resetPasswordReducer,
    googleAuthReducer,
    googleAuthCallbackReducer,
    logoutReducer,

    getUserReducer,
    setUserCategoryReducer,
    updateUserReducer,
    createCheckoutSubscriptionReducer,
} = usersSlice.actions
export default usersSlice.reducer