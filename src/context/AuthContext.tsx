import { createContext,  useEffect, useState } from "react";
import { authService, AuthResponse } from "@/services/authService";
import { LoginRequest, RegisterRequest, UserInfo } from "@/types/user";
import { clearTokens, getAccessToken, setAccessToken } from "./tokenStore";
import { toast } from "sonner";


type AuthContextType = {
  user: UserInfo | null;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (registerForm: RegisterRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;

  getUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);




export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAccessToken());
  const [user, setUser] = useState<UserInfo | null>(null);
  

  const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await authService.login(data);
    if (res.success) {
      setIsAuthenticated(true);

      await getUser(); // fetch profile after login
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
    await authService.logout();
    clearTokens();
    setIsAuthenticated(false);
    setUser(null);
    toast.message("Logged out successfully");
    window.location.href = "/login";
  };

  const getUser = async () => {
    if (isAuthenticated) {
      const res = await authService.getUserInfo();
      console.log("GetUser at context", res);

      if (res.success && res.data) {
        setUser(res.data);
      }
    }
  };



useEffect(()=>{
  if(isAuthenticated) getUser();
},[isAuthenticated])

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
