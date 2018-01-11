import { createAction } from 'redux-actions'

export const REQUEST_SIGN_IN = 'users/REQUEST_SIGN_IN'
export const SUCCESS_SIGN_IN = 'users/SUCCESS_SIGN_IN'
export const FAILURE_SIGN_IN = 'users/FAILURE_SIGN_IN'

export const REQUEST_FETCH_LOGGED_INFO = 'users/REQUEST_FETCH_LOGGED_INFO'
export const SUCCESS_FETCH_LOGGED_INFO = 'users/SUCCESS_FETCH_LOGGED_INFO'
export const FAILURE_FETCH_LOGGED_INFO = 'users/FAILURE_FETCH_LOGGED_INFO'

export const SIGN_OUT = 'users/SIGN_OUT'

export const signIn = createAction(REQUEST_SIGN_IN)
export const successSignIn = createAction(SUCCESS_SIGN_IN)
export const failureSignIn = createAction(FAILURE_SIGN_IN)

export const fetchLoggedInfo = createAction(REQUEST_FETCH_LOGGED_INFO)
export const successFetchLoggedInfo = createAction(SUCCESS_FETCH_LOGGED_INFO)
export const failureFetchLoggedInfo = createAction(FAILURE_FETCH_LOGGED_INFO)

export const signOut = createAction(SIGN_OUT)
