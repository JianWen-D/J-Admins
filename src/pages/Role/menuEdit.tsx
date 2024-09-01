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
  getPermissionListByParentId,
  getPermissionWithAppNameList,
  getTreeListByApplicationId,
  PermissionProps,
  updatePermission,
} from "../../api/types/permission";
import JCheck from "../../components/Antd/Check";
import { Button, message, Modal, Space, Tag } from "antd";
import JEdit from "../../components/Antd/Edit";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useCommon } from "../../utils/hooks";
import {
  createRoleMenu,
  deletedRoleMenu,
  getRoleMenuById,
  getRoleMenuListById,
  RoleMenuProps,
  updateRoleMenu,
} from "../../api/types/role";

const { confirm } = Modal;

const MenuEdit = (props: {
  roleId: string;
  onSubmit: (id: React.Key) => void;
}) => {
  //
  const { dictList } = useCommon();
  const [list, setList] = useState<RoleMenuProps[]>([]);
  const [permissionList, setPermissionList] = useState<any>([]);
  const [permissionChildList, setPermissionChildList] = useState<any>([]);
  const [applicationId, setApplicationId] = useState<string>("");
  // const [dictList, setDictList] = useState<any>({
  //   PermissionType: "",
  // });

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
    const result = await getPermissionListByParentId(parentId);
    if (result.code === "0") {
      setPermissionChildList(result.data);
    }
  };
  const fetchGetRoleMenuById = async () => {
    const result = await getRoleMenuListById(props.roleId);
    if (result.code === "0") {
      setList(result.data);
      // setPermissionChildList(result.data);
    }
  };

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
      key: "permissionId",
      label: "指向页面",
      edit: true,
      show: true,
      width: 120,
      options: permissionList || [],
      optionsProps: {
        label: "name",
        value: "id",
      },
      optionRender: (option: any) => (
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
      key: "permissionIds",
      label: "权限选择",
      edit: true,
      show: true,
      width: 120,
      mode: "multiple",
      options: permissionChildList || [],
      optionsProps: {
        label: "name",
        value: "id",
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
              titleKey="name"
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
                loadDataApi={getRoleMenuById}
              >
                <Button type="link" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>
              <JEdit
                titleKey="name"
                options={columns}
                id={record.id}
                loadDataApi={getRoleMenuById}
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
                  handleDeleted(record.id);
                }}
              >
                删除
              </Button>
              <JEdit
                title="新增自权限"
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
        }}
      ></JTable>
    </>
  );
};

export default MenuEdit;
