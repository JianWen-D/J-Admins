import JCheck from "../../components/Business/JCheck";
import JDelete from "../../components/Business/JDelete";
import JEdit from "../../components/Business/JEdit";
import JPage from "../../components/Antd/JPage";
import JSearchTable from "../../components/Business/JSearchTable";
import MenuEdit from "./menuEdit";
import { Button, Divider, Modal, Space } from "antd";
import { JColumnsOptions } from "../../components/Business/types";
import { useLoaderData } from "react-router";
import { useMemo, useState } from "react";
import { useMount } from "ahooks";
import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
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

const RolePage = () => {
  const LoaderData: any = useLoaderData();
  const [appList, setAppList] = useState<ApplicationProps[]>([]);
  const [permissionCheckVisible, setPermissionCheckVisible] =
    useState<boolean>(false);
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
        width: 200,
      },
      {
        type: "select",
        key: "applicationId",
        label: "所属应用",
        width: 200,
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
        width: 200,
        hideInSearch: true,
      },
      {
        type: "textarea",
        key: "remark",
        label: "备注",
        width: 200,
        labelCol: {
          span: 3,
        },
        wrapperCol: {
          span: 21,
        },
        columnsNum: 24,
        hideInSearch: true,
      },
      {
        type: "date",
        key: "createdTime",
        label: "创建日期",
        width: 200,
        hideInSearch: true,
        hideInForm: true,
      },
      {
        type: "date",
        key: "updatedTime",
        label: "更新时间",
        width: 200,
        hideInSearch: true,
        hideInForm: true,
      },
      {
        type: "input",
        key: "options",
        label: "操作",
        width: 440,
        hideInSearch: true,
        hideInForm: true,
        hideInCheck: true,
        fixed: "right",
        tableRender: (record, refresh) => {
          return (
            <Space split={<Divider type="vertical" />}>
              <JCheck
                options={columns}
                id={record.id}
                loadDataApi={getRoleById}
              >
                <Button type="link" size="small" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>
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
              </JEdit>
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
              </JDelete>
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
              </Button>
            </Space>
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
        <MenuEdit
          roleId={roleId}
          onSubmit={() => {
            // setSelectUserId(id);
          }}
        ></MenuEdit>
      </Modal>
    </>
  );
};

export default RolePage;
