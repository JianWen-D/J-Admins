import { Avatar, Badge, Button, Card, Col, Row, Typography } from "antd";
import "./index.less";
import { useState } from "react";

const { Meta } = Card;
const { Title } = Typography;

interface JApplicationProps {
  appId: string;
  appList: AppItemProps[];
  onChange: (appId: string) => void;
  onCancel: () => void;
}

interface AppItemProps {
  id: string;
  name: string;
  remark: string;
  icon: string;
  link: string;
}

const JApplication = (props: JApplicationProps) => {
  const [activeAppId, setActiveAppId] = useState<string>(props.appId);

  return (
    <div className="j-app">
      <div className="j-app-title">
        <Title level={3}>应用中心</Title>
      </div>
      <div className="j-app-list">
        <Row gutter={24}>
          {props.appList.map((item) => {
            if (item.id === activeAppId) {
              return (
                <Col span={6} key={item.id}>
                  <Badge.Ribbon text="当前选择" color="volcano">
                    <Card hoverable className="j-app-card">
                      <Meta
                        avatar={<Avatar src={item.icon} />}
                        title={item.name}
                        description={item.remark}
                      />
                    </Card>
                  </Badge.Ribbon>
                </Col>
              );
            }
            return (
              <Col span={6} key={item.id}>
                <Card
                  className="j-app-card"
                  hoverable
                  onClick={() => {
                    setActiveAppId(item.id);
                  }}
                >
                  <Meta
                    avatar={<Avatar src={item.icon} />}
                    title={item.name}
                    description={item.remark}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="j-app-ctrl">
        <Button
          style={{ width: 160 }}
          type="primary"
          onClick={() => {
            props.onChange(activeAppId);
          }}
        >
          确定切换
        </Button>
        <Button
          style={{ width: 160, marginLeft: 48 }}
          onClick={() => {
            props.onCancel();
          }}
        >
          返回
        </Button>
      </div>
    </div>
  );
};

export default JApplication;
