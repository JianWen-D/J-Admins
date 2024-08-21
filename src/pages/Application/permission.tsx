import { useState } from "react";
import JPageCtrl from "../../components/Antd/PageCtrl";
import { JFormItemProps } from "../../components/Antd/Form/types";
import { useMount } from "ahooks";
import JTable from "../../components/Antd/Table";
import { getDictList } from "../../api/types/dict";
import {
  getTreeListByApplicationId,
  PermissionProps,
} from "../../api/types/permission";

const PermissionEdit = (props: {
  applicationId: string;
  onSelect: (id: React.Key) => void;
}) => {
  //
  const [list, setList] = useState<PermissionProps[]>([]);
  const [dictList, setDictList] = useState<any>({
    PermissionType: "",
  });

  useMount(() => {
    fetchgetUserPage();
    fetchgetDictList();
  });

  const fetchgetDictList = async () => {
    const result = await getDictList(["PermissionType"]);
    if (result.code === "0") {
      setDictList(result.data);
    }
  };

  const fetchgetUserPage = async () => {
    const result = await getTreeListByApplicationId(props.applicationId);
    if (result.code === "0") {
      // setTotal(result.data.total);
      // setPageNum(result.data.pages);
      // setPageSize(result.data.size);
      setList(result.data);
    }
  };

  const columns: JFormItemProps[] = [
    {
      type: "image",
      key: "icon",
      label: "菜单ICON",
      edit: true,
      show: true,
      width: 100,
      maxCount: 1,
      columns: 1,
      labelCol: {
        span: 3,
      },
      groupId: "7cd169f80fa6da7d7b97a1320bc029eb",
    },
    {
      type: "input",
      key: "name",
      label: "菜单ICON",
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
      width: 200,
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
      type: "input",
      key: "sortNum",
      label: "排序",
      edit: true,
      show: true,
      width: 200,
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
      width: 200,
    },
  ];

  return (
    <>
      <JPageCtrl
        options={[
          {
            type: "input",
            key: "name",
            label: "用户名",
            edit: true,
          },
        ]}
        additionButton={<></>}
        onSubmit={(params) => {
          fetchgetUserPage();
        }}
        onReload={() => {
          fetchgetUserPage();
        }}
      ></JPageCtrl>
      <JTable
        data={list}
        columns={columns}
        showPage={false}
        rowSelection={{
          type: "radio",
          selectedRowKeys: [],
          onChange: (selectedRowKeys) => {
            props.onSelect(selectedRowKeys[0]);
          },
        }}
      ></JTable>
    </>
  );
};

export default PermissionEdit;
