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
    loader: () => ({ title: "英才中台" }),
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
        path: "/system/application",
        id: "application",
        loader: () => ({ title: "应用管理", desc: "管理整个中台应用程序" }),
        element: lazyComponent("Application"),
      },
      {
        path: "/system/fileGroup",
        id: "fileGroup",
        loader: () => ({
          title: "文件管理",
          desc: "管理中台的所有上传文件以及图片",
        }),
        element: lazyComponent("FileGroup"),
      },
      {
        path: "/system/dict",
        id: "dict",
        loader: () => ({
          title: "字典管理",
          desc: "管理中台的所有字典信息",
        }),
        element: lazyComponent("Dict"),
      },
      {
        path: "/system/user",
        id: "user",
        loader: () => ({
          title: "用户管理",
          desc: "管理中台的所有用户信息",
        }),
        element: lazyComponent("User"),
      },
      {
        path: "/system/account",
        id: "account",
        loader: () => ({
          title: "账号管理",
          desc: "管理中台的所有账号信息",
        }),
        element: lazyComponent("Account"),
      },
      {
        path: "/system/role",
        id: "role",
        loader: () => ({
          title: "角色管理",
          desc: "管理中台的所有角色信息",
        }),
        element: lazyComponent("Role"),
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
