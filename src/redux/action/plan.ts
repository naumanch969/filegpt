import { Plan } from '@/interfaces'
import * as api from '../api'
import { start, end, error, createPlanReducer, updatePlanReducer, getPlansReducer, getPlanReducer, deletePlanReducer, } from '../reducer/plan'
import { AsyncAction } from '../store'

export const createPlan = (planData: Plan): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.createPlan(planData)
        dispatch(createPlanReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const updatePlan = (planId: string, planData: Plan): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.updatePlan(planId, planData)
        dispatch(updatePlanReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getPlans = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getPlans()
        dispatch(getPlansReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getPlan = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getPlan()
        dispatch(getPlanReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deletePlan = (planId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.deletePlan(planId)
        dispatch(deletePlanReducer(planId))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}