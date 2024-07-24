import React from "react";
import Style from "./index.module.less";
import { Typography } from "antd";

const { Title, Text } = Typography;

interface JPageProps {
  title: string;
  desc: string;
  children: React.ReactElement;
}

const JPage = (props: JPageProps) => {
  return (
    <div className={Style.JPage}>
      <div className={Style.JPageTitle}>
        <Title level={3}>{props.title}</Title>
        <Text type="secondary">{props.desc}</Text>
      </div>
      <div className={Style.JPageContainer}>{props.children}</div>
    </div>
  );
};

export default JPage;
