import React, { ReactNode, useState, useEffect } from "react";

export const AuthContext = React.createContext<
  | {
      user: any;
      isLogin: boolean;
      onLogin: (form: any) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>({});
  // const history = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {}, []);

  const handleLogin = async (form: any) => {
    setUser(form);
    setIsLogin(true);
  };
  const handleLogout = async () => {};

  return (
    <AuthContext.Provider
      value={{ user, isLogin, onLogin: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
