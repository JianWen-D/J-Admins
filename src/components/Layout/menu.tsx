import { useMount } from "ahooks";
import { Menu } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

interface JMenuProps {
  menu: any[];
}

const JMenu = (props: JMenuProps) => {
  const navigate = useNavigate();
  const Location = useLocation();
  const [SelectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [OpenKeys, setOpenKeys] = useState<string[]>([]);
  const onClick = (key: string, keyPath: string[]) => {
    navigate(keyPath.reverse().join(""));
    setSelectedKeys([key]);
  };

  useMount(() => {
    const path = Location.pathname
      .split("/")
      .filter((item) => item)
      .map((item) => `/${item}`);
    setOpenKeys([path[0]]);
    setSelectedKeys([path[1]]);
  });

  return (
    <Menu
      onClick={({ key, keyPath }) => onClick(key, keyPath)}
      style={{ width: 256, overflowX: "hidden" }}
      selectedKeys={SelectedKeys}
      openKeys={OpenKeys}
      onOpenChange={(open) => {
        setOpenKeys(open);
      }}
      mode="inline"
      items={props.menu}
    />
  );
};

export default JMenu;
