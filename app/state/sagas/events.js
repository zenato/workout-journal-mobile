import { take, fork, select, call, put } from 'redux-saga/effects'
import {
  REQUEST_FETCH_EVENTS,
  REQUEST_FETCH_EVENT,
  REQUEST_INSERT_EVENT,
  REQUEST_UPDATE_EVENT,
  REQUEST_DELETE_EVENT,
  successFetchEvents,
  failureFetchEvents,
  successFetchEvent,
  failureFetchEvent,
  successInsertEvent,
  failureInsertEvent,
  successUpdateEvent,
  failureUpdateEvent,
  successDeleteEvent,
  failureDeleteEvent,
} from '../actions/events'
import * as api from '../../lib/api'

function fetchEvents(accessToken, query) {
  return api
    .fetchEvents(accessToken, query)
    .then(items => ({ items }))
    .catch(error => ({ error }))
}

function* handleFetchEvents() {
  while (true) {
    const { payload: { query, onSuccess, onFailure } } = yield take(REQUEST_FETCH_EVENTS)
    const accessToken = yield select(state => state.users.accessToken)
    const { items, error } = yield call(fetchEvents, accessToken, query)
    if (error) {
      yield put(failureFetchEvents(error))
      onFailure && onFailure(error)
    } else {
      yield put(successFetchEvents(items))
      onSuccess && onSuccess(items)
    }
  }
}

function fetchEvent(accessToken, id) {
  if (id === null) {
    return Promise.resolve({
      item: {
        name: '',
        unit: 'KG',
        value: 0,
        remark: '',
      },
    }) // eslint-disable-line
  }
  return api
    .fetchEvent(accessToken, id)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleFetchEvent() {
  while (true) {
    const { payload: { id, onSuccess, onFailure } } = yield take(REQUEST_FETCH_EVENT)
    const accessToken = yield select(state => state.users.accessToken)
    const { item, error } = yield call(fetchEvent, accessToken, id)
    if (error) {
      yield put(failureFetchEvent(error))
      onFailure && onFailure(error)
    } else {
      yield put(successFetchEvent(item))
      onSuccess && onSuccess(item)
    }
  }
}

function insertEvent(accessToken, values) {
  return api
    .insertEvent(accessToken, values)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleInsertEvent() {
  while (true) {
    const { payload: { values, onSuccess, onFailure } } = yield take(REQUEST_INSERT_EVENT)
    const accessToken = yield select(state => state.users.accessToken)
    const { item, error } = yield call(insertEvent, accessToken, values)
    if (error) {
      yield put(failureInsertEvent(error))
      onFailure && onFailure(error)
    } else {
      yield put(successInsertEvent(item))
      onSuccess && onSuccess(item)
    }
  }
}

function updateEvent(accessToken, values) {
  return api
    .updateEvent(accessToken, values)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleUpdateEvent() {
  while (true) {
    const { payload: { values, onSuccess, onFailure } } = yield take(REQUEST_UPDATE_EVENT)
    const accessToken = yield select(state => state.users.accessToken)
    const { item, error } = yield call(updateEvent, accessToken, values)
    if (error) {
      yield put(failureUpdateEvent(error))
      onFailure && onFailure(error)
    } else {
      yield put(successUpdateEvent(item))
      onSuccess && onSuccess(item)
    }
  }
}

function deleteEvent(accessToken, id) {
  return api.deleteEvent(accessToken, id).catch(error => ({ error }))
}

function* handleDeleteEvent() {
  while (true) {
    const { payload: { id, onSuccess, onFailure } } = yield take(REQUEST_DELETE_EVENT)
    const accessToken = yield select(state => state.users.accessToken)
    const { error } = yield call(deleteEvent, accessToken, id)
    if (error) {
      yield put(failureDeleteEvent(error))
      onFailure && onFailure(error)
    } else {
      yield put(successDeleteEvent())
      onSuccess && onSuccess(id)
    }
  }
}

export default function* rootSaga() {
  yield fork(handleFetchEvents)
  yield fork(handleFetchEvent)
  yield fork(handleInsertEvent)
  yield fork(handleUpdateEvent)
  yield fork(handleDeleteEvent)
}
