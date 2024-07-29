import { Button, Layout, Tooltip } from "antd";
import JMenu from "./menu";
import "./index.less";
import JApplication from "./Application";
import React, { useMemo, useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import JLayoutHeader from "./header";
import JHeaderBreadcrumb from "./breadcrumb";
import { useAuth } from "../../utils/hooks";
import { formatMenuListToTree, PermissionTypes } from "../../utils";
import { MenuProps } from "antd/lib";
import * as Icons from "@ant-design/icons";
const { Sider, Header, Content, Footer } = Layout;

export type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon: string | null,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  const Icon = (Icons as any)[`${icon}`];
  return (children || []).length !== 0
    ? ({
        key,
        icon: icon && <Icon />,
        children: children || null,
        label,
        type,
      } as MenuItem)
    : ({
        key,
        icon: icon && <Icon />,
        label,
        type,
      } as MenuItem);
};

interface JLayoutProps {
  logoSrc: string;
  children: React.ReactElement | null;
}

const JLayout = (props: JLayoutProps) => {
  const { appList, user, appInfo, changeActiveApp } = useAuth();
  const [appsVisable, setAppsVisable] = useState<boolean>(false);

  const formatMenuTreeData = (menuTreeList: PermissionTypes[]): MenuItem[] => {
    return menuTreeList.reduce((prev: MenuItem[], next: PermissionTypes) => {
      return [
        ...prev,
        getItem(
          next.name,
          next.value,
          next.icon || null,
          next.children.map((item) =>
            getItem(item.name, item.value, item.icon || null)
          )
        ),
      ];
    }, []);
  };

  const formatMenuList = useMemo(() => {
    return formatMenuTreeData(formatMenuListToTree(appInfo.permissionList));
  }, [appInfo]);

  return (
    <>
      <Layout hasSider>
        <Sider
          theme="light"
          width={256}
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="j-sider-header">
            <img className="j-sider-logo" src={props.logoSrc || ""}></img>
            <div className="j-sider-text">{appInfo.name || "-"}</div>
            <Tooltip title="切换应用">
              <Button
                type="text"
                icon={<AppstoreOutlined />}
                onClick={() => {
                  setAppsVisable(true);
                }}
              />
            </Tooltip>
          </div>
          <JMenu menu={formatMenuList} />
        </Sider>
        <Layout
          style={{
            marginLeft: 256,
            minHeight: "100vh",
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
          }}
        >
          <Header
            style={{
              padding: "0 24px",
              background: "#ffffff",
              borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
            }}
          >
            <JLayoutHeader username={user.name}></JLayoutHeader>
          </Header>
          <JHeaderBreadcrumb></JHeaderBreadcrumb>
          <Content style={{ margin: "0 16px", overflow: "initial" }}>
            {props.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            yingcaifuwu.top ©{new Date().getFullYear()} Created by Janvem
          </Footer>
        </Layout>
      </Layout>
      {/* 应用选择 */}
      {appsVisable && (
        <JApplication
          appId={appInfo.id}
          appList={appList}
          onChange={(id) => {
            changeActiveApp(id);
            setAppsVisable(false);
          }}
          onCancel={() => {
            setAppsVisable(false);
          }}
        ></JApplication>
      )}
    </>
  );
};

export default JLayout;
