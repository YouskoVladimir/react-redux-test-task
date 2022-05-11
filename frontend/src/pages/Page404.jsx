import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export const Page404 = () => {
  const navigate = useNavigate()

  return (
    <>
      <h1>404</h1>
      <h2>Page not exist</h2>
      <Button onClick={() => navigate('/')} variant="link">Go to Home page</Button>
    </>
  )
}
