import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

import { localStorageManager } from "../services";

import {
  CUSTOMER_ID,
  REFRESH_TOKEN,
  REMEMBER_ME,
  TOKEN,
  USER_ID,
} from "../constants";

import routes from "../routes";

import {
  HttpErrorResponse,
  ILoginFormValues,
  IRegistrationFormValues,
} from "../interfaces/auth.interfaces";

import { IUser } from "../interfaces/user.interfaces";

type AuthType = {
  access_token: string;
  refresh_token: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
};

interface AuthContextInterface {
  isInitializing: boolean;
  isAuthenticated: boolean;
  userId: string | number | null;
  rememberMe: boolean;
  userData: IUser | null;
  signUp: (userData: IRegistrationFormValues) => Promise<AuthType>;
  login: (userData: ILoginFormValues) => Promise<AuthType>;
  logout: () => void;
  setUserData: (user: IUser) => void;
  handleAuth: (
    access_token: string,
    refresh_token: string,
    rememberMe: boolean
  ) => void;
}

const authAPI = axios.create({
  baseURL: routes.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.data.email[0] ===
      "user with this email address already exists."
    ) {
      toast.error("Email already exists");
      return error.response.data.email[0];
    }
    throw new Error(error.response.data.message);
  }
);

const signUpMutation = (userData: IRegistrationFormValues) =>
  authAPI.post(routes.registration, userData).then((res) => res.data);

const loginMutation = (userData: ILoginFormValues) =>
  authAPI.post(routes.login, userData).then((res) => res.data);

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextInterface;

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [token, setAuthToken] = useState(() => {
    return (
      localStorageManager.getItem(TOKEN) || sessionStorage.getItem(TOKEN) || ""
    );
  });

  const [refreshToken, setAuthRefreshToken] = useState(() => {
    return (
      localStorageManager.getItem(REFRESH_TOKEN) ||
      sessionStorage.getItem(REFRESH_TOKEN) ||
      ""
    );
  });

  const [rememberMe, _setRememberMe] = useState<boolean>(false);

  const { mutateAsync: loginRequestMutation } = useMutation(
    "loginMutation",
    (values: ILoginFormValues) => loginMutation(values)
  );

  const { mutateAsync: signUpRequestMutation } = useMutation(
    "signUpMutation",
    (values: IRegistrationFormValues) => signUpMutation(values)
  );

  const signUp = async (userData: IRegistrationFormValues) => {
    try {
      const data = await signUpRequestMutation(userData);
      const { access_token, refresh_token } = data;

      localStorageManager.setItem(TOKEN, access_token);
      localStorageManager.setItem(REFRESH_TOKEN, refresh_token);
      return data;
    } catch (e) {
      throw new Error((e as HttpErrorResponse).message);
    }
  };

  const login = async (userData: ILoginFormValues) => {
    try {
      const data = await loginRequestMutation(userData);
      const { access_token, refresh_token } = data;

      localStorageManager.setItem(TOKEN, access_token);
      localStorageManager.setItem(REFRESH_TOKEN, refresh_token);

      return data;
    } catch (e) {
      toast.error("Wrong email or password");
      throw new Error((e as HttpErrorResponse).message);
    }
  };

  const resetToken = async () => {
    localStorageManager.removeItem(TOKEN);
    localStorageManager.removeItem(REFRESH_TOKEN);
  };

  const setToken = (access_token: string, refresh_token: string) => {
    localStorageManager.setItem<typeof access_token>(TOKEN, access_token);
    localStorageManager.setItem<typeof refresh_token>(
      REFRESH_TOKEN,
      refresh_token
    );
    setAuthToken(access_token);
    setAuthRefreshToken(refresh_token);
  };

  const handleAuth = (access_token: string, refresh_token: string) => {
    setToken(access_token, refresh_token);
  };

  const logout = () => {
    resetToken();
    localStorage.removeItem(REMEMBER_ME);
    localStorage.removeItem(USER_ID);
    setAuthToken("");
    setAuthRefreshToken("");
  };

  useEffect(() => {
    token && refreshToken ? handleAuth(token, refreshToken) : logout();
  }, []);

  const isInitializing = !!token;

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        userId,
        isInitializing,
        isAuthenticated,
        rememberMe,
        userData,
        signUp,
        setUserData,
        login,
        handleAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
