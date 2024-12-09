interface ConfigProps {
  API_HOST: string;
  APP_ID: string;
  APP_NAME: string;
  MINI_PROGRAM: {
    OPEN: boolean;
    APP_ID: string;
    APP_ROUTER: string;
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
    page: [],
    element: [],
    api: [],
  },
};

export default config;
