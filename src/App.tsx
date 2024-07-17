import React, { Suspense } from "react";
// import "./App.css";
import { ConfigProvider } from "antd";
import locale from "antd/locale/zh_CN";
import { useAuth, useCommon } from "./utils/hooks";
import JLogin from "./components/Login";
import JLayout from "./components/Layout";

const App = () => {
  const { isLogin, onLogin } = useAuth();
  const { loading, setLoading } = useCommon();

  // 出发登录
  const handleLogin = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(data);
    }, 5000);
  };
  return (
    <Suspense fallback={<span>loading</span>}>
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
        <div className="app">
          {isLogin ? (
            <JLayout logoSrc="https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png"></JLayout>
          ) : (
            <JLogin
              title="管理后台"
              loading={loading}
              logoSrc="https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png"
              onSubmit={(data) => handleLogin(data)}
            />
          )}
        </div>
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
