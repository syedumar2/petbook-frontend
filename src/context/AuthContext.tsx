import { createContext, useEffect, useState } from "react";
import { authService, AuthResponse } from "@/services/authService";
import {
  LoginRequest,
  OpResult,
  RegisterRequest,
  UserInfo,
  UserUpdateRequest,
} from "@/types/user";
import { clearTokens, getAccessToken, setAccessToken } from "./tokenStore";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

type AuthContextType = {
  user: UserInfo | null;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (registerForm: RegisterRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  getUser: () => Promise<void>;
  updateUser: (
    userData: UserUpdateRequest,
    imageFile?: File
  ) => Promise<OpResult>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!getAccessToken()
  );
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await authService.login(data);
    if (res.success) {
      setIsLoggingOut(false);
      setIsAuthenticated(true);
      await getUser();
    }
    return res;
  };

  const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await authService.register(data);
    if (res.success) {
      toast.success("Registered successfully. You can now log in.");
    }
    return res;
  };

  const logout = async () => {
    setIsLoggingOut(true);
    await authService.logout();
    clearTokens();
    setIsAuthenticated(false);
    setUser(null);
    toast.message("Logged out successfully");
    window.location.hash = "/login"; // Updated for HashRouter
  };

  const getUser = async () => {
    const res = await authService.getUserInfo();
    if (res.success && res.data) {
      setUser(res.data);
    }
  };

  const updateUser = async (
    userData: UserUpdateRequest,
    imageFile?: File
  ): Promise<OpResult> => {
    const res = await authService.updateUserInfo(userData, imageFile);
    if (res.success && res.data) {
      return {
        success: res.success,
        message: res.message ?? "Operation completed.",
      };
    }
    return {
      success: res.success,
      message: res.message ?? "Operation failed.",
    };
  };

  useEffect(() => {
    if (isLoggingOut) return;
    const rehydrate = async () => {
      try {
        const res = await authService.refresh();
        if (res.success && res.token) {
          setAccessToken(res.token);
          setIsAuthenticated(true);
          await getUser();
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    rehydrate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        loading,
        getUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
