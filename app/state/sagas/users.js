import { take, fork, select, call, put } from 'redux-saga/effects'
import {
  REQUEST_SIGN_IN,
  REQUEST_FETCH_LOGGED_INFO,
  SIGN_OUT,
  successSignIn,
  failureSignIn,
  signOut,
  successFetchLoggedInfo,
  failureFetchLoggedInfo,
} from '../actions/users'
import * as api from '../../lib/api'
import { setAccessToken, clearAccessToken } from '../../lib/auth'

function signIn(params) {
  return api
    .signIn(params)
    .then(({ data }) => ({ accessToken: data['access_token'] }))
    .catch(error => ({ error }))
}

function fetchLoggedInfo(accessToken) {
  return api
    .fetchLoggedInfo(accessToken)
    .then(loggedInfo => ({ loggedInfo }))
    .catch(error => ({ error }))
}

function* handleSignIn() {
  while (true) {
    const { payload: { onFailure, ...params } } = yield take(REQUEST_SIGN_IN)
    const { accessToken, error } = yield call(signIn, params)
    if (error) {
      yield put(failureSignIn(error))
      onFailure && onFailure(error)
    } else {
      const { loggedInfo, error: loggedInfoError } = yield fetchLoggedInfo(accessToken)
      if (loggedInfoError) {
        yield put(failureSignIn(loggedInfoError))
        onFailure && onFailure(loggedInfoError)
      } else {
        yield call(setAccessToken, accessToken)
        yield put(successSignIn({ accessToken, loggedInfo }))
      }
    }
  }
}

function* handleSignOut() {
  yield take(SIGN_OUT)
  yield call(clearAccessToken)
  yield put(signOut())
}

function* handleFetchLoggedInfo() {
  while (true) {
    yield take(REQUEST_FETCH_LOGGED_INFO)
    const accessToken = yield select(state => state.users.accessToken)
    const { loggedInfo, error } = yield call(fetchLoggedInfo, accessToken)
    if (error) {
      yield put(failureFetchLoggedInfo(error))
    } else {
      yield put(successFetchLoggedInfo(loggedInfo))
    }
  }
}

export default function* rootSaga() {
  yield fork(handleSignIn)
  yield fork(handleFetchLoggedInfo)
  yield fork(handleSignOut)
}
