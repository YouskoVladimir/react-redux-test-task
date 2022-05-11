import { all, call, put, takeEvery, takeLeading } from 'redux-saga/effects'
import { clearUsersError, setUsers, setUsersError, setUsersLoaded, setUsersLoading, updateUser } from './userSlice'
import { fetchUsersAction, updateUserAction } from './usersActions'
import { fetchUsers } from '../usersApi'
import { getType } from '@reduxjs/toolkit'


export function* fetchUsersSaga() {
  try {
    yield all([
      put(setUsersLoading(true)),
      put(clearUsersError()),
    ])
    const { data: users } = yield call(fetchUsers)
    yield all([
      put(setUsers(users)),
      put(setUsersLoaded(true)),
    ])
  } catch (e) {
    yield put(setUsersError(e.message))
  } finally {
    yield put(setUsersLoading(false))
  }
}

export function* updateUserSaga({ payload }) {
  yield put(updateUser(payload))
}

export default function* usersSaga() {
  yield all([
    takeLeading(getType(fetchUsersAction), fetchUsersSaga),
    takeEvery(getType(updateUserAction), updateUserSaga),
  ])
}
