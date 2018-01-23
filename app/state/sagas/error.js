import { takeEvery, select, put } from 'redux-saga/effects'
import { signOut } from '../actions/users'

function* handleError(action) {
  if (action.error) {
    const statusCode =
      (action.payload && action.payload.response && action.payload.response.status) || 500
    if ([401, 404].includes(statusCode)) {
      const accessToken = yield select(state => state.users.accessToken)
      if (accessToken) {
        yield put(signOut())
      }
    }
  }
}

export default function* rootSaga() {
  yield takeEvery('*', handleError)
}
