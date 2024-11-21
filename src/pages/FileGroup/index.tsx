import { useLoaderData } from "react-router";
import JPage from "../../components/Business//JPage";
import { Button, Divider, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import JCheck from "../../components/Business/JCheck";
import JEdit from "../../components/Business/JEdit";
import {
  FileGroupProps,
  createFileGroup,
  deletedFileGroup,
  getFileGroupById,
  getFileGroupPage,
  updateFileGroup,
} from "../../api/types/filtGroup";
import JSearchTable from "../../components/Business/JSearchTable";
import { JColumnsOptions } from "../../components/Business/types";
import JDelete from "../../components/Business/JDelete";

const FileGroupPage = () => {
  const LoaderData: any = useLoaderData();

  const columns: JColumnsOptions<FileGroupProps>[] = [
    {
      type: "input",
      key: "id",
      label: "文件组ID",
      width: 280,
    },
    {
      type: "input",
      key: "groupName",
      label: "文件组名称",
      width: 200,
    },
    {
      type: "input",
      key: "bucket",
      label: "bucket",
      width: 200,
    },
    {
      type: "input",
      key: "maxSize",
      label: "最大文件大小",
      width: 200,
      hideInSearch: true,
    },
    {
      type: "input",
      key: "allowFileType",
      label: "文件类型",
      width: 200,
      hideInSearch: true,
    },
    {
      type: "input",
      key: "path",
      label: "文件存放路径",
      width: 200,
      hideInSearch: true,
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
      type: "textarea",
      key: "remark",
      label: "备注",
      width: 200,
      columnsNum: 24,
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
      width: 140,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      type: "date",
      key: "updatedTime",
      label: "更新时间",
      width: 140,
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
          <Space size="small" split={<Divider type="vertical" />}>
            <JCheck
              options={columns}
              id={record.id}
              loadDataApi={getFileGroupById}
            >
              <Button type="link" size="small" icon={<EyeOutlined />}>
                查看
              </Button>
            </JCheck>
            <JEdit
              options={columns}
              id={record.id}
              loadDataApi={getFileGroupById}
              onSubmit={() => {
                refresh();
              }}
              saveRequest={updateFileGroup}
            >
              <Button type="link" size="small" icon={<EditOutlined />}>
                编辑
              </Button>
            </JEdit>
            <JDelete
              id={record.id as string}
              request={deletedFileGroup}
              onSuccess={() => {
                refresh();
              }}
            >
              <Button type="link" size="small" icon={<DeleteOutlined />}>
                删除
              </Button>
            </JDelete>
          </Space>
        );
      },
    },
  ];

  return (
    <JPage title={LoaderData?.title || "-"} desc={LoaderData?.desc || "-"}>
      <JSearchTable<FileGroupProps>
        options={columns}
        request={getFileGroupPage}
        searchOperation={(_form, refresh) => {
          return (
            <JEdit
              options={columns}
              onSubmit={() => {
                refresh();
              }}
              saveRequest={createFileGroup}
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

export default FileGroupPage;
