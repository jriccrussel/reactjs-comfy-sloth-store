import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading, } = useAuth0()
  const [myUser, setMyUser] = useState(null)

  // Auth0 testing
  // useEffect(() => {
  //   console.log(`user: ${user}`)
  //   console.log(`isAuthenticated: ${isAuthenticated}`)
  //   console.log(`isLoading: ${isLoading}`)
  // }, [isAuthenticated])

  // useEffect(() => {
  //   if(isAuthenticated){
  //     setMyUser(user)
  //   } else {
  //     setMyUser(false)
  //   }
  // }, [isAuthenticated])

  useEffect(() => {
    setMyUser(user)
  }, [user])

  return (
    <UserContext.Provider value={{
      loginWithRedirect,
      logout,
      myUser,
      isLoading,
    }}>
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
