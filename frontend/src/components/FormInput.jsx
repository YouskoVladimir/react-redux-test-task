import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'

export const FormInput = ({ label, controlId, ...props }) => {
  return (
    <FormGroup as={Row} className="mb-3" controlId={controlId}>
      <FormLabel column sm="3">
        {label}
      </FormLabel>
      <Col sm="9">
        <FormControl {...props}/>
      </Col>
    </FormGroup>
  )
}
