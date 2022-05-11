import { useRef } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { UserForm } from './UserForm'
import { createNextState } from '@reduxjs/toolkit'

export const UserEditModal = ({ show, onUpdate, onClose, user }) => {
  const formRef = useRef(null)

  const closeHandler = () => formRef.current.requestSubmit()

  const submitHandler = data => {
    onUpdate?.(createNextState(user, draft => {
      draft.email = data.email
      draft.address.city = data.city
      draft.phone = data.phone
      draft.website = data.website
      draft.company.name = data.companyName
    }))
    onClose?.()
  }

  return (
    <Modal show={show} onHide={closeHandler} size="lg" centered restoreFocus>
      <Modal.Header closeButton>
        <Modal.Title>Editing <b>{user.name}</b></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm ref={formRef} defaultValues={{
          email: user.email,
          city: user.address.city,
          phone: user.phone,
          website: user.website,
          companyName: user.company.name,
        }} onSubmit={submitHandler}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={closeHandler}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
UserEditModal.propTypes = {
  show: PropTypes.bool,
  onUpdate: PropTypes.func,
  onClose: PropTypes.func,
  user: PropTypes.shape({
    email: PropTypes.string,
    address: PropTypes.shape({
      city: PropTypes.string,
    }),
    phone: PropTypes.string,
    website: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
}
