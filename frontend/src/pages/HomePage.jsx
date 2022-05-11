import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import bgUrl from '../assets/bg.jpg'
import { Acryl } from '../components/Acryl/Acryl'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Acryl
      className="w-100 h-100 d-flex align-items-center justify-content-center"
      background={`url('${bgUrl}') no-repeat center/cover fixed`}
      contentClassName="d-flex flex-column align-items-start gap-4 container container-fluid"
      blendColor="rgba(0, 0, 0, 0.4)"
    >
      <h1 className="text-warning display-1">Home page</h1>
      <p className="lead text-warning">React redux test task</p>
      <Button onClick={() => navigate('/users')} variant="outline-warning" size="lg">Go to Users page</Button>
    </Acryl>
  )
}
