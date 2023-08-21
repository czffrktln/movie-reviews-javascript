import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [ user, setUser ] = useState(null)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  
  const login = (user, token) => {
    setUser(user)
    setIsLoggedIn(true)
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  }
  
  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  useEffect(()=> {
    if (localStorage.getItem("token")) {
      setUser(JSON.parse(localStorage.getItem("user")))
      setIsLoggedIn(true)
    }
  }, [])
 
  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
    )
}
