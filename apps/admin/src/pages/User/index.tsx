import {
  JCheck,
  JDelete,
  JEdit,
  JPage,
  JSearchTable,
  JColumnsOptions,
  ColumnType,
  useColumn,
  JButtonList,
} from "@devin/ui";
import { Button, Tag } from "antd";
import { useLoaderData } from "react-router";
import { UserProps } from "../../api/types/user";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  createUser,
  deletedUser,
  getUserById,
  getUserPage,
  updateUser,
} from "../../api/types/user";
import { useCommon } from "../../context/commonContext";

const UserPage = () => {
  const { dictList } = useCommon();
  const LoaderData: any = useLoaderData();

  const columns: JColumnsOptions<UserProps>[] = [
    {
      type: "image",
      key: "avatar",
      label: "用户头像",
      width: 100,
      maxUploadCount: 1,
      columnsNum: 24,
      labelCol: {
        span: 2,
      },
      fileGroupId: "7cd169f80fa6da7d7b97a1320bc029eb",
      hideInSearch: true,
    },
    {
      type: "input",
      key: "nickName",
      label: "昵称",
      width: 200,
    },
    {
      type: "input",
      key: "name",
      label: "姓名",
      width: 200,
    },
    {
      type: "select",
      key: "gender",
      label: "性别",
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
      width: 200,
    },
    {
      type: "input",
      key: "createdByApplicationName",
      hideInForm: true,
      hideInSearch: true,
      label: "用户来源",
      width: 200,
    },
    {
      type: "input",
      key: "accountId",
      label: "账号",
      width: 200,
      hideInForm: true,
      hideInSearch: true,
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
      width: 300,
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
                loadDataApi={getUserById}
              >
                <Button type="link" size="small" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>,
              <JEdit
                title="编辑"
                options={columns}
                id={record.id}
                loadDataApi={getUserById}
                onSubmit={() => {
                  refresh();
                }}
                saveRequest={updateUser}
              >
                <Button type="link" size="small" icon={<EditOutlined />}>
                  编辑
                </Button>
              </JEdit>,
              <JDelete
                id={record.id as string}
                request={deletedUser}
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

  const editFormOptions = useColumn(columns, ColumnType.Form);

  return (
    <JPage title={LoaderData?.title || "-"} desc={LoaderData?.desc || "-"}>
      <JSearchTable<UserProps>
        options={columns}
        request={getUserPage}
        searchOperation={(_form, refresh) => {
          return (
            <JEdit
              title="新增"
              options={editFormOptions}
              onSubmit={() => {
                refresh();
              }}
              saveRequest={createUser}
            >
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            </JEdit>
          );
        }}
      ></JSearchTable>
    </JPage>
  );
};

export default UserPage;
