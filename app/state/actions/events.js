import { createAction } from 'redux-actions'

export const REQUEST_FETCH_EVENTS = 'events/REQUEST_FETCH_EVENTS'
export const SUCCESS_FETCH_EVENTS = 'events/SUCCESS_FETCH_EVENTS'
export const FAILURE_FETCH_EVENTS = 'events/FAILURE_FETCH_EVENTS'

export const REQUEST_FETCH_EVENT = 'events/REQUEST_FETCH_EVENT'
export const SUCCESS_FETCH_EVENT = 'events/SUCCESS_FETCH_EVENT'
export const FAILURE_FETCH_EVENT = 'events/FAILURE_FETCH_EVENT'

export const REQUEST_UPDATE_EVENT = 'events/REQUEST_UPDATE_EVENT'
export const SUCCESS_UPDATE_EVENT = 'events/SUCCESS_UPDATE_EVENT'
export const FAILURE_UPDATE_EVENT = 'events/FAILURE_UPDATE_EVENT'

export const REQUEST_INSERT_EVENT = 'events/REQUEST_INSERT_EVENT'
export const SUCCESS_INSERT_EVENT = 'events/SUCCESS_INSERT_EVENT'
export const FAILURE_INSERT_EVENT = 'events/FAILURE_INSERT_EVENT'

export const REQUEST_DELETE_EVENT = 'events/REQUEST_DELETE_EVENT'
export const SUCCESS_DELETE_EVENT = 'events/SUCCESS_DELETE_EVENT'
export const FAILURE_DELETE_EVENT = 'events/FAILURE_DELETE_EVENT'

export const CLEAR_EVENT = 'events/CLEAR_EVENT'

export const fetchEvents = createAction(REQUEST_FETCH_EVENTS)
export const successFetchEvents = createAction(SUCCESS_FETCH_EVENTS)
export const failureFetchEvents = createAction(FAILURE_FETCH_EVENTS)

export const fetchEvent = createAction(REQUEST_FETCH_EVENT)
export const successFetchEvent = createAction(SUCCESS_FETCH_EVENT)
export const failureFetchEvent = createAction(FAILURE_FETCH_EVENT)

export const updateEvent = createAction(REQUEST_UPDATE_EVENT)
export const successUpdateEvent = createAction(SUCCESS_UPDATE_EVENT)
export const failureUpdateEvent = createAction(FAILURE_UPDATE_EVENT)

export const insertEvent = createAction(REQUEST_INSERT_EVENT)
export const successInsertEvent = createAction(SUCCESS_INSERT_EVENT)
export const failureInsertEvent = createAction(FAILURE_INSERT_EVENT)

export const deleteEvent = createAction(REQUEST_DELETE_EVENT)
export const successDeleteEvent = createAction(SUCCESS_DELETE_EVENT)
export const failureDeleteEvent = createAction(FAILURE_DELETE_EVENT)

export const clearEvent = createAction(CLEAR_EVENT)
