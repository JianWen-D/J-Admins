import { useState } from "react";
import { useLoaderData } from "react-router";
import JPage from "../../components/Antd/Page";
import JPageCtrl from "../../components/Antd/PageCtrl";
import { Button, Dropdown, message, Modal, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  LockOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import JTable from "../../components/Antd/Table";
import { JFormItemProps } from "../../components/Antd/Form/types";
import JCheck from "../../components/Antd/Check";
import JEdit from "../../components/Antd/Edit";
import {
  AccountProps,
  changePassword,
  createAccount,
  deletedAccount,
  getAccountById,
  getAccountPage,
  updateAccount,
} from "../../api/types/account";
import { useMount } from "ahooks";
import { getPasswordKey } from "../../api/types/auth";
import JSEncrypt from "jsencrypt";
import ChangeUser from "./changeUser";

const { confirm } = Modal;

const AccountPage = () => {
  const LoaderData: any = useLoaderData();
  // 基础变量
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  //
  const [list, setList] = useState<AccountProps[]>([]);
  const [changUserVisible, setChangUserVisible] = useState<boolean>(false);
  const [selectUserId, setSelectUserId] = useState<any>("");
  const [selectAccount, setSelectAccount] = useState<any>();

  useMount(() => {
    fetchgetAccountPage(1, 10);
  });

  const fetchgetAccountPage = async (
    pageNum?: number,
    pageSize?: number,
    searchParams?: any
  ) => {
    const params = {
      pageNum: pageNum || 1,
      pageSize: pageSize || 10,
      ...searchParams,
    };
    const result = await getAccountPage(params);
    if (result.code === "0") {
      setTotal(result.data.total);
      setPageNum(result.data.pages);
      setPageSize(result.data.size);
      setList(result.data.records);
    }
  };

  const columns: JFormItemProps[] = [
    {
      type: "input",
      key: "username",
      label: "用户",
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "phone",
      label: "手机号",
      edit: true,
      show: true,
      width: 200,
      rules: [
        {
          required: true,
          target: "blur",
          message: "请输入手机号",
        },
      ],
    },
    {
      type: "input",
      key: "email",
      label: "邮箱",
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
    {
      type: "textarea",
      key: "remark",
      label: "备注",
      edit: true,
      show: true,
      width: 200,
      columns: 1,
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 21,
      },
    },
    {
      type: "input",
      key: "lastLoginTime",
      label: "最近登录时间",
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "registerTime",
      label: "注册时间",
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "lastChangePasswordTime",
      label: "最近修改密码时间",
      show: true,
      width: 200,
    },
    {
      type: "date",
      key: "createdTime",
      label: "创建日期",
      show: true,
      width: 200,
    },
    {
      type: "date",
      key: "updatedTime",
      label: "更新时间",
      show: true,
      width: 200,
    },
  ];
  const createdColumns: JFormItemProps[] = [
    {
      type: "input",
      key: "phone",
      label: "手机号",
      edit: true,
      show: true,
      width: 200,
      rules: [
        {
          required: true,
          target: "blur",
          message: "请输入手机号",
        },
      ],
    },
    {
      type: "input",
      key: "email",
      label: "邮箱",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "oldPassword",
      label: "旧密码",
      edit: true,
      show: true,
      width: 200,
      rules: [
        {
          required: true,
          target: "blur",
          message: "请输入旧密码",
        },
      ],
    },
    {
      type: "input",
      key: "password",
      label: "新密码",
      edit: true,
      show: true,
      width: 200,
      rules: [
        {
          required: true,
          target: "blur",
          message: "请输入新密码",
        },
      ],
    },
    {
      type: "input",
      key: "confirmPassword",
      label: "确认密码",
      edit: true,
      show: true,
      width: 200,
      rules: [
        {
          required: true,
          target: "blur",
          message: "请输入确认密码",
        },
      ],
    },
    {
      type: "textarea",
      key: "remark",
      label: "备注",
      edit: true,
      show: true,
      width: 200,
      columns: 1,
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 21,
      },
    },
  ];
  const passwodColumns: JFormItemProps[] = [
    {
      type: "input",
      key: "oldPassword",
      label: "旧密码",
      edit: true,
      show: true,
      width: 200,
      rules: [
        {
          required: true,
          target: "blur",
          message: "请输入旧密码",
        },
      ],
    },
    {
      type: "input",
      key: "password",
      label: "新密码",
      edit: true,
      show: true,
      width: 200,
      rules: [
        {
          required: true,
          target: "blur",
          message: "请输入新密码",
        },
      ],
    },
    {
      type: "input",
      key: "confirmPassword",
      label: "确认密码",
      edit: true,
      show: true,
      width: 200,
      rules: [
        {
          required: true,
          target: "blur",
          message: "请输入确认密码",
        },
      ],
    },
  ];

  const handleCreate = async (params: AccountProps) => {
    const result = await createAccount(params);
    if (result.code === "0") {
      message.success("创建成功");
      fetchgetAccountPage(pageNum, 10);
    } else {
      message.error(result.msg || "创建失败");
    }
  };

  const handleUpdate = async (params: AccountProps) => {
    const result = await updateAccount(params);
    if (result.code === "0") {
      message.success("更新成功");
      fetchgetAccountPage(pageNum, 10);
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
          deletedAccount(id).then((result) => {
            if (result.code === "0") {
              message.success("删除成功");
              fetchgetAccountPage(pageNum, 10);
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
        fetchgetAccountPage(pageNum, pageSize);
      } else {
        message.error(result.msg || "修改失败");
      }
    });
  };

  return (
    <>
      <JPage title={LoaderData?.title || "-"} desc={LoaderData?.desc || "-"}>
        <JPageCtrl
          options={[
            {
              type: "input",
              key: "phone",
              label: "手机号",
              edit: true,
            },
            {
              type: "input",
              key: "email",
              label: "邮箱",
              edit: true,
            },
          ]}
          additionButton={
            <>
              <JEdit
                // titleKey="name"
                title="新增账号"
                options={createdColumns}
                onSubmit={(data) => {
                  handleCreate(data);
                }}
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  新增
                </Button>
              </JEdit>
            </>
          }
          onSubmit={(params) => {
            fetchgetAccountPage(pageNum, pageSize, params);
          }}
          onReload={() => {
            fetchgetAccountPage(pageNum, pageSize);
          }}
        ></JPageCtrl>
        <JTable
          data={list}
          operationWidth={400}
          operation={(_text, record) => {
            return (
              <>
                <JCheck
                  titleKey="name"
                  options={columns}
                  id={record.id}
                  loadDataApi={getAccountById}
                >
                  <Button type="link" icon={<EyeOutlined />}>
                    查看
                  </Button>
                </JCheck>
                <JEdit
                  titleKey="name"
                  options={columns}
                  id={record.id}
                  loadDataApi={getAccountById}
                  onSubmit={(data) => {
                    handleUpdate(data);
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
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: (
                          <JEdit
                            title="修改密码"
                            options={passwodColumns}
                            onSubmit={(data) => {
                              handleChangePassword(record.id, data);
                            }}
                          >
                            <Button
                              type="link"
                              size="small"
                              icon={<LockOutlined />}
                            >
                              修改密码
                            </Button>
                          </JEdit>
                        ),
                      },
                      {
                        key: "2",
                        label: (
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
                          </Button>
                        ),
                      },
                    ],
                  }}
                >
                  <Tooltip title="更多操作">
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <EllipsisOutlined />
                      </Space>
                    </a>
                  </Tooltip>
                </Dropdown>
              </>
            );
          }}
          columns={columns}
          pageNum={pageNum}
          pageTotal={total}
          pageSize={pageSize}
          onPageChange={(pageNum, pageSize) => {
            fetchgetAccountPage(pageNum, pageSize);
          }}
        ></JTable>
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
