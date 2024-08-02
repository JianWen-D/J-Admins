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
const router = (miniProgram: boolean | undefined) => [
  {
    path: "/",
    id: "layout",
    loader: () => ({ title: "系统中心" }),
    element: <App miniProgram={miniProgram}></App>,
    children: [
      {
        path: "",
        id: "home",
        loader: () => ({ title: "首页", desc: "应用首页" }),
        element: lazyComponent("Home"),
      },
      {
        path: "/about",
        id: "about",
        loader: () => ({ title: "关于" }),
        element: lazyComponent("About"),
      },
      {
        path: "/draw",
        id: "draw",
        loader: () => ({ title: "图片模版设置" }),
        element: lazyComponent("Draw"),
      },
      {
        path: "/drawDetail",
        id: "drawDetail",
        loader: () => ({ title: "图片模版设置详情" }),
        element: lazyComponent("DrawDetail"),
      },
    ],
  },
  {
    path: "*",
    id: "nofund",
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
];

export default router;
