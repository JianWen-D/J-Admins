import { useState } from "react";
import { useLoaderData } from "react-router";
import JPage from "../../components/Antd/JPage";
import JPageCtrl from "../../components/Antd/PageCtrl";
import { Button, message, Modal, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import JTable from "../../components/Antd/Table";
import { JFormItemProps } from "../../components/Antd/Form/types";
import JCheck from "../../components/Antd/Check";
import JEdit from "../../components/Antd/Edit";
import {
  UserProps,
  createUser,
  deletedUser,
  getUserById,
  getUserPage,
  updateUser,
} from "../../api/types/user";
import { useMount } from "ahooks";
import { useCommon } from "../../utils/hooks";

const { confirm } = Modal;

const UserPage = () => {
  const { dictList } = useCommon();
  const LoaderData: any = useLoaderData();
  // 基础变量
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  //
  const [list, setList] = useState<UserProps[]>([]);

  useMount(() => {
    fetchgetUserPage(1, 10);
  });

  const fetchgetUserPage = async (
    pageNum?: number,
    pageSize?: number,
    searchParams?: any
  ) => {
    const params = {
      pageNum: pageNum || 1,
      pageSize: pageSize || 10,
      ...searchParams,
    };
    const result = await getUserPage(params);
    if (result.code === "0") {
      setTotal(result.data.total);
      setPageNum(result.data.pages);
      setPageSize(result.data.size);
      setList(result.data.records);
    }
  };

  const columns: JFormItemProps[] = [
    {
      type: "image",
      key: "avatar",
      label: "用户头像",
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
      key: "nickName",
      label: "昵称",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "name",
      label: "姓名",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "select",
      key: "gender",
      label: "性别",
      edit: true,
      show: true,
      width: 200,
      options: (dictList.Gender || []).map((item: any) => ({
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
      key: "idCard",
      label: "身份证",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "createdByApplicationName",
      label: "用户来源",
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "accountId",
      label: "账号",
      show: true,
      width: 200,
      render: (text) => {
        return text ? <Tag color="blue">已绑定</Tag> : <Tag>未绑定</Tag>;
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

  const handleCreate = async (params: UserProps) => {
    const result = await createUser(params);
    if (result.code === "0") {
      message.success("创建成功");
      fetchgetUserPage(pageNum, 10);
    } else {
      message.error(result.msg || "创建失败");
    }
  };

  const handleUpdate = async (params: UserProps) => {
    const result = await updateUser(params);
    if (result.code === "0") {
      message.success("更新成功");
      fetchgetUserPage(pageNum, 10);
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
          deletedUser(id).then((result) => {
            if (result.code === "0") {
              message.success("删除成功");
              fetchgetUserPage(pageNum, 10);
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
    <JPage title={LoaderData?.title || "-"} desc={LoaderData?.desc || "-"}>
      <JPageCtrl
        options={[
          {
            type: "input",
            key: "name",
            label: "应用名",
            edit: true,
          },
        ]}
        additionButton={
          <>
            <JEdit
              titleKey="name"
              options={columns}
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
          fetchgetUserPage(pageNum, pageSize, params);
        }}
        onReload={() => {
          fetchgetUserPage(pageNum, pageSize);
        }}
      ></JPageCtrl>
      <JTable
        data={list}
        operation={(_text, record) => {
          return (
            <>
              <JCheck
                titleKey="name"
                options={columns}
                id={record.id}
                loadDataApi={getUserById}
              >
                <Button type="link" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>
              <JEdit
                titleKey="name"
                options={columns}
                id={record.id}
                loadDataApi={getUserById}
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
            </>
          );
        }}
        columns={columns}
        pageNum={pageNum}
        pageTotal={total}
        pageSize={pageSize}
        onPageChange={(pageNum, pageSize) => {
          fetchgetUserPage(pageNum, pageSize);
        }}
      ></JTable>
    </JPage>
  );
};

export default UserPage;
