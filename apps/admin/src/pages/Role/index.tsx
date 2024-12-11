import {
  JCheck,
  JDelete,
  JEdit,
  JPage,
  JSearchTable,
  JColumnsOptions,
  JButtonList,
} from "@devin/ui";
import MenuEdit from "./menuEdit";
import { Button, Modal } from "antd";
import { useLoaderData } from "react-router";
import { useMemo, useState } from "react";
import { useMount } from "ahooks";
import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  RoleProps,
  createRole,
  deletedRole,
  getRoleById,
  getRolePage,
  updateRole,
} from "../../api/types/role";
import {
  ApplicationProps,
  getApplicationList,
} from "../../api/types/application";
import UserEdit from "./userEdit";

const RolePage = () => {
  const LoaderData: any = useLoaderData();
  const [appList, setAppList] = useState<ApplicationProps[]>([]);
  const [permissionCheckVisible, setPermissionCheckVisible] =
    useState<boolean>(false);
  const [userCheckVisible, setUserCheckVisible] = useState<boolean>(false);
  const [roleId, setRoleId] = useState<string>("");

  useMount(() => {
    fetchGetApplicationList();
  });

  const fetchGetApplicationList = async () => {
    const result = await getApplicationList({});
    if (result.code === "0") {
      setAppList(result.data);
    }
  };

  const columns: JColumnsOptions<RoleProps>[] = useMemo(() => {
    return [
      {
        type: "input",
        key: "name",
        label: "角色名",
      },
      {
        type: "select",
        key: "applicationId",
        label: "所属应用",
        options: appList || [],
        optionsProps: {
          label: "name",
          value: "id",
        },
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
        hideInSearch: true,
      },
      {
        type: "textarea",
        key: "remark",
        label: "备注",
        width: 240,
        labelCol: {
          span: 2,
        },
        wrapperCol: {
          span: 22,
        },
        columnsNum: 24,
        hideInSearch: true,
      },
      {
        type: "date",
        key: "createdTime",
        label: "创建日期",
        width: 160,
        hideInSearch: true,
        hideInForm: true,
      },
      {
        type: "date",
        key: "updatedTime",
        label: "更新时间",
        width: 160,
        hideInSearch: true,
        hideInForm: true,
      },
      {
        type: "input",
        key: "options",
        label: "操作",
        width: 320,
        hideInSearch: true,
        hideInForm: true,
        hideInCheck: true,
        fixed: "right",
        tableRender: (record, refresh) => {
          return (
            <JButtonList
              options={[
                <JCheck
                  options={columns}
                  id={record.id}
                  loadDataApi={getRoleById}
                >
                  <Button type="link" size="small" icon={<EyeOutlined />}>
                    查看
                  </Button>
                </JCheck>,
                <Button
                  type="link"
                  size="small"
                  icon={<AppstoreOutlined />}
                  onClick={() => {
                    setPermissionCheckVisible(true);
                    setRoleId(record.id as string);
                  }}
                >
                  菜单管理
                </Button>,
                <Button
                  type="link"
                  size="small"
                  icon={<UserOutlined />}
                  onClick={() => {
                    setUserCheckVisible(true);
                    setRoleId(record.id as string);
                  }}
                >
                  用户管理
                </Button>,
                <JEdit
                  options={columns}
                  id={record.id}
                  loadDataApi={getRoleById}
                  onSubmit={() => {
                    refresh();
                  }}
                  saveRequest={updateRole}
                >
                  <Button type="link" size="small" icon={<EditOutlined />}>
                    编辑
                  </Button>
                </JEdit>,
                <JDelete
                  id={record.id as string}
                  request={deletedRole}
                  onSuccess={() => {
                    refresh();
                  }}
                >
                  <Button type="link" size="small" icon={<DeleteOutlined />}>
                    删除
                  </Button>
                </JDelete>,
              ]}
            ></JButtonList>
          );
        },
      },
    ];
  }, [appList]);

  return (
    <>
      <JPage title={LoaderData?.title || "-"} desc={LoaderData?.desc || "-"}>
        <JSearchTable<RoleProps>
          options={columns}
          request={getRolePage}
          searchOperation={(_form, refresh) => {
            return (
              <JEdit
                options={columns}
                onSubmit={() => {
                  refresh();
                }}
                saveRequest={createRole}
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  新增
                </Button>
              </JEdit>
            );
          }}
        ></JSearchTable>
      </JPage>
      <Modal
        title="菜单配置"
        width={1400}
        maskClosable={false}
        open={permissionCheckVisible}
        destroyOnClose
        styles={{
          body: {
            padding: "24px 0",
          },
        }}
        onCancel={() => {
          setPermissionCheckVisible(false);
          setRoleId("");
        }}
        okText="提交"
      >
        <MenuEdit roleId={roleId}></MenuEdit>
      </Modal>
      <Modal
        title="用户管理"
        width={1400}
        maskClosable={false}
        open={userCheckVisible}
        destroyOnClose
        styles={{
          body: {
            padding: "24px 0",
          },
        }}
        onCancel={() => {
          setUserCheckVisible(false);
          setRoleId("");
        }}
        okText="提交"
        // footer={null}
      >
        <UserEdit
          roleId={roleId}
          onClose={() => {
            setUserCheckVisible(false);
            setRoleId("");
          }}
        ></UserEdit>
      </Modal>
    </>
  );
};

export default RolePage;
