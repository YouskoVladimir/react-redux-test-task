import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    error: null,
    isLoading: false,
    isLoaded: false,
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.list = payload
    },
    updateUser: (state, { payload }) => {
      const index = state.list.findIndex(user => user.name === payload.name)
      if (index === -1) return
      state.list[index] = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
    clearError: (state) => {
      state.error = null
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    setLoaded: (state, { payload }) => {
      state.isLoaded = payload
    },
  },
})

export const {
  setUsers,
  updateUser,
  setLoaded: setUsersLoaded,
  setError: setUsersError,
  clearError: clearUsersError,
  setLoading: setUsersLoading,
} = userSlice.actions

export default userSlice.reducer
