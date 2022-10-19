import { createContext, useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext();

export const AuthGuardProvider = ({children}) => {
  const { isAuthenticated,loginWithRedirect,logout,getAccessTokenSilently, user } = useAuth0();
  const { token, setToken } = useState('');

  const useGetAccesstokenAndGetUser = () => {
    useEffect(() => {
      const getToken = async () => {
        try {
          const accessToken = await getAccessTokenSilently({})
          setToken(accessToken)
        } catch (e) {
          console.log(e.message)
        }
      }
      getToken();
    }, []);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginWithRedirect, logout, useGetAccesstokenAndGetUser, token, user }}>
      { children }
    </AuthContext.Provider>
  )
}
