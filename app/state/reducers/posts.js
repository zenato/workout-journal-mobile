import { handleActions } from 'redux-actions'
import {
  REQUEST_FETCH_POSTS,
  SUCCESS_FETCH_POSTS,
  FAILURE_FETCH_POSTS,
  REQUEST_FETCH_MORE_POSTS,
  SUCCESS_FETCH_MORE_POSTS,
  FAILURE_FETCH_MORE_POSTS,
  REQUEST_FETCH_EVENTS,
  SUCCESS_FETCH_EVENTS,
  FAILURE_FETCH_EVENTS,
  REQUEST_FETCH_POST,
  SUCCESS_FETCH_POST,
  FAILURE_FETCH_POST,
  REQUEST_UPDATE_POST,
  SUCCESS_UPDATE_POST,
  FAILURE_UPDATE_POST,
  REQUEST_INSERT_POST,
  SUCCESS_INSERT_POST,
  FAILURE_INSERT_POST,
  REQUEST_DELETE_POST,
  SUCCESS_DELETE_POST,
  FAILURE_DELETE_POST,
} from '../actions/posts'

const initialState = {
  status: null,
  events: null,
  items: null,
  item: null,
  pageInfo: {
    hasNextPage: false,
    endCursor: null,
  },
}

export default handleActions(
  {
    [REQUEST_FETCH_POSTS]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_FETCH_POSTS]: (state, { type, payload }) => ({
      ...state,
      status: type,
      items: payload.items,
      pageInfo: payload.pageInfo,
    }),
    [FAILURE_FETCH_POSTS]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_FETCH_MORE_POSTS]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_FETCH_MORE_POSTS]: (state, { type, payload }) => ({
      ...state,
      status: type,
      items: [...state.items, ...payload.items],
      pageInfo: payload.pageInfo,
    }),
    [FAILURE_FETCH_MORE_POSTS]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_FETCH_POST]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_FETCH_POST]: (state, { type, payload }) => ({
      ...state,
      status: type,
      item: payload.item,
    }),
    [FAILURE_FETCH_POST]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_UPDATE_POST]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_UPDATE_POST]: (state, { type, payload }) => ({
      ...state,
      status: type,
      item: {
        ...payload,
        performances: payload.performances.map(p => ({
          ...p,
          event: { id: p.event.id },
        })),
      },
      items: (state.items || []).map(i => (i.id === payload.id ? payload : i)),
    }),
    [FAILURE_UPDATE_POST]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_INSERT_POST]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_INSERT_POST]: (state, { type, payload }) => ({
      ...state,
      status: type,
      item: {
        ...payload,
        performances: payload.performances.map(p => ({
          ...p,
          event: { id: p.event.id },
        })),
      },
      items: state.items ? [payload, ...state.items] : state.items,
    }),
    [FAILURE_INSERT_POST]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_DELETE_POST]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_DELETE_POST]: (state, { type, payload }) => ({
      ...state,
      status: type,
      items: state.items ? state.items.filter(i => i.id !== state.item.id) : state.items,
    }),
    [FAILURE_DELETE_POST]: (state, { type }) => ({
      ...state,
      status: type,
    }),

    [REQUEST_FETCH_EVENTS]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [SUCCESS_FETCH_EVENTS]: (state, { type, payload }) => ({
      ...state,
      status: type,
      events: payload.items,
    }),
    [FAILURE_FETCH_EVENTS]: (state, { type }) => ({
      ...state,
      status: type,
    }),
  },
  initialState,
)
