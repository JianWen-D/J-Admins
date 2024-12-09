import React, { ReactNode, useState, useEffect } from "react";
import {
  getApplicationInfo,
  getApplicationInfoWithoutLogin,
  getApplicationListByUser,
  getUserInfo,
} from "../api/types/auth";
import request from "../api";
import config from "../config";
import { registerMicroApps, start } from "qiankun";
import { getMenuListByApplicationId } from "../api/types/role";
import { useCommon } from "./commonContext";

export const AuthContext = React.createContext<
  | {
      user: any;
      appList: any;
      appInfo: any;
      menuList: any[];
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
  const { setAuth } = useCommon();
  const [user, setUser] = useState<any>(userInfo || {});
  const [appList, setAppList] = useState<any[]>([]);
  const [menuList, setMenuList] = useState<any[]>([]);
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
      fetchGetApplicationInfo();
      fetchGetAppListByUser();
      fetchGetMenuListByApplicationId();
      setIsLogin(true);
    } else {
      fetchApplicationInfoWithoutLogin(activeAppId);
    }
  }, []);

  // 获取当前用户信息
  const fetchGetUserInfo = async () => {
    const result = await getUserInfo();
    if (result.code === "0") {
      setUser(result.data);
    }
  };

  // 获取当前用户可用的应用列表
  const fetchGetAppListByUser = async (id?: string) => {
    const result = await getApplicationListByUser();
    if (result.code === "0") {
      setAppList(result.data);
      const activeApp = result.data.find(
        (item: { id: string }) => item.id === (id || activeAppId)
      );
      setAuth("page", activeApp.permissions.page);
      initMicroApp(
        result.data.filter(
          (item: { id: string }) => item.id !== (id || activeAppId)
        )
      );
    }
  };

  const fetchGetMenuListByApplicationId = async (id?: string) => {
    const result = await getMenuListByApplicationId(id || activeAppId);
    if (result.code === "0") {
      setMenuList(result.data);
    }
  };

  // 获取当前应用信息\ - 非登陆
  const fetchApplicationInfoWithoutLogin = async (id: string) => {
    const result = await getApplicationInfoWithoutLogin(id);
    if (result.code === "0") {
      setActiveAppId(id || activeAppId);
      window.sessionStorage.setItem(
        `${config.APP_NAME}_ACTIVE_APP`.toLocaleUpperCase(),
        id || activeAppId
      );
      setAppInfo(result.data);
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
              page: item.permissions.page,
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
    fetchGetMenuListByApplicationId(id);
    fetchGetAppListByUser(id);
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
        onLogin: fetchGetUserInfo,
        logout: handleLogout,
        changeActiveApp,
        menuList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
