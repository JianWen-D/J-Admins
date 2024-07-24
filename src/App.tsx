import { Suspense } from "react";
// import "./App.css";
import { ConfigProvider } from "antd";
import locale from "antd/locale/zh_CN";
import { useAuth, useCommon } from "./utils/hooks";
import JLogin from "./components/Login";
import JLayout from "./components/Layout";
import { Outlet, useLocation } from "react-router";
import LoadingSuspense from "./components/Loading";
import JAuth from "./components/Auth";

interface AppProps {
  miniProgram: boolean | undefined;
}
const App = (props: AppProps) => {
  const { isLogin, onLogin } = useAuth();
  const { loading, setLoading } = useCommon();
  const location = useLocation();

  // 出发登录
  const handleLogin = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(data);
    }, 5000);
  };

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: "#2d8cf0",
          borderRadius: 4,
          controlHeight: 36,
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
            <JLayout logoSrc="https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png">
              <Suspense fallback={<LoadingSuspense />}>
                <JAuth type="page" authKey={location.pathname}>
                  <Outlet></Outlet>
                </JAuth>
              </Suspense>
            </JLayout>
          ) : (
            <JLogin
              title="管理后台"
              loading={loading}
              logoSrc="https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png"
              onSubmit={(data) => handleLogin(data)}
            />
          )}
        </div>
      )}
    </ConfigProvider>
  );
};

export default App;
