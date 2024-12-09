import { useUpdateEffect } from "ahooks";
import { Menu } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { flattenTreeArray } from "../../utils";
import { RoleMenuProps } from "../../api/types/role";
import { useAuth } from "../../context/authContext";

interface JMenuProps {
  menu: any[];
}

const JMenu = (props: JMenuProps) => {
  const navigate = useNavigate();
  const Location = useLocation();
  const { menuList } = useAuth();
  const [SelectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [OpenKeys, setOpenKeys] = useState<string[]>([]);
  const onClick = (key: string) => {
    navigate(key);
    setSelectedKeys([key]);
  };

  useUpdateEffect(() => {
    const flattenData = flattenTreeArray<RoleMenuProps>(menuList);
    setOpenKeys([
      flattenData.find((item) => item.path === Location.pathname)
        ?.parentId as string,
    ]);
    setSelectedKeys([Location.pathname]);
  }, [props]);

  return (
    <Menu
      onClick={({ key }) => onClick(key)}
      style={{ width: 220, overflowX: "hidden" }}
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
