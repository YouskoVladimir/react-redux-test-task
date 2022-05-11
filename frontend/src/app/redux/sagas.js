import { all, call } from 'redux-saga/effects'
import usersSaga from '../../feature/users/redux/userSagas'

export default function* rootSaga() {
  yield all([
    call(usersSaga)
  ])
}
