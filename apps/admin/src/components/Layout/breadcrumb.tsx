import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";

const JHeaderBreadcrumb = () => {
  return (
    <div
      style={{
        lineHeight: 32,
        marginBottom: 16,
        background: "#fff",
      }}
    >
      <Tabs
        tabBarStyle={{
          marginBottom: 0,
          padding: "0 12px",
        }}
        items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: `Tab ${id}`,
            children: null,
            icon: <Icon />,
          };
        })}
      />
    </div>
  );
};

export default JHeaderBreadcrumb;
