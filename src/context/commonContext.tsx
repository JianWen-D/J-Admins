import React, { ReactNode, useState } from "react";
import config from "../config";

// 用户信息

interface AuthProps {
  page: string[];
  element: string[];
  api: string[];
}

export const CommonContext = React.createContext<
  | {
      loading: boolean;
      setLoading: (data: boolean) => void;
      auth: AuthProps;
      setAuth: (type: "page" | "element" | "api", data: string[]) => void;
    }
  | undefined
>(undefined);

CommonContext.displayName = "CommonContext";

export const CommonProvider = ({
  children,
  auth,
}: {
  children: ReactNode;
  auth?: AuthProps;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [authData, setAuthData] = useState<AuthProps>(
    auth || {
      page: config.AUTH_WHITE.page || [],
      element: config.AUTH_WHITE.element || [],
      api: config.AUTH_WHITE.api || [],
    }
  );

  // 设置loading
  const handleSetLoading = (value: boolean) => {
    setLoading(value);
  };

  // 设置权限
  const handleSetAuth = (type: "page" | "element" | "api", value: string[]) => {
    setAuthData({
      ...authData,
      [type]: [...config.AUTH_WHITE[type], ...value],
    });
  };

  return (
    <CommonContext.Provider
      value={{
        loading,
        setLoading: handleSetLoading,
        auth: authData,
        setAuth: handleSetAuth,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};
