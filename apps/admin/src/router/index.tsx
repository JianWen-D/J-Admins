import React, { lazy } from "react";
import { JNoFound } from "@devin/ui";
import { KeepAliveRouteOutlet } from "keepalive-for-react";
import config from "../config";

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
const router = (isMirco: boolean) => {
  const formatPath = (path: string): string => {
    return `${isMirco ? config.MINI_PROGRAM.APP_ROUTER : ""}${path}`;
  };
  return [
    {
      path: "/",
      id: "layout",
      loader: () => ({ title: "英才考级" }),
      element: <KeepAliveRouteOutlet />,
      children: [
        {
          path: formatPath("/"),
          id: "home",
          loader: () => ({ title: "首页", desc: "应用首页" }),
          element: lazyComponent("Home"),
        },
        {
          path: formatPath("/about"),
          id: "about",
          loader: () => ({ title: "关于" }),
          element: lazyComponent("About"),
        },
        {
          path: formatPath("/system/application"),
          id: "application",
          loader: () => ({ title: "应用管理", desc: "管理整个中台应用程序" }),
          element: lazyComponent("Application"),
        },
        {
          path: formatPath("/system/fileGroup"),
          id: "fileGroup",
          loader: () => ({
            title: "文件管理",
            desc: "管理中台的所有上传文件以及图片",
          }),
          element: lazyComponent("FileGroup"),
        },
        {
          path: formatPath("/system/dict"),
          id: "dict",
          loader: () => ({
            title: "字典管理",
            desc: "管理中台的所有字典信息",
          }),
          element: lazyComponent("Dict"),
        },
        {
          path: formatPath("/system/user"),
          id: "user",
          loader: () => ({
            title: "用户管理",
            desc: "管理中台的所有用户信息",
          }),
          element: lazyComponent("User"),
        },
        {
          path: formatPath("/system/account"),
          id: "account",
          loader: () => ({
            title: "账号管理",
            desc: "管理中台的所有账号信息",
          }),
          element: lazyComponent("Account"),
        },
        {
          path: formatPath("/system/role"),
          id: "role",
          loader: () => ({
            title: "角色管理",
            desc: "管理中台的所有角色信息",
          }),
          element: lazyComponent("Role"),
        },
        {
          path: formatPath("/certificate/setting"),
          id: "draw",
          loader: () => ({ title: "图片模版设置" }),
          element: lazyComponent("Draw"),
        },
        {
          path: formatPath("/certificate/setting/:id"),
          id: "drawDetail",
          loader: () => ({ title: "图片模版设置详情" }),
          element: lazyComponent("DrawDetail"),
        },
        {
          path: "*",
          id: "nofund",
          loader: () => ({ title: "页面不存在" }),
          element: <JNoFound />,
        },
      ],
    },
  ];
};

export default router;
