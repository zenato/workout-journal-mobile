import { handleActions } from 'redux-actions'
import {
  REQUEST_FETCH_EVENTS,
  SUCCESS_FETCH_EVENTS,
  FAILURE_FETCH_EVENTS,
  REQUEST_FETCH_EVENT,
  SUCCESS_FETCH_EVENT,
  FAILURE_FETCH_EVENT,
  REQUEST_UPDATE_EVENT,
  SUCCESS_UPDATE_EVENT,
  FAILURE_UPDATE_EVENT,
  REQUEST_INSERT_EVENT,
  SUCCESS_INSERT_EVENT,
  FAILURE_INSERT_EVENT,
  REQUEST_DELETE_EVENT,
  SUCCESS_DELETE_EVENT,
  FAILURE_DELETE_EVENT,
  CLEAR_EVENT,
} from '../actions/events'

const initialState = {
  status: null,
  items: null,
  item: null,
}

export default handleActions(
  {
    [REQUEST_FETCH_EVENTS]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_FETCH_EVENTS]: (state, { type, payload }) => ({
      ...state,
      status: type,
      items: payload,
    }),
    [FAILURE_FETCH_EVENTS]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_FETCH_EVENT]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_FETCH_EVENT]: (state, { type, payload }) => ({
      ...state,
      status: type,
      item: payload,
    }),
    [FAILURE_FETCH_EVENT]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_UPDATE_EVENT]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_UPDATE_EVENT]: (state, { type, payload }) => ({
      ...state,
      status: type,
      item: payload,
      items: (state.items || []).map(i => (i.id === state.item.id ? { ...i, ...payload } : i)),
    }),
    [FAILURE_UPDATE_EVENT]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_INSERT_EVENT]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_INSERT_EVENT]: (state, { type, payload }) => ({
      ...state,
      status: type,
      item: payload,
      items: state.items ? [payload, ...state.items] : state.items,
    }),
    [FAILURE_INSERT_EVENT]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_DELETE_EVENT]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_DELETE_EVENT]: (state, { type, payload }) => ({
      ...state,
      status: type,
      item: null,
      items: state.items ? state.items.filter(i => i.id !== state.item.id) : state.items,
    }),
    [FAILURE_DELETE_EVENT]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [CLEAR_EVENT]: state => ({
      ...state,
      status: null,
      item: null,
    }),
  },
  initialState,
)
