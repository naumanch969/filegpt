import * as api from '../api'

import {
    start, end, error,
    getBookDetailsAndStartConversationReducer,
    getConversationMessagesReducer,
    getUserConversationHistoryReducer,
    getConversationIdsReducer,
    queryBookReducer,
} from '../reducer/conversation'
import { AsyncAction } from '../store'


export const getBookDetailsAndStartConversation = (bookId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getBookDetailsAndStartConversation(bookId)
        console.log('data', data)
        dispatch(getBookDetailsAndStartConversationReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}

export const queryBook = (query: { query: string, conversationId: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        dispatch(queryBookReducer({ role: 'HUMAN', text: query.query, sourceDocuments: [], questions: [] }))
        let { data } = await api.queryBook(query)
        data = [data]
        console.log('data', data)
        dispatch(queryBookReducer({ ...data, role: 'AI' }))
        dispatch(end())
    } catch (err: any) {
        console.log('error', err)
        dispatch(error(err.message))
    }
}
export const getConversationMessages = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getConversationMessages()
        dispatch(getConversationMessagesReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getUserConversationHistory = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getUserConversationHistory()
        dispatch(getUserConversationHistoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getConversationIds = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getConversationIds()
        dispatch(getConversationIdsReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}