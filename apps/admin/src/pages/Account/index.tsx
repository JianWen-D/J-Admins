import { useState } from "react";
import { useLoaderData } from "react-router";
import {
  JSearchTable,
  JColumnsOptions,
  JCheck,
  JEdit,
  useColumn,
  ColumnType,
  JDelete,
  JButtonList,
  JPage,
} from "@devin/ui";
import { Button, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  AccountProps,
  changePassword,
  createAccount,
  deletedAccount,
  getAccountById,
  getAccountPage,
  updateAccount,
} from "../../api/types/account";
import { getPasswordKey } from "../../api/types/auth";
import JSEncrypt from "jsencrypt";
import ChangeUser from "./changeUser";

const AccountPage = () => {
  const LoaderData: any = useLoaderData();
  const [changUserVisible, setChangUserVisible] = useState<boolean>(false);
  const [selectUserId, setSelectUserId] = useState<any>("");
  const [selectAccount, setSelectAccount] = useState<any>();

  const passwodColumns: JColumnsOptions<{
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }>[] = [
    {
      type: "input",
      key: "oldPassword",
      label: "旧密码",
      width: 200,
      rules: [
        {
          required: true,
          message: "请输入旧密码",
        },
      ],
      columnsNum: 12,
    },
    {
      type: "input",
      key: "password",
      label: "新密码",
      width: 200,
      rules: [
        {
          required: true,
          message: "请输入新密码",
        },
      ],
      columnsNum: 12,
    },
    {
      type: "input",
      key: "confirmPassword",
      label: "确认密码",
      width: 200,
      rules: [
        {
          required: true,
          message: "请输入确认密码",
        },
      ],
      columnsNum: 12,
    },
  ];

  const columns: JColumnsOptions<AccountProps>[] = [
    {
      type: "input",
      key: "username",
      label: "用户",
      width: 200,
    },
    {
      type: "input",
      key: "phone",
      label: "手机号",
      width: 200,
      rules: [
        {
          required: true,
          message: "请输入手机号",
        },
      ],
    },
    {
      type: "input",
      key: "email",
      label: "邮箱",
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
      width: 200,
    },
    {
      type: "textarea",
      key: "remark",
      label: "备注",
      width: 200,
      columnsNum: 24,
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 22,
      },
    },
    {
      type: "input",
      key: "lastLoginTime",
      label: "最近登录时间",
      hideInForm: true,
      hideInSearch: true,
      width: 300,
    },
    {
      type: "input",
      key: "registerTime",
      label: "注册时间",
      hideInForm: true,
      hideInSearch: true,
      width: 300,
    },
    {
      type: "input",
      key: "lastChangePasswordTime",
      label: "最近修改密码时间",
      hideInForm: true,
      hideInSearch: true,
      width: 300,
    },
    {
      type: "date",
      key: "createdTime",
      label: "创建日期",
      hideInForm: true,
      hideInSearch: true,
      width: 300,
    },
    {
      type: "date",
      key: "updatedTime",
      label: "更新时间",
      hideInForm: true,
      hideInSearch: true,
      width: 300,
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
                title="查看"
                options={columns}
                id={record.id}
                loadDataApi={getAccountById}
              >
                <Button type="link" size="small" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>,
              <JEdit
                title="编辑"
                options={columns}
                id={record.id}
                loadDataApi={getAccountById}
                onSubmit={() => {
                  refresh();
                }}
                saveRequest={updateAccount}
              >
                <Button type="link" size="small" icon={<EditOutlined />}>
                  编辑
                </Button>
              </JEdit>,
              <JDelete
                id={record.id as string}
                request={deletedAccount}
                onSuccess={() => {
                  refresh();
                }}
              >
                <Button type="link" size="small" icon={<DeleteOutlined />}>
                  删除
                </Button>
              </JDelete>,
              <JEdit
                title="修改密码"
                options={passwodColumns}
                onSubmit={(data) => {
                  handleChangePassword(record.id as string, data);
                }}
              >
                <Button type="link" size="small" icon={<LockOutlined />}>
                  修改密码
                </Button>
              </JEdit>,
              <Button
                type="link"
                size="small"
                icon={<UserOutlined />}
                onClick={() => {
                  setChangUserVisible(true);
                  setSelectUserId(record.userId);
                  setSelectAccount(record);
                }}
              >
                更换用户
              </Button>,
            ]}
          ></JButtonList>
        );
      },
    },
  ];

  const fetchGetPasswordKey = async (callback: (crypt: any) => void) => {
    const result = await getPasswordKey();
    if (result.code === "0") {
      const crypt = new JSEncrypt();
      crypt.setKey(result.data);
      callback(crypt);
    }
  };

  const handleChangePassword = (
    id: string,
    data: {
      oldPassword: string;
      password: string;
      confirmPassword: string;
    }
  ) => {
    fetchGetPasswordKey(async (crypt) => {
      const params = {
        oldPassword: crypt.encrypt(data.oldPassword),
        password: crypt.encrypt(data.password),
        confirmPassword: crypt.encrypt(data.confirmPassword),
      };
      const result = await changePassword(id, params);
      if (result.code === "0") {
        message.success("修改成功");
      } else {
        message.error(result.msg || "修改失败");
      }
    });
  };

  const handleUpdate = async (params: AccountProps) => {
    const result = await updateAccount(params);
    if (result.code === "0") {
      message.success("更新成功");
    } else {
      message.error(result.msg || "更新失败");
    }
  };

  const editFormOptions = useColumn(columns, ColumnType.Form);

  return (
    <>
      <JPage title={LoaderData?.title || "-"} desc={LoaderData?.desc || "-"}>
        <JSearchTable<AccountProps>
          options={columns}
          request={getAccountPage}
          searchOperation={(_form, refresh) => {
            return (
              <JEdit
                title="新增"
                options={editFormOptions}
                onSubmit={() => {
                  refresh();
                }}
                saveRequest={createAccount}
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
        title="更换用户"
        width={1200}
        open={changUserVisible}
        destroyOnClose
        styles={{
          body: {
            padding: "24px 0",
          },
        }}
        okText="确定更换"
        onCancel={() => {
          setChangUserVisible(false);
          setSelectUserId("");
        }}
        onOk={() => {
          handleUpdate({
            ...selectAccount,
            userId: `${selectUserId}`,
          });
        }}
      >
        <ChangeUser
          selectId={selectUserId}
          onSelect={(id) => {
            setSelectUserId(id);
          }}
        ></ChangeUser>
      </Modal>
    </>
  );
};

export default AccountPage;
