import { createContext, useContext, useEffect, useState } from "react";
import ky from "ky";
import * as SecureStore from "expo-secure-store";

type RegisterInput = {
  email: string;
  password: string;
  username: string;
  fullname: string;
}

export type UserData = {
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

interface LoginApiResponseError {
  error: true;
  message: string;
}

interface LoginApiResponseSuccess extends UserData {
  accessToken: string;
}

type LoginApiResponse = LoginApiResponseError | LoginApiResponseSuccess;

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null, userData:  UserData | Record<string, never> };
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onRegister?: (input: RegisterInput) => Promise<any>;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onLogin?: (email: string, password: string) => Promise<LoginApiResponse>;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "token";
export const API_URL = "http://localhost:3333";
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
      return await ky.post(`${API_URL}/users`, { json: input }).json();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { error: true, message: (e as any).response.message };
    }
  };
  
  const login = async (email: string, password: string): Promise<LoginApiResponse> => {
    try {

      const result = await ky.post(`${API_URL}/users/login`, {
        json: { email, password },
      }).json<LoginApiResponse>();

      const data = result as LoginApiResponseSuccess;

      const userData = {
        email: data.email,
        fullname: data.fullname,
        username: data.username,
        id: data.id,
      };

      setAuthState({
        token: data.accessToken,
        authenticated: true,
        userData,
      });

      await SecureStore.setItemAsync(TOKEN_KEY, data.accessToken);
      await SecureStore.setItemAsync("userData", JSON.stringify(userData));

      return {
        ...data,
      };
    } catch (e) {
      if ((e as any).response.status === 401) {
        return { error: true, message: "Invalid email or password" };
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { error: true, message: (e as any).response.message };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync("userData");

    setAuthState({
      token: null,
      authenticated: false,
      userData: {},
    });
  };

  const value: AuthProps = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
