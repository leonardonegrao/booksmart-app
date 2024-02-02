import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

type RegisterInput = {
  email: string;
  password: string;
  username: string;
  fullname: string;
}

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (input: RegisterInput) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'token';
export const API_URL = 'http://localhost:3333';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setAuthState({
          token,
          authenticated: true,
        })
      }

      setAuthState({
        token: null,
        authenticated: false,
      })
    }

    loadToken();
  }, [])

  const register = async (input: RegisterInput) => {
    try {
      return await axios.post(`${API_URL}/signup`, input);
    } catch (e) {
      return { error: true, message: (e as any).response.data.message };
    }
  }
  
  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/users/login`, { email, password });

      if (result.data.error) {
        return { error: true, message: result.data.message };
      }

      setAuthState({
        token: result.data.accessToken,
        authenticated: true,
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);

      return result;
    } catch (e) {
      return { error: true, message: (e as any).response.data.error };
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false,
    })
  }

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}