import {
  JCheck,
  JDelete,
  JEdit,
  JPage,
  JSearchTable,
  useColumn,
  ColumnType,
  JColumnsOptions,
  JButtonList,
} from "@devin/ui";
import { Button, message } from "antd";
import { useLoaderData } from "react-router";
import { DictProps } from "../../api/types/dict";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  createDict,
  deletedDict,
  getDictById,
  getDictPage,
  updateDict,
} from "../../api/types/dict";

const DictPage = () => {
  const LoaderData: any = {};

  const columns: JColumnsOptions<DictProps>[] = [
    {
      type: "input",
      key: "dictName",
      label: "字典名",
      width: 200,
    },
    {
      type: "input",
      key: "dictCode",
      label: "字典值",
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
      width: 100,
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
      hideInForm: true,
      hideInSearch: true,
      width: 140,
    },
    {
      type: "date",
      key: "updatedTime",
      label: "更新时间",
      hideInForm: true,
      hideInSearch: true,
      width: 140,
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
                loadDataApi={getDictById}
              >
                <Button type="link" size="small" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>,
              <JEdit
                title="编辑"
                options={columns}
                id={record.id}
                loadDataApi={getDictById}
                onSubmit={() => {
                  refresh();
                }}
                saveRequest={updateDict}
              >
                <Button type="link" size="small" icon={<EditOutlined />}>
                  编辑
                </Button>
              </JEdit>,
              <JEdit
                title="新增子字典"
                options={columns}
                onSubmit={(data) => {
                  createDict({
                    ...data,
                    parentId: record.dictCode,
                  }).then((res) => {
                    if (res.code === "0") {
                      message.success("创建成功");
                    }
                  });
                }}
              >
                <Button type="link" icon={<PlusOutlined />}>
                  新增子字典
                </Button>
              </JEdit>,
              <JDelete
                id={record.id as string}
                request={deletedDict}
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
      <JSearchTable<DictProps>
        options={columns}
        request={getDictPage}
        searchOperation={(_form, refresh) => {
          return (
            <JEdit
              title="新增"
              options={editFormOptions}
              onSubmit={() => {
                refresh();
              }}
              saveRequest={createDict}
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

export default DictPage;
