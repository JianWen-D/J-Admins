import { Suspense } from "react";
// import "./App.css";
import { ConfigProvider, message } from "antd";
import locale from "antd/locale/zh_CN";
import { JLogin } from "@devin/ui";
import JLayout from "./components/Layout";
import { Outlet, useLocation } from "react-router";
import LoadingSuspense from "./components/Loading";
import JAuth from "./components/Auth";
import config from "./config";
import { fetchLogin, getPasswordKey } from "./api/types/auth";
import JSEncrypt from "jsencrypt";
import request from "./api";
import { useKeepOutlet } from "./components/Keepalive";
import { useAuth } from "./context/authContext";
import { useCommon } from "./context/commonContext";
import theme from "./theme";
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";

const App = () => {
  const { isLogin, onLogin, appInfo } = useAuth();
  const { loading, setLoading, setAuth, auth } = useCommon();
  const location = useLocation();
  const element = useKeepOutlet();
  const miniProgram = qiankunWindow.__POWERED_BY_QIANKUN__;
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

  if (miniProgram) {
    console.log(111)
    // setAuth("page", config.AUTH_WHITE.page);
  }

  return (
    <ConfigProvider locale={locale} theme={theme}>
      {miniProgram && (
        <div id="container">
          <Suspense fallback={<LoadingSuspense />}>
            <JAuth type="page" authKey={location.pathname} auth={auth}>
              <Outlet></Outlet>
            </JAuth>
          </Suspense>
        </div>
      )}
      {!miniProgram && (
        <div className="app">
          {isLogin ? (
            <JLayout>
              <Suspense fallback={<LoadingSuspense />}>
                <div id="container">
                  <JAuth type="page" authKey={location.pathname} auth={auth}>
                    {element}
                  </JAuth>
                </div>
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
      )}
    </ConfigProvider>
  );
};

export default App;
