import React, { ReactNode, useState } from "react";
import { DictProps, getDictList } from "../api/types/dict";
import { useMount } from "ahooks";
import request from "../api";

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
      auth: {
        page: string[];
        element: string[];
        api: string[];
      };
      setAuth: (type: "page" | "element" | "api", data: string[]) => void;
      dictList: {
        [key: string]: DictProps[];
      };
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
  const [dictList, setDictList] = useState<{
    [key: string]: DictProps[];
  }>({});
  const [authData, setAuthData] = useState<AuthProps>(
    auth || {
      page: ["/certificate/setting"],
      element: [],
      api: [],
    }
  );

  useMount(() => {
    if (request.getToken()) {
      fetchDictData();
    }
  });

  // 获取系统预设字典
  const fetchDictData = async () => {
    const result = await getDictList(["PermissionType", "Gender"]);
    if (result.code === "0") {
      setDictList(result.data);
    }
  };

  // 设置loading
  const handleSetLoading = (value: boolean) => {
    setLoading(value);
  };

  // 设置权限
  const handleSetAuth = (type: "page" | "element" | "api", value: string[]) => {
    setAuthData({
      ...authData,
      [type]: value,
    });
  };

  return (
    <CommonContext.Provider
      value={{
        loading,
        setLoading: handleSetLoading,
        auth: authData,
        setAuth: handleSetAuth,
        dictList,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};
