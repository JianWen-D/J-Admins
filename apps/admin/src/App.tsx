import { Suspense } from "react";
// import "./App.css";
import { ConfigProvider, message } from "antd";
import locale from "antd/locale/zh_CN";
import { JLogin } from "@devin/ui";
import JLayout from "./components/Layout";
import { useRoutes } from "react-router";
import LoadingSuspense from "./components/Loading";
import config from "./config";
import { fetchLogin, getPasswordKey } from "./api/types/auth";
import JSEncrypt from "jsencrypt";
import request from "./api";
import { useAuth } from "./context/authContext";
import { useCommon } from "./context/commonContext";
import theme from "./theme";
import router from "./router";

const App = () => {
  const { isLogin, onLogin, appInfo } = useAuth();
  const { loading, setLoading } = useCommon();

  const fetchGetPasswordKey = async (
    password: string,
    callback: (password: string) => void
  ) => {
    const result = await getPasswordKey();
    if (result.code === "0") {
      const crypt = new JSEncrypt();
      crypt.setKey(result.data);
      if (crypt.encrypt(password)) {
        callback(crypt.encrypt(password) as string);
      }
    }
  };

  // 登录
  const handleLogin = (data: any) => {
    setLoading(true);
    try {
      fetchGetPasswordKey(data.password, async (password) => {
        const params = {
          username: data.username,
          password: password,
          appid: config.APP_ID,
        };
        const result = await fetchLogin(params);
        if (result.code === "0") {
          request.setToken(result.data.accessToken);
          onLogin();
          if (data.remember) {
            window.localStorage.setItem(
              `${config.APP_NAME}_ACCOUNT`.toLocaleUpperCase(),
              JSON.stringify({
                username: data.username,
                password: data.password,
              })
            );
          }
        } else {
          message.error(result.msg);
          setLoading(false);
        }
      });
    } catch (error) {
      message.error("登录失败");
      setLoading(false);
    }
  };

  return (
    <ConfigProvider locale={locale} theme={theme}>
      <div className="app">
        {isLogin ? (
          <JLayout>
            <Suspense fallback={<LoadingSuspense />}>
              <div id="container"></div>
              {useRoutes(router(false))}
            </Suspense>
          </JLayout>
        ) : (
          <JLogin
            title={appInfo.name || "管理后台"}
            applicationName={config.APP_NAME}
            loading={loading}
            logoSrc={appInfo.icon || null}
            onSubmit={(data) => handleLogin(data)}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default App;
