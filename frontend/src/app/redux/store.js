import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import usersReducer from '../../feature/users/redux/userSlice'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    users: usersReducer,
  },
  devTools: import.meta.env.MODE === 'development',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
