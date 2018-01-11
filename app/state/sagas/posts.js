import { take, fork, select, call, put, all } from 'redux-saga/effects'
import {
  REQUEST_FETCH_POSTS,
  REQUEST_FETCH_MORE_POSTS,
  REQUEST_FETCH_POST_WITH_EVENTS,
  REQUEST_INSERT_POST,
  REQUEST_UPDATE_POST,
  REQUEST_DELETE_POST,
  successFetchPosts,
  failureFetchPosts,
  successFetchMorePosts,
  failureFetchMorePosts,
  fetchEvents,
  successFetchEvents,
  fetchPost,
  successFetchPost,
  failureFetchPost,
  successInsertPost,
  failureInsertPost,
  successUpdatePost,
  failureUpdatePost,
  successDeletePost,
  failureDeletePost,
} from '../actions/posts'
import * as api from '../../lib/api'

function fetchPosts(accessToken, query) {
  return api.fetchPosts(accessToken, query).catch(error => ({ error }))
}

function* handleFetchPosts() {
  while (true) {
    const { payload: { query, onSuccess, onFailure } } = yield take(REQUEST_FETCH_POSTS)
    const accessToken = yield select(state => state.users.accessToken)
    const { items, pageInfo, error } = yield call(fetchPosts, accessToken, query)
    if (error) {
      yield put(failureFetchPosts(error))
      onFailure && onFailure(error)
    } else {
      yield put(successFetchPosts({ items, pageInfo }))
      onSuccess && onSuccess({ items, pageInfo })
    }
  }
}

function fetchMorePosts(accessToken, after) {
  return api.fetchMorePosts(accessToken, after).catch(error => ({ error }))
}

function* handleFetchMorePosts() {
  while (true) {
    const { payload: { after } } = yield take(REQUEST_FETCH_MORE_POSTS)
    const accessToken = yield select(state => state.users.accessToken)
    const { items, pageInfo, error } = yield call(fetchMorePosts, accessToken, after)
    if (error) {
      yield put(failureFetchMorePosts(error))
    } else {
      yield put(successFetchMorePosts({ items, pageInfo }))
    }
  }
}

function fetchPostApi(accessToken, id) {
  if (!id) {
    return Promise.resolve({ item: {} }) // eslint-disable-line
  }
  return api
    .fetchPost(accessToken, id)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function fetchEventsApi(accessToken) {
  return api
    .fetchPostEvents(accessToken)
    .then(items => ({ items }))
    .catch(error => ({ error }))
}

function* handleFetchPostWithEvents() {
  while (true) {
    const { payload: { id, onSuccess, onFailure } } = yield take(REQUEST_FETCH_POST_WITH_EVENTS)
    const accessToken = yield select(state => state.users.accessToken)

    yield put(fetchPost())
    yield put(fetchEvents())

    const [post, events] = yield all([
      call(fetchPostApi, accessToken, id),
      call(fetchEventsApi, accessToken),
    ])

    const error = post.error || events.error
    if (error) {
      yield put(failureFetchPost(error))
      onFailure && onFailure(error)
    } else {
      yield put(successFetchEvents(events))
      yield put(successFetchPost(post))
      onSuccess && onSuccess({ post, events })
    }
  }
}

function insertPost(accessToken, values) {
  return api
    .insertPost(accessToken, values)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleInsertPost() {
  while (true) {
    const { payload: { values, onSuccess, onFailure } } = yield take(REQUEST_INSERT_POST)
    const accessToken = yield select(state => state.users.accessToken)
    const { item, error } = yield call(insertPost, accessToken, values)
    if (error) {
      yield put(failureInsertPost(error))
      onFailure && onFailure(error)
    } else {
      yield put(successInsertPost(item))
      onSuccess && onSuccess(item)
    }
  }
}

function updatePost(accessToken, values) {
  return api
    .updatePost(accessToken, values)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleUpdatePost() {
  while (true) {
    const { payload: { values, onSuccess, onFailure } } = yield take(REQUEST_UPDATE_POST)
    const accessToken = yield select(state => state.users.accessToken)
    const { item, error } = yield call(updatePost, accessToken, values)
    if (error) {
      yield put(failureUpdatePost(error))
      onFailure && onFailure(error)
    } else {
      yield put(successUpdatePost(item))
      onSuccess && onSuccess(item)
    }
  }
}

function deletePost(accessToken, id) {
  return api.deletePost(accessToken, id).catch(error => ({ error }))
}

function* handleDeletePost() {
  while (true) {
    const { payload: { id, onSuccess, onFailure } } = yield take(REQUEST_DELETE_POST)
    const accessToken = yield select(state => state.users.accessToken)
    const { error } = yield call(deletePost, accessToken, id)
    if (error) {
      yield put(failureDeletePost(error))
      onFailure && onFailure(error)
    } else {
      yield put(successDeletePost())
      onSuccess && onSuccess(id)
    }
  }
}

export default function* rootSaga() {
  yield fork(handleFetchPosts)
  yield fork(handleFetchMorePosts)
  yield fork(handleFetchPostWithEvents)
  yield fork(handleInsertPost)
  yield fork(handleUpdatePost)
  yield fork(handleDeletePost)
}
