import {
  JCheck,
  JEdit,
  JColumnsOptions,
  JTable,
  useColumn,
  ColumnType,
  JButtonList,
} from "@devin/ui";
import { useState } from "react";
import { useMount } from "ahooks";
import {
  createPermission,
  deletedPermission,
  getPermissionById,
  getTreeListByApplicationId,
  PermissionProps,
  updatePermission,
} from "../../api/types/permission";
import { Button, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useCommon } from "../../context/commonContext";

const { confirm } = Modal;

const PermissionEdit = (props: {
  applicationId: string;
  onSelect: (id: React.Key) => void;
}) => {
  //
  const { dictList } = useCommon();
  const [list, setList] = useState<PermissionProps[]>([]);
  // const [dictList, setDictList] = useState<any>({
  //   PermissionType: "",
  // });

  useMount(() => {
    fetchGetPermission();
  });

  const fetchGetPermission = async () => {
    const result = await getTreeListByApplicationId(props.applicationId);
    if (result.code === "0") {
      setList(result.data);
    }
  };

  const columns: JColumnsOptions<PermissionProps>[] = [
    {
      type: "input",
      key: "name",
      label: "资源名称",
      width: 200,
    },
    {
      type: "input",
      key: "value",
      label: "资源KEY",
      width: 200,
    },
    {
      type: "select",
      key: "type",
      label: "资源类型",
      width: 120,
      options: (dictList.PermissionType || []).map((item: any) => ({
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
    },
    {
      label: "操作",
      key: "operation",
      type: "input",
      hideInSearch: true,
      hideInForm: true,
      hideInCheck: true,
      width: 360,
      render: (_text, record) => {
        return (
          <JButtonList
            options={[
              <JCheck
                options={columns}
                id={record.id}
                loadDataApi={getPermissionById}
              >
                <Button type="link" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>,
              <JEdit
                options={columns}
                id={record.id}
                loadDataApi={getPermissionById}
                onSubmit={(data) => {
                  handleUpdate(data);
                }}
              >
                <Button type="link" icon={<EditOutlined />}>
                  编辑
                </Button>
              </JEdit>,
              <JEdit
                title="新增子资源"
                options={columns}
                onSubmit={(data) => {
                  handleCreate({
                    ...data,
                    parentId: record.id,
                  });
                }}
              >
                <Button type="link" icon={<PlusOutlined />}>
                  新增子资源
                </Button>
              </JEdit>,
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => {
                  handleDeleted(record.id as string);
                }}
              >
                删除
              </Button>,
            ]}
          />
        );
      },
    },
  ];

  const handleCreate = async (params: PermissionProps) => {
    const result = await createPermission({
      ...params,
      applicationId: props.applicationId,
    });
    if (result.code === "0") {
      message.success("创建成功");
      fetchGetPermission();
    } else {
      message.error(result.msg || "创建失败");
    }
  };

  const handleUpdate = async (params: PermissionProps) => {
    const result = await updatePermission({
      ...params,
      applicationId: props.applicationId,
    });
    if (result.code === "0") {
      message.success("更新成功");
      fetchGetPermission();
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
          deletedPermission(id).then((result) => {
            if (result.code === "0") {
              message.success("删除成功");
              fetchGetPermission();
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

  const tableOperation = useColumn(columns, ColumnType.Table);

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <JEdit
          options={columns}
          onSubmit={(data) => {
            handleCreate(data);
          }}
        >
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        </JEdit>
      </div>
      <JTable
        data={list}
        columns={tableOperation}
        showPage={false}
        scrollY={480}
      ></JTable>
    </>
  );
};

export default PermissionEdit;
