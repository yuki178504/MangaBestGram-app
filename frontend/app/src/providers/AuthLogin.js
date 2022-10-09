import { createContext, useState } from "react";

export const AuthLoginContext = createContext({});

export const AuthLoginProvider = (props) => {

  const { children } = props;

  const [ isSignedIn, setIsSignedIn ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ currentUser, setCurrentUser ] = useState();

  return (
    <AuthLoginContext.Provider value={{ isSignedIn, setIsSignedIn, loading, setLoading, currentUser, setCurrentUser }}>
      { children }
    </AuthLoginContext.Provider>
  );
};
