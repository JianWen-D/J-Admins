import React, { lazy } from "react";
import { KeepAliveRouteOutlet } from "keepalive-for-react";
import { JNoFound } from "@devin/ui";
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
      loader: () => ({ title: "c" }),
      element: <KeepAliveRouteOutlet />,
      children: [
        {
          path: formatPath("/archives/province"),
          id: "archivesProvince",
          loader: () => ({ title: "省级档案" }),
          element: lazyComponent("Province"),
        },
        {
          path: "*",
          id: "nofund",
          loader: () => ({ title: "页面不存在" }),
          element: <JNoFound hiden />,
        },
      ],
    },
  ];
};

export default router;
