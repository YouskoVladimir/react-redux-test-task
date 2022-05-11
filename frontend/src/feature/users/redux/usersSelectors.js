import { createSelector } from '@reduxjs/toolkit'
import { selectSelf } from '../../../app/redux/selectors'

export const usersStateSelector = createSelector(selectSelf, state => state.users)

export const usersErrorSelector = createSelector(usersStateSelector, users => users.error)
export const usersNamesListSelector = createSelector(usersStateSelector, users => ({
  usersNames: users.list.map(user => user.name),
  isLoading: users.isLoading,
  isLoaded: users.isLoaded,
}))

export const createUserByNameSelector = name => createSelector(usersStateSelector, users => users.list.find(user => user.name === name))
