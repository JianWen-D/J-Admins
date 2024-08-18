interface ConfigProps {
  API_HOST: string; // 后端地址
  APP_ID: string; // 后端地址
  APP_NAME: string; // 后端地址
  MINI_PROGRAM: {
    OPEN: boolean; // 是否开启
    APP_ID: string; // 应用ID
    APP_ROUTER: string; // 应用根路由
  };
  AUTH_WHITE: {
    page: string[];
    element: string[];
    api: string[];
  };
}

const config: ConfigProps = {
  API_HOST: import.meta.env.VITE_APP_API_HOST,
  APP_ID: import.meta.env.VITE_APP_APP_ID,
  APP_NAME: import.meta.env.VITE_APP_APP_NAME,
  MINI_PROGRAM: {
    OPEN: import.meta.env.VITE_APP_MINI_PROGRAM,
    APP_ID: import.meta.env.VITE_APP_APP_ID,
    APP_ROUTER: import.meta.env.VITE_APP_APP_ROUTE,
  },
  AUTH_WHITE: {
    page: [
      "/about",
      "/",
      "/draw",
      "/drawDetail",
      "/system/application",
      "/system/fileGroup",
      "/system/dict",
      "/system/user",
      "/system/account",
    ],
    element: [],
    api: [],
  },
};

export default config;
