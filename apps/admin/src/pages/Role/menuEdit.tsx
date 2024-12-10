import {
  JButtonList,
  JCheck,
  JEdit,
  JTable,
  JColumnsOptions,
  ColumnType,
  useColumn,
} from "@devin/ui";
import { Button, message, Modal } from "antd";
import { useMount } from "ahooks";
import { useCallback, useMemo, useState } from "react";
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

const { confirm } = Modal;

const MenuEdit = (props: { roleId: string }) => {
  const [list, setList] = useState<RoleMenuProps[]>([]);
  const [permissionList, setPermissionList] = useState<any>([]);
  const [permissionChildList, setPermissionChildList] = useState<any>([]);
  const [applicationId, setApplicationId] = useState<string>("");

  useMount(() => {
    fetchGetPermissionWithAppNameList();
    fetchGetRoleMenuById();
  });

  /**
   * 获取应用资源列表
   */
  const fetchGetPermissionWithAppNameList = async () => {
    const result = await getPermissionWithAppNameList();
    if (result.code === "0") {
      setPermissionList(result.data);
    }
  };

  /**
   * 根据选择的资源，获取资源权限列表
   */
  const fetchGetPermissionListByParentId = async (parentId: string) => {
    if (!parentId) {
      return;
    }
    const result = await getPermissionListByParentId(parentId);
    if (result.code === "0") {
      setPermissionChildList(result.data);
    }
  };

  /**
   * 获取该角色的菜单
   */
  const fetchGetRoleMenuById = useCallback(async () => {
    const result = await getRoleMenuListById(props.roleId);
    if (result.code === "0") {
      setList(result.data);
    }
  }, [props.roleId]);

  /**
   * 创建角色菜单
   */
  const handleCreate = useCallback(
    async (params: RoleMenuProps) => {
      const result = await createRoleMenu(params);
      if (result.code === "0") {
        message.success("创建成功");
        fetchGetRoleMenuById();
      } else {
        message.error(result.msg || "创建失败");
      }
    },
    [fetchGetRoleMenuById]
  );

  /**
   * 更新角色菜单
   */
  const handleUpdate = useCallback(
    async (params: RoleMenuProps) => {
      const result = await updateRoleMenu(params);
      if (result.code === "0") {
        message.success("更新成功");
        fetchGetRoleMenuById();
      } else {
        message.error(result.msg || "更新失败");
      }
    },
    [fetchGetRoleMenuById]
  );

  /**
   * 删除角色菜单
   */
  const handleDeleted = useCallback(
    async (id: string) => {
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
    },
    [fetchGetRoleMenuById]
  );

  const operationRender = useCallback(
    (columns: any, record: RoleMenuProps) => {
      return (
        <JButtonList
          options={[
            <JCheck
              options={columns}
              id={record.id}
              loadDataApi={getRoleMenuById}
            >
              <Button type="link" icon={<EyeOutlined />}>
                查看
              </Button>
            </JCheck>,
            <JEdit
              options={columns}
              id={record.id}
              loadDataApi={getRoleMenuById}
              onBtnClick={() => {
                fetchGetPermissionListByParentId(record.permissionId);
              }}
              title={`编辑-${record.name}`}
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
            </JEdit>,
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
                新增子权限
              </Button>
            </JEdit>,
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleted(record.id as string);
              }}
            >
              删除
            </Button>,
          ]}
        />
      );
    },
    [applicationId, handleCreate, handleDeleted, handleUpdate, props.roleId]
  );

  const columns = useMemo(() => {
    return [
      {
        type: "icon",
        key: "icon",
        label: "菜单ICON",
        width: 120,
        columnsNum: 12,
      },
      {
        type: "input",
        key: "name",
        label: "菜单名称",
        width: 200,
        columnsNum: 12,
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
        columnsNum: 12,
      },
      {
        type: "select",
        key: "authList",
        label: "权限",
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
        hideInTable: true,
        columnsNum: 12,
      },
      {
        type: "number",
        key: "sortNum",
        label: "排序",
        width: 100,
        columnsNum: 12,
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
        columnsNum: 12,
      },
      {
        type: "textarea",
        key: "remark",
        label: "备注",
        columnsNum: 24,
        labelCol: {
          span: 3,
        },
        wrapperCol: {
          span: 21,
        },
      },
      {
        label: "操作",
        key: "operation",
        type: "input",
        hideInSearch: true,
        hideInForm: true,
        hideInCheck: true,
        width: 360,
        render: (_text, record) => operationRender(columns, record),
      },
    ];
  }, [
    operationRender,
    permissionChildList,
    permissionList,
  ]) as JColumnsOptions<RoleMenuProps>[];

  const tableOperation = useColumn(columns, ColumnType.Table);

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <JEdit
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
      </div>
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
