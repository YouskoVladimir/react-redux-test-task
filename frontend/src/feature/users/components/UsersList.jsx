import PropTypes from 'prop-types'
import { UsersCard } from './UsersCard'
import '../usersStyles.css'

export const UsersList = ({ usersNames }) => {
  return (
    <div className="d-flex p-2 flex-wrap gap-2 justify-content-around users-list">
      {usersNames.map(name => <UsersCard key={name} userName={name}/>)}
    </div>
  )
}
UsersList.propTypes = {
  usersNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}
