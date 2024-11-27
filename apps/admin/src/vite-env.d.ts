/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 更多环境变量...
  readonly VITE_APP_WEB_NAME: string;
  readonly VITE_APP_API_HOST: string;
  readonly VITE_APP_APP_ID: string;
  readonly VITE_APP_APP_NAME: string;
  readonly VITE_APP_APP_ROUTE: string;
  readonly VITE_APP_MINI_PROGRAM: booelan;
}
