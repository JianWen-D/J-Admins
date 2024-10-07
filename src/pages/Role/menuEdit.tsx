import JCheck from "../../components/Business/JCheck";
import JEdit from "../../components/Business/JEdit";
import JPageCtrl from "../../components/Antd/PageCtrl";
import JTable from "../../components/Base/Table";
import { Button, message, Modal, Space, Tag } from "antd";
import { JFormItemProps } from "../../components/Base/Form/types";
import { useMount } from "ahooks";
import { useState } from "react";
import {
  getPermissionListByParentId,
  getPermissionWithAppNameList,
} from "../../api/types/permission";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  createRoleMenu,
  deletedRoleMenu,
  getRoleMenuById,
  getRoleMenuListById,
  RoleMenuProps,
  updateRoleMenu,
} from "../../api/types/role";
import { JColumnsOptions } from "../../components/Business/types";
import useColumn, { ColumnType } from "../../components/tools";

const { confirm } = Modal;

const MenuEdit = (props: {
  roleId: string;
  onSubmit: (id: React.Key) => void;
}) => {
  const [list, setList] = useState<RoleMenuProps[]>([]);
  const [permissionList, setPermissionList] = useState<any>([]);
  const [permissionChildList, setPermissionChildList] = useState<any>([]);
  const [applicationId, setApplicationId] = useState<string>("");

  useMount(() => {
    fetchGetPermissionWithAppNameList();
    fetchGetRoleMenuById();
  });

  const fetchGetPermissionWithAppNameList = async () => {
    const result = await getPermissionWithAppNameList();
    if (result.code === "0") {
      setPermissionList(result.data);
    }
  };

  const fetchGetPermissionListByParentId = async (parentId: string) => {
    if (!parentId) {
      return;
    }
    const result = await getPermissionListByParentId(parentId);
    if (result.code === "0") {
      setPermissionChildList(result.data);
    }
  };
  const fetchGetRoleMenuById = async () => {
    const result = await getRoleMenuListById(props.roleId);
    if (result.code === "0") {
      setList(result.data);
    }
  };

  const columns: JColumnsOptions<RoleMenuProps>[] = [
    {
      type: "icon",
      key: "icon",
      label: "菜单ICON",
      width: 120,
    },
    {
      type: "input",
      key: "name",
      label: "菜单名称",
      width: 200,
    },
    {
      type: "select",
      key: "permissionId",
      label: "指向页面",
      width: 120,
      options: permissionList || [],
      optionsProps: {
        label: "name",
        value: "id",
      },
      tableRender: (option: any) => (
        <Space>
          <Tag color="processing">{option.data.applicationName || "-"}</Tag>
          {option.label || "-"}
        </Space>
      ),
      onChange: (val) => {
        if (!val) {
          setApplicationId("");
          return;
        }
        fetchGetPermissionListByParentId(val as string);
        setApplicationId(
          permissionList.find((item: { id: string }) => item.id === val)
            .applicationId
        );
      },
    },
    {
      type: "select",
      key: "authList",
      label: "权限选择",
      width: 120,
      mode: "multiple",
      options: permissionChildList || [],
      optionsProps: {
        label: "name",
        value: "value",
      },
      color: {
        1: "blue",
        2: "red",
      },
    },
    {
      type: "number",
      key: "sortNum",
      label: "排序",
      width: 100,
    },
    {
      type: "input",
      key: "remark",
      label: "备注",
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
      width: 100,
    },
    {
      label: "操作",
      key: "operation",
      type: "input",
      width: 380,
      render: (_text, record) => {
        return (
          <>
            <JCheck
              options={columns}
              id={record.id}
              loadDataApi={getRoleMenuById}
            >
              <Button type="link" icon={<EyeOutlined />}>
                查看
              </Button>
            </JCheck>
            <JEdit
              options={columns}
              id={record.id}
              loadDataApi={getRoleMenuById}
              onBtnClick={() => {
                fetchGetPermissionListByParentId(record.permissionId);
              }}
              onSubmit={(data) => {
                handleUpdate({
                  ...data,
                  applicationId,
                  auths: data.authList?.join(",") || "",
                });
              }}
            >
              <Button type="link" icon={<EditOutlined />}>
                编辑
              </Button>
            </JEdit>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleted(record.id as string);
              }}
            >
              删除
            </Button>
            <JEdit
              title="新增子权限"
              options={columns}
              onSubmit={(data) => {
                handleCreate({
                  ...data,
                  parentId: record.id,
                  auths: data.authList?.join(",") || "",
                  roleId: props.roleId,
                  applicationId,
                });
              }}
            >
              <Button type="link" icon={<PlusOutlined />}>
                新增
              </Button>
            </JEdit>
          </>
        );
      },
    },
  ];

  const tableOperation = useColumn(columns, ColumnType.Table);

  const handleCreate = async (params: RoleMenuProps) => {
    const result = await createRoleMenu(params);
    if (result.code === "0") {
      message.success("创建成功");
      fetchGetRoleMenuById();
    } else {
      message.error(result.msg || "创建失败");
    }
  };

  const handleUpdate = async (params: RoleMenuProps) => {
    const result = await updateRoleMenu(params);
    if (result.code === "0") {
      message.success("更新成功");
      fetchGetRoleMenuById();
    } else {
      message.error(result.msg || "更新失败");
    }
  };

  const handleDeleted = async (id: string) => {
    confirm({
      title: "确定删除该条信息?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        return new Promise((resolve, reject) => {
          deletedRoleMenu(id).then((result) => {
            if (result.code === "0") {
              message.success("删除成功");
              fetchGetRoleMenuById();
              resolve(true);
            } else {
              message.error(result.msg || "删除失败");
              reject();
            }
          });
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };

  return (
    <>
      <JPageCtrl
        options={[]}
        additionButton={
          <>
            <JEdit
              title="新增"
              options={columns}
              onSubmit={(data) => {
                handleCreate({
                  ...data,
                  auths: data.authList?.join(",") || "",
                  roleId: props.roleId,
                  applicationId,
                });
              }}
            >
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            </JEdit>
          </>
        }
        onSubmit={() => {
          fetchGetRoleMenuById();
        }}
        onReload={() => {
          fetchGetRoleMenuById();
        }}
      ></JPageCtrl>
      <JTable
        data={list}
        columns={tableOperation}
        showPage={false}
        scrollY={480}
      ></JTable>
    </>
  );
};

export default MenuEdit;
