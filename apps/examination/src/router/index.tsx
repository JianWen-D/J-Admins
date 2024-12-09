import React, { lazy } from "react";
import App from "../App";
import { Button, Result } from "antd";

/**
 * 懒加载页面
 * @param path 页面地址
 * @returns 组件
 */
const lazyComponent = (path: string): React.ReactElement => {
  const Pages = lazy(() => import(`./../pages/${path}/index.tsx`));
  return <Pages />;
};

// 路由数组
const router = [
  {
    path: "/",
    id: "layout",
    loader: () => ({ title: "英才考级" }),
    element: <App></App>,
    children: [
      {
        path: "/archives/province",
        id: "archivesProvince",
        loader: () => ({ title: "省级档案" }),
        element: lazyComponent("Province"),
      },
      {
        path: "*",
        id: "nofund",
        loader: () => ({ title: "页面不存在" }),
        element: (
          <Result
            status="404"
            title="404"
            subTitle="抱歉，该页面不存在"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  window.history.go(-1);
                }}
              >
                返回上一页
              </Button>
            }
          />
        ),
      },
    ],
  },
];

export default router;
