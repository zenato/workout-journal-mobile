import { handleActions } from 'redux-actions'
import {
  REQUEST_SIGN_IN,
  SUCCESS_SIGN_IN,
  FAILURE_SIGN_IN,
  REQUEST_FETCH_LOGGED_INFO,
  SUCCESS_FETCH_LOGGED_INFO,
  FAILURE_FETCH_LOGGED_INFO,
  SIGN_OUT,
} from '../actions/users'

const initialState = {
  loggedInfo: null,
  accessToken: null,
  status: null,
}

export default handleActions(
  {
    [REQUEST_SIGN_IN]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_SIGN_IN]: (state, { type, payload }) => ({
      ...state,
      status: type,
      accessToken: payload.accessToken,
      loggedInfo: payload.loggedInfo,
    }),
    [FAILURE_SIGN_IN]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_FETCH_LOGGED_INFO]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_FETCH_LOGGED_INFO]: (state, { type, payload }) => ({
      ...state,
      status: type,
      loggedInfo: payload,
    }),
    [FAILURE_FETCH_LOGGED_INFO]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [SIGN_OUT]: () => initialState,
  },
  initialState,
)
