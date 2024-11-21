import { Suspense } from "react";
// import "./App.css";
import { ConfigProvider, message } from "antd";
import locale from "antd/locale/zh_CN";
import { useAuth, useCommon } from "./utils/hooks";
import JLogin from "./components/Login";
import JLayout from "./components/Layout";
import { Outlet, useLocation } from "react-router";
import LoadingSuspense from "./components/Loading";
import JAuth from "./components/Auth";
import config from "./config";
import { fetchLogin, getPasswordKey } from "./api/types/auth";
import JSEncrypt from "jsencrypt";
import request from "./api";
import { useKeepOutlet } from "./components/Keepalive";

interface AppProps {
  miniProgram: boolean | undefined;
}
const App = (props: AppProps) => {
  const { isLogin, onLogin, appInfo } = useAuth();
  const { loading, setLoading, setAuth } = useCommon();
  const location = useLocation();
  const element = useKeepOutlet();

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

  if (props.miniProgram) {
    setAuth("page", config.AUTH_WHITE.page);
  }

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: "#2d8cf0",
          borderRadius: 4,
          controlHeight: 30,
          fontSize: 12,
        },
        components: {
          Table: {
            cellPaddingBlock: 12,
            cellPaddingInline: 12,
          },
        },
      }}
    >
      {props.miniProgram && (
        <div id="container">
          <Suspense fallback={<LoadingSuspense />}>
            <JAuth type="page" authKey={location.pathname}>
              <Outlet></Outlet>
            </JAuth>
          </Suspense>
        </div>
      )}
      {!props.miniProgram && (
        <div className="app">
          {isLogin ? (
            <JLayout>
              <Suspense fallback={<LoadingSuspense />}>
                <div id="container">
                  <JAuth type="page" authKey={location.pathname}>
                    {/* <Outlet></Outlet> */}
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
              logoSrc={
                appInfo.icon ||
                "https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png"
              }
              onSubmit={(data) => handleLogin(data)}
            />
          )}
        </div>
      )}
    </ConfigProvider>
  );
};

export default App;
