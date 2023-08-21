import { Button } from '@chakra-ui/react'

const LoginButton = () => {
  const googleLink = "https://accounts.google.com/o/oauth2/v2/auth"
  const clientId = "330598393081-dc75pgjbiop5a5f9324iqd7e8rd7g1hh.apps.googleusercontent.com"
  const redirectUri = "http://localhost:5173/callback"
  const scope = "openid%20email%20profile"
  const responseType = "code"
  
  const link = `${googleLink}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=consent`
  
  return (
    <a href={link}>
      <Button variant='outline'>Login with Google</Button>
    </a>
  )
}
export default LoginButton