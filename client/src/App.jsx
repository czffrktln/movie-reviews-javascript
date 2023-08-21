import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import { ChakraProvider, extendTheme, withDefaultColorScheme } from "@chakra-ui/react"
import RootLayout from "./layout/RootLayout"
import Home from "./pages/Home"
import LoginCallback from "./pages/LoginCallback"
import Search from "./pages/Search"
import Movie from "./pages/Movie"
import UserReviews from "./pages/UserReviews"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/callback", element: <LoginCallback /> },
      { path: "/search", element: <Search /> },
      { path: "/movies/:id", element: <Movie /> },
      { path: "/users/:id", element: <UserReviews /> },
    ],
  },
])

const config = { initialColorMode: "light", useSystemColorMode: false }
const theme = extendTheme({ config }, withDefaultColorScheme({ colorScheme: "purple" }))

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ChakraProvider>
  )
}

export default App
