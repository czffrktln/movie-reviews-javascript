import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import { Button, Flex, IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon, ChatIcon } from "@chakra-ui/icons"
import { useColorMode } from '@chakra-ui/color-mode'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from "react-router-dom"

const Navbar = () => {
  const { isLoggedIn } = useContext(UserContext)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex justifyContent="space-between" alignItems="center" py={2}>
      <IconButton icon={<ChatIcon />} variant="link" />
      <Flex gap={2}>
        <Link to="/">
          <Button variant="ghost">Home</Button>
        </Link> 
        <Link to="search">
          <Button variant="ghost">Search</Button>
        </Link>
        { isLoggedIn ? <LogoutButton /> : <LoginButton /> }
        <IconButton variant="ghost" onClick={toggleColorMode} icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />} />
      </Flex>
    </Flex>
  )
}

export default Navbar