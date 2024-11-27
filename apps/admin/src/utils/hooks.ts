import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { CommonContext } from "../context/commonContext";

// Mount
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 防抖截流
export const useDebounce = (value: any, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay || 400);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};

export const useCommon = () => {
  const context = React.useContext(CommonContext);
  if (!context) {
    throw new Error("useCommonState必须在CommonProvider中使用");
  }
  return context;
};
