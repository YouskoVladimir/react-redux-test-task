import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { UsersList } from '../feature/users/components/UsersList'
import { deepEqual } from '../helpers/utils'
import { usersErrorSelector, usersNamesListSelector } from '../feature/users/redux/usersSelectors'
import { fetchUsersAction } from '../feature/users/redux/usersActions'

export const UsersPage = () => {
  const dispatch = useDispatch()

  const error = useSelector(usersErrorSelector)
  const { usersNames, isLoading, isLoaded } = useSelector(usersNamesListSelector, deepEqual)

  const fetchUsers = useCallback(() => {
    dispatch(fetchUsersAction())
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <div className="d-flex flex-column gap-2 w-100 align-items-center overflow-auto">
      {!isLoaded && <>
        <h2>Users</h2>
        <Button
          disabled={isLoading}
          onClick={fetchUsers}
          variant="outline-secondary"
        > {isLoading ? 'Loading…' : 'Click to load'}</Button>
      </>}
      {error && <Alert variant="danger">
        {error}
      </Alert>}
      <UsersList usersNames={usersNames}/>
    </div>
  )
}
