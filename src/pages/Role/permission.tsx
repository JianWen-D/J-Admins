import { Key, useState } from "react";
import { JFormItemProps } from "../../components/Antd/Form/types";
import { useMount } from "ahooks";
import JTable from "../../components/Antd/Table";
import {
  getPermissionListByRoleIdAndAppId,
  getPermissionWithAppNameList,
  getTreeListByApplicationId,
  PermissionProps,
} from "../../api/types/permission";
import { Button, message, Modal, Tabs, TabsProps } from "antd";
import { getApplicationList } from "../../api/types/application";
import { useCommon } from "../../utils/hooks";

const PermissionCheck = (props: {
  onSelect: (id: React.Key) => void;
  roleId: string;
}) => {
  const { dictList } = useCommon();
  //
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [list, setList] = useState<PermissionProps[]>([]);
  const [appList, setAppList] = useState<TabsProps["items"]>([]);

  useMount(() => {
    fetchGetApplicationList();
  });

  const fetchGetApplicationList = async () => {
    const result = await getApplicationList({});
    if (result.code === "0") {
      setAppList(
        result.data.map((item) => ({
          id: item.id as string,
          key: item.id as string,
          label: item.name,
        }))
      );
      if (result.data.length > 0) {
        fetchGetPermissionListByRoleIdAndAppId(result.data[0].id as string);
      }
    }
  };
  const fetchGetPermissionListByRoleIdAndAppId = async (
    applicationId: string
  ) => {
    const result = await getPermissionListByRoleIdAndAppId({
      roleId: props.roleId,
      applicationId,
    });
    if (result.code === "0") {
      setSelectKeys(result.data);
    }
  };

  const handleChangeTabs = async (activeKey: string) => {
    fetchGetPermission(activeKey);
    fetchGetPermissionListByRoleIdAndAppId(activeKey);
  };

  const fetchGetPermission = async (applicationId: string) => {
    const result = await getTreeListByApplicationId(applicationId);
    if (result.code === "0") {
      setList(result.data);
    }
  };

  const columns: JFormItemProps[] = [
    {
      type: "input",
      key: "name",
      label: "权限名称",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "value",
      label: "权限KEY",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "select",
      key: "type",
      label: "权限类型",
      edit: true,
      show: true,
      width: 120,
      options: (dictList.PermissionType || []).map((item: any) => ({
        ...item,
        dictCode: Number(item.dictCode),
      })),
      optionsProps: {
        label: "dictName",
        value: "dictCode",
      },
      color: {
        1: "blue",
        2: "red",
      },
    },
    {
      type: "icon",
      key: "icon",
      label: "菜单ICON",
      edit: true,
      show: true,
      width: 120,
    },
    {
      type: "input",
      key: "sortNum",
      label: "排序",
      edit: true,
      show: true,
      width: 100,
    },
    {
      type: "input",
      key: "remark",
      label: "备注",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "radio",
      key: "status",
      label: "状态",
      options: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "禁用",
          value: 0,
        },
      ],
      color: {
        1: "green",
        0: "red",
      },
      optionsProps: {
        label: "label",
        value: "value",
      },
      edit: true,
      show: true,
      width: 100,
    },
  ];

  return (
    <>
      <Tabs items={appList} onChange={handleChangeTabs} />
      <JTable
        data={list}
        columns={columns}
        showPage={false}
        scrollY={480}
        rowSelection={{
          selectedRowKeys: selectKeys,
          onChange: (selectedRowKeys) => {
            setSelectKeys(selectedRowKeys);
            // props.onSelect(selectedRowKeys[0]);
          },
        }}
      ></JTable>
    </>
  );
};

export default PermissionCheck;
