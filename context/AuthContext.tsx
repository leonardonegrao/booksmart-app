import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

type RegisterInput = {
  email: string;
  password: string;
  username: string;
  fullname: string;
}

type UserData = {
  id: string;
  email: string;
  fullname: string;
  username: string;
}

type AuthenticationData = {
  token: string | null;
  authenticated: boolean | null;
  userData: UserData | Record<string, never>;
}

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null, userData:  UserData | Record<string, never> };
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onRegister?: (input: RegisterInput) => Promise<any>;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onLogin?: (email: string, password: string) => Promise<any>;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "token";
export const API_URL = "http://192.168.1.206:3333";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthenticationData>({
    token: null,
    authenticated: null,
    userData: {},
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userData = await SecureStore.getItemAsync("userData");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token,
          authenticated: true,
          userData: JSON.parse(userData || "{}"),
        });

        return;
      }

      setAuthState({
        token: null,
        authenticated: false,
        userData: {},
      });
    };

    loadToken();
  }, []);

  const register = async (input: RegisterInput) => {
    try {
      return await axios.post(`${API_URL}/users`, input);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { error: true, message: (e as any).response.data.message };
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/users/login`, { email, password });

      if (result.data.error) {
        return { error: true, message: result.data.message };
      }

      const userData = {
        email: result.data.email,
        fullname: result.data.fullname,
        username: result.data.username,
        id: result.data.id,
      };

      setAuthState({
        token: result.data.accessToken,
        authenticated: true,
        userData,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.accessToken}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);
      await SecureStore.setItemAsync("userData", JSON.stringify(userData));

      return result;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(e);
      return { error: true, message: (e as any).response.data.error };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync("userData");
    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
      userData: {},
    });
  };

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};