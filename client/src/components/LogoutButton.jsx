import { Button } from '@chakra-ui/react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const LogoutButton = () => { 
  const { logout } = useContext(UserContext)
  const navigate = useNavigate()

  const logoutAndNavHome = () => {
    logout(),
    navigate("/")
  }
  
  return (
    <Button variant='outline' onClick={logoutAndNavHome}>Logout</Button>
  )
}
export default LogoutButton