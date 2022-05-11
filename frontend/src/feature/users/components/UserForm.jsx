import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import { FormInput } from '../../../components/FormInput'

export const UserForm = forwardRef(({ defaultValues, onSubmit }, ref) => {
  const submitHandler = e => {
    e.preventDefault()
    onSubmit?.(Object.fromEntries(new FormData(e.target)))
  }

  return (
    <Form ref={ref} onSubmit={submitHandler} validated>
      <FormInput label="Email" type="email" name="email" defaultValue={defaultValues.email} required/>
      <FormInput label="City" type="text" name="city" defaultValue={defaultValues.city} required/>
      <FormInput label="Phone" type="tel" name="phone" defaultValue={defaultValues.phone} required/>
      <FormInput label="Website" type="text" name="website" defaultValue={defaultValues.website} required/>
      <FormInput label="Company Name" type="text" name="companyName" defaultValue={defaultValues.companyName} required/>
    </Form>
  )
})
UserForm.propTypes = {
  defaultValues: PropTypes.shape({
    email: PropTypes.string,
    city: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
    companyName: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
}
