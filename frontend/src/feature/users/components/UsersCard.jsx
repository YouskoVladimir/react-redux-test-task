import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { UserEditModal } from './UserEditModal'
import { updateUserAction } from '../redux/usersActions'
import { createUserByNameSelector } from '../redux/usersSelectors'

export const UsersCard = ({ userName }) => {
  const dispatch = useDispatch()

  const [showEditUserModal, setShowEditUserModal] = useState(false)

  const user = useSelector(createUserByNameSelector(userName))

  const updatedUserHandler = newUser => dispatch(updateUserAction(newUser))

  const selectHandler = e => {
    e.target.focus()
    e.stopPropagation()
  }

  return (
    <>
      <button
        className="user-card"
        onDoubleClick={() => setShowEditUserModal(true)}
        onMouseDown={selectHandler}
      >
        <header>{user.name}</header>
        <main>
          {user.email} <br/>
          {user.address.city} <br/>
          {user.phone} <br/>
          {user.website} <br/>
          {user.company.name} <br/>
        </main>
      </button>
      <UserEditModal
        show={showEditUserModal}
        onClose={() => setShowEditUserModal(false)}
        onUpdate={updatedUserHandler}
        user={user}
      />
    </>
  )
}
UsersCard.propTypes = {
  userName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
}
