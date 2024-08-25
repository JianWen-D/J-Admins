import { useState } from "react";
import JPageCtrl from "../../components/Antd/PageCtrl";
import { JFormItemProps } from "../../components/Antd/Form/types";
import { useMount } from "ahooks";
import JTable from "../../components/Antd/Table";
import { getDictList } from "../../api/types/dict";
import {
  createPermission,
  deletedPermission,
  getPermissionById,
  getTreeListByApplicationId,
  PermissionProps,
  updatePermission,
} from "../../api/types/permission";
import JCheck from "../../components/Antd/Check";
import { Button, message, Modal } from "antd";
import JEdit from "../../components/Antd/Edit";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useCommon } from "../../utils/hooks";

const { confirm } = Modal;

const MenuEdit = (props: { onSubmit: (id: React.Key) => void }) => {
  //
  const { dictList } = useCommon();
  const [list, setList] = useState<PermissionProps[]>([]);
  // const [dictList, setDictList] = useState<any>({
  //   PermissionType: "",
  // });

  useMount(() => {});

  const columns: JFormItemProps[] = [
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
      key: "name",
      label: "菜单名称",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "select",
      key: "type",
      label: "指向页面",
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
      type: "select",
      key: "type",
      label: "权限选择",
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
      <JPageCtrl
        options={[]}
        additionButton={
          <>
            <JEdit
              titleKey="name"
              options={columns}
              onSubmit={(data) => {
                // handleCreate(data);
              }}
            >
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            </JEdit>
          </>
        }
        onSubmit={() => {
          // fetchGetPermission();
        }}
        onReload={() => {
          // fetchGetPermission();
        }}
      ></JPageCtrl>
      <JTable
        data={list}
        columns={columns}
        showPage={false}
        scrollY={480}
        operationWidth={380}
        operation={(text, record) => {
          return (
            <>
              <JCheck
                titleKey="name"
                options={columns}
                id={record.id}
                loadDataApi={getPermissionById}
              >
                <Button type="link" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>
              <JEdit
                titleKey="name"
                options={columns}
                id={record.id}
                loadDataApi={getPermissionById}
                onSubmit={(data) => {}}
              >
                <Button type="link" icon={<EditOutlined />}>
                  编辑
                </Button>
              </JEdit>
              <Button type="link" icon={<DeleteOutlined />} onClick={() => {}}>
                删除
              </Button>
              <JEdit
                title="新增自权限"
                options={columns}
                onSubmit={(data) => {}}
              >
                <Button type="link" icon={<PlusOutlined />}>
                  新增
                </Button>
              </JEdit>
            </>
          );
        }}
      ></JTable>
    </>
  );
};

export default MenuEdit;
