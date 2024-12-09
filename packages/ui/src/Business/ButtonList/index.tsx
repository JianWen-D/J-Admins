import { EllipsisOutlined } from "@ant-design/icons";
import { Divider, Dropdown, Space, Tooltip } from "antd";

interface JButtonListProps {
  options: React.ReactNode[];
}

const JButtonList = (props: JButtonListProps) => {
  const prevBtns = props.options.slice(0, 3);
  const extendBtns = props.options.slice(3);
  return (
    <Space split={<Divider type="vertical" />}>
      {prevBtns.map((item) => item)}
      {extendBtns.length > 0 && (
        <Dropdown
          menu={{
            items: extendBtns.map((item, index) => ({
              key: index,
              label: item,
            })),
          }}
          trigger={["click"]}
        >
          <Tooltip title="更多">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <EllipsisOutlined />
              </Space>
            </a>
          </Tooltip>
        </Dropdown>
      )}
    </Space>
  );
};

export default JButtonList;
