import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Tooltip, Typography } from "antd";
import { MenuProps } from "antd/lib";
import request from "../../api";
import { useAuth } from "../../utils/hooks";
const { Text } = Typography;

interface JLayoutHeaderProps {
  username: string;
  avatar: string;
}

const JLayoutHeader = (props: JLayoutHeaderProps) => {
  const { logout } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Flex justify={"center"} align={"center"}>
          <UserOutlined />
          <Text style={{ marginLeft: 8 }}>个人中心</Text>
        </Flex>
      ),
    },
    {
      key: "2",
      label: (
        <Flex justify={"center"} align={"center"}>
          <EditOutlined />
          <Text style={{ marginLeft: 8 }}>修改密码</Text>
        </Flex>
      ),
    },
  ];

  const handleLogout = () => {
    request.clearToken();
    logout();
  };

  return (
    <Flex style={{ height: 64 }} justify={"flex-end"} align={"center"}>
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <Flex style={{ height: 64 }} justify={"center"} align={"center"}>
          <Avatar src={props.avatar} icon={<UserOutlined />} />
          <Text style={{ marginLeft: 8 }}>{props.username || ""}</Text>
        </Flex>
      </Dropdown>
      <Tooltip title="退出" placement="bottom">
        <Button
          style={{ marginLeft: 8 }}
          type="text"
          icon={<LogoutOutlined />}
          onClick={() => {
            handleLogout();
          }}
        ></Button>
      </Tooltip>
    </Flex>
  );
};

export default JLayoutHeader;
