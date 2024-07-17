import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Tooltip, Typography } from "antd";
import React, { useState } from "react";
const { Text } = Typography;

const JLayoutHeader: React.FC = () => {
  return (
    <Flex style={{ height: 64 }} justify={"flex-end"} align={"center"}>
      <Tooltip title="退出">
        <Flex style={{ height: 64 }} justify={"center"} align={"center"}>
          <Avatar icon={<UserOutlined />} />
          <Text style={{ marginLeft: 8 }}>Administrator</Text>
        </Flex>
      </Tooltip>
      <Tooltip title="退出" placement="bottom">
        <Button
          style={{ marginLeft: 8 }}
          type="text"
          icon={<LogoutOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};

export default JLayoutHeader;
