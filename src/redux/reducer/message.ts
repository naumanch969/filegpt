import { Message } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Define the type for your state
interface MessagesState {
    isFetching: boolean;
    error: null | Error;
    messages: Message[];
    currentMessage: Message;
}

const initialState: MessagesState = {
    isFetching: false,
    error: null,
    messages: [],
    currentMessage: {
        createdAt: '',
        updatedAt: '',
        _v: '',
        user: { email: '', name: '', _id: '' },
        _id: '',
    }
};


const messagesSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
        },


        sendMessageReducer: (state, action: PayloadAction<Message[]>) => {
        },
        getMessagesReducer: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        },
        getMessageReducer: (state, action: PayloadAction<Message>) => {
            state.currentMessage = action.payload
        },
        replyMessageReducer: (state, action: PayloadAction<Message[]>) => {
        },
        sendBulkEmailsReducer: (state, action: PayloadAction<Message[]>) => {
        },
        sendEmailsToEveryoneReducer: (state, action: PayloadAction<Message[]>) => {
        },
        sendEmailsToSubscribersReducer: (state, action: PayloadAction<Message[]>) => {
        },


    }
})

export const {
    start, end, error,
    sendMessageReducer,
    getMessagesReducer,
    getMessageReducer,
    replyMessageReducer,
    sendBulkEmailsReducer,
    sendEmailsToEveryoneReducer,
    sendEmailsToSubscribersReducer,
} = messagesSlice.actions
export default messagesSlice.reducer