import {
  JButtonList,
  JCheck,
  JEdit,
  JColumnsOptions,
  JSearchTable,
  JDelete,
  JPage,
} from "@devin/ui";
import { useLoaderData } from "react-router";
import { Button } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  FileGroupProps,
  createFileGroup,
  deletedFileGroup,
  getFileGroupById,
  getFileGroupPage,
  updateFileGroup,
} from "../../api/types/filtGroup";

const FileGroupPage = () => {
  const LoaderData: any = useLoaderData();

  const columns: JColumnsOptions<FileGroupProps>[] = [
    {
      type: "input",
      key: "id",
      label: "文件组ID",
      width: 280,
      hideInForm: true,
      columnsNum: 12,
    },
    {
      type: "input",
      key: "groupName",
      label: "文件组名称",
      width: 200,
      columnsNum: 12,
    },
    {
      type: "input",
      key: "bucket",
      label: "Bucket",
      width: 200,
      columnsNum: 12,
    },
    {
      type: "input",
      key: "maxSize",
      label: "最大文件大小",
      width: 200,
      hideInSearch: true,
      columnsNum: 12,
    },
    {
      type: "input",
      key: "allowFileType",
      label: "文件类型",
      width: 200,
      hideInSearch: true,
      columnsNum: 12,
    },
    {
      type: "input",
      key: "path",
      label: "文件存放路径",
      width: 200,
      hideInSearch: true,
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
      width: 200,
      columnsNum: 24,
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 21,
      },
      hideInSearch: true,
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
          <JButtonList
            options={[
              <JCheck
                options={columns}
                id={record.id}
                loadDataApi={getFileGroupById}
              >
                <Button type="link" size="small" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>,
              <JEdit
                options={columns}
                id={record.id}
                loadDataApi={getFileGroupById}
                onSubmit={() => {
                  refresh();
                }}
                saveRequest={updateFileGroup}
                title={`编辑 - ${record.groupName}`}
              >
                <Button type="link" size="small" icon={<EditOutlined />}>
                  编辑
                </Button>
              </JEdit>,
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
              </JDelete>,
            ]}
          ></JButtonList>
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
