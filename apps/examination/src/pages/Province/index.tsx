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
import { Button } from "antd";
import { useLoaderData } from "react-router";
import { ArchiveProps } from "../../api/types/archive";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  createArchive,
  deletedArchive,
  getArchiveById,
  getArchivePage,
  updateArchive,
} from "../../api/types/archive";

const ProvincePage = () => {
  const LoaderData: any = useLoaderData();

  const columns: JColumnsOptions<ArchiveProps>[] = [
    {
      type: "input",
      key: "name",
      label: "名称",
      width: 200,
    },
    {
      type: "input",
      key: "user",
      label: "负责人",
      width: 200,
    },
    {
      type: "input",
      key: "phone",
      label: "联系方式",
      width: 200,
    },
    {
      type: "input",
      key: "idCard",
      label: "身份证",
      width: 200,
    },
    {
      type: "input",
      key: "email",
      label: "邮箱",
      width: 200,
    },
    {
      type: "input",
      key: "email",
      label: "微信号",
      width: 200,
    },
    {
      type: "input",
      key: "areaCode",
      hideInTable: true,
      label: "所在地区",
      width: 200,
    },
    {
      type: "input",
      key: "areaName",
      hideInForm: true,
      hideInSearch: true,
      label: "所在地区",
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
                loadDataApi={getArchiveById}
              >
                <Button type="link" size="small" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>,
              <JEdit
                title="编辑"
                options={columns}
                id={record.id}
                loadDataApi={getArchiveById}
                onSubmit={() => {
                  refresh();
                }}
                saveRequest={updateArchive}
              >
                <Button type="link" size="small" icon={<EditOutlined />}>
                  编辑
                </Button>
              </JEdit>,
              <JDelete
                id={record.id as string}
                request={deletedArchive}
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
      <JSearchTable<ArchiveProps>
        options={columns}
        request={getArchivePage}
        defaultParams={{
          archiveType: 1,
        }}
        searchOperation={(_form, refresh) => {
          return (
            <JEdit
              title="新增"
              options={editFormOptions}
              onSubmit={() => {
                refresh();
              }}
              saveRequest={createArchive}
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

export default ProvincePage;
