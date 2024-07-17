import { Button, Layout, Tooltip } from "antd";
import JMenu from "./menu";
import "./index.less";
import JApplication from "./Application";
import { useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import JLayoutHeader from "./header";
import JHeaderBreadcrumb from "./breadcrumb";
const { Sider, Header, Content, Footer } = Layout;

interface JLayoutProps {
  logoSrc: string;
}

const JLayout = (props: JLayoutProps) => {
  const [appId, setAppId] = useState<string>("1");
  const [appsVisable, setAppsVisable] = useState<boolean>(false);
  const appList = [
    {
      id: "1",
      name: "管理中心",
      desc: "管理中心",
      logo: "https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png",
      link: "/",
    },
    {
      id: "2",
      name: "管理中心2",
      desc: "管理中心2",
      logo: "https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png",
      link: "/",
    },
    {
      id: "3",
      name: "管理中心3",
      desc: "管理中心3",
      logo: "https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png",
      link: "/",
    },
    {
      id: "4",
      name: "管理中心4",
      desc: "管理中心4",
      logo: "https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png",
      link: "/",
    },
    {
      id: "5",
      name: "管理中心5",
      desc: "管理中心5",
      logo: "https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png",
      link: "/",
    },
  ];
  return (
    <>
      <Layout hasSider>
        <Sider
          theme="light"
          width={256}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="j-sider-header">
            <img className="j-sider-logo" src={props.logoSrc || ""}></img>
            <div className="j-sider-text">管理中心</div>
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
          <JMenu />
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
            <JLayoutHeader></JLayoutHeader>
          </Header>
          <JHeaderBreadcrumb></JHeaderBreadcrumb>
          <Content style={{ margin: "0 16px", overflow: "initial" }}></Content>
          <Footer style={{ textAlign: "center" }}>
            Ying cai ©{new Date().getFullYear()} Created by Janvem
          </Footer>
        </Layout>
      </Layout>
      {appsVisable && (
        <JApplication
          appId={appId}
          appList={appList}
          onChange={(id) => {
            setAppId(id);
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
