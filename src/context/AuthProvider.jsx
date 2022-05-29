import React, {createContext, useEffect, useState} from 'react';
import { getToken } from '../config/token';
import { authService } from '../services/authService';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    loadStorageData().catch((error) => console.log(error));
  }, []);

  const loadStorageData = async () => {
    try {
      const token = await getToken();
      if (token) {
        setAuthData(token);
      }
    } catch (error) {
    }
  }

  const signIn = async (email, password) => {
    const _authData = await authService.signIn(
      email,
      password,
    );
    setAuthData(_authData);
  };

  const signOut = async () => {
    setAuthData(undefined);
  };

  return (
    <AuthContext.Provider value={{authData, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider