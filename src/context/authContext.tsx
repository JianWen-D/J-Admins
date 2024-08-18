import React, { ReactNode, useState, useEffect } from "react";
import {
  getApplicationInfo,
  getApplicationListByUser,
  getUserInfo,
} from "../api/types/auth";
import request from "../api";
import config from "../config";
import { registerMicroApps, start } from "qiankun";
import { formatMenuListToTree } from "../utils";

export const AuthContext = React.createContext<
  | {
      user: any;
      appList: any;
      appInfo: any;
      isLogin: boolean;
      onLogin: () => void;
      logout: () => void;
      changeActiveApp: (id: string) => void;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({
  children,
  userInfo,
}: {
  children: ReactNode;
  userInfo?: any;
}) => {
  const [user, setUser] = useState<any>(userInfo || {});
  const [appList, setAppList] = useState<any[]>([]);
  const [appInfo, setAppInfo] = useState<any>({
    permissionList: [],
  });
  const [activeAppId, setActiveAppId] = useState<string>(
    window.sessionStorage.getItem(
      `${config.APP_NAME}_ACTIVE_APP`.toLocaleUpperCase()
    ) || config.APP_ID
  );
  const [isLogin, setIsLogin] = useState(request.getToken() || false);

  useEffect(() => {
    if (request.getToken()) {
      fetchGetUserInfo();
    }
  }, []);

  // 获取当前用户信息
  const fetchGetUserInfo = async () => {
    const result = await getUserInfo();
    if (result.code === "0") {
      setUser(result.data);
      fetchGetAppListByUser();
      fetchGetApplicationInfo();
      setIsLogin(true);
    }
  };

  // 获取当前用户可用的应用列表
  const fetchGetAppListByUser = async () => {
    const result = await getApplicationListByUser();
    if (result.code === "0") {
      setAppList(result.data);
      initMicroApp(
        result.data.filter((item: { id: string }) => item.id !== config.APP_ID)
      );
    }
  };

  // 获取当前应用信息
  const fetchGetApplicationInfo = async (id?: string) => {
    const result = await getApplicationInfo(id || activeAppId);
    if (result.code === "0") {
      setActiveAppId(id || activeAppId);
      window.sessionStorage.setItem(
        `${config.APP_NAME}_ACTIVE_APP`.toLocaleUpperCase(),
        id || activeAppId
      );
      setAppInfo(result.data);

      console.log(
        formatMenuListToTree(
          result.data.permissionList.filter(
            (item: { type: number }) => item.type === 1
          )
        )
      );
    }
  };

  // 注册微应用
  const initMicroApp = (appList: any[]) => {
    if (appList.length !== 0) {
      registerMicroApps(
        appList.map((item) => ({
          name: item.name,
          entry: item.entry,
          container: item.container,
          activeRule: item.activeRule,
          props: {
            token: request.getToken(),
            auth: {
              page: [],
              element: [],
              api: [],
            },
          },
        }))
      );
      start();
    }
  };

  const changeActiveApp = (id?: string) => {
    fetchGetApplicationInfo(id);
  };

  const handleLogin = async () => {
    fetchGetUserInfo();
  };
  const handleLogout = async () => {
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        appList,
        appInfo,
        isLogin,
        onLogin: handleLogin,
        logout: handleLogout,
        changeActiveApp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
