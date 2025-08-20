import {
  getUserInfoApi,
  loginApi,
  logoutApi,
  registerApi,
} from "@/api/authApi";
import { LoginRequest, RegisterRequest, UserInfo } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { clearTokens, getAccessToken, setAccessToken } from "./tokenStore";
import { toast } from "sonner";

type AuthContextType = {
  user: UserInfo | null;
  login: (credentials: LoginRequest) => Promise<BaseResponse>;
  register: (registerForm: RegisterRequest) => Promise<BaseResponse>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  getUser: () => Promise<void>;
};
type Props = {
  children?: React.ReactNode;
};

type BaseResponse = {
  success: boolean;
  message: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!getAccessToken()
  );
  const [user, setUser] = useState<UserInfo | null>(null);

  const login = async (data: LoginRequest): Promise<BaseResponse> => {
   //no issue here
    const res = await loginApi(data);
    if (res.success && res.token) {
      setAccessToken(res.token);
      setIsAuthenticated(true);

      return {
        success: res.success,
        message: res.message,
      };
    } else {
      return {
        success: res.success,
        message: res.message,
      };
    }
  };

  const register = async (data: RegisterRequest): Promise<BaseResponse> => {
    const res = await registerApi(data);
    if (res.success) {
      return {
        success: res.success,
        message: res.message,
      };
    } else {
      return {
        success: res.success,
        message: res.message,
      };
    }
  };

  const logout = async () => {
    if (isAuthenticated) {
      await logoutApi();
      clearTokens();
      window.location.href = "/login";
      toast.message("Logged out successfully");
    }
  };

  const getUser = async () => {
    if (isAuthenticated) {
      const res = await getUserInfoApi();
      if (res.success && res.data) {
        setUser(res.data);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && !user) {
      getUser();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
