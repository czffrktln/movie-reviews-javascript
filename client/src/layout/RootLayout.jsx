import { Outlet } from "react-router-dom"
import { Flex, Box, Divider } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/react"
import Navbar from "../components/Navbar"

const RootLayout = () => {
  const { colorMode } = useColorMode()

  return (
    <Flex w="100%" minH="100vh" justifyContent="center" pb="16" bgColor={colorMode === "light" && "gray.50"}>
      <Box w="80%" maxW="1200px">
        <Navbar />
        <Divider mb={4} />
        <Outlet />
      </Box>
    </Flex>
  )
}

export default RootLayout