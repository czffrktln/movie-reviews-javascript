import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useEffect } from "react"
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import { Spinner } from "@chakra-ui/react"

const LoginCallback = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()
  
  const urlSearchParams = new URLSearchParams(window.location.search)
  const code = urlSearchParams.get("code")

  const serverUrl = import.meta.env.VITE_SERVER_URL

  const sendCode = async () => {
    const response = await axios.post(`${serverUrl}/api/login`, {code})
    const token = response.data
    const decodedToken = jwt_decode(token)
    const user = {name: decodedToken.data.name, picture: decodedToken.data.picture, id: decodedToken.data._id}
    login(user, token)
    navigate("/")
  }

  useEffect(() => {
    sendCode()
  }, [])

  return (
    <Spinner />
  )
}
export default LoginCallback