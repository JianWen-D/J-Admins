import { useState } from "react";
import { useLoaderData } from "react-router";
import JPage from "../../components/Antd/JPage";
import JPageCtrl from "../../components/Antd/PageCtrl";
import { Button, message, Modal } from "antd";
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
  DictProps,
  createDict,
  deletedDict,
  getDictById,
  getDictPage,
  updateDict,
} from "../../api/types/dict";
import { useMount } from "ahooks";

const { confirm } = Modal;

const DictPage = () => {
  const LoaderData: any = useLoaderData();
  // 基础变量
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  //
  const [list, setList] = useState<DictProps[]>([]);
  const [parentId, setParentId] = useState<string>("");

  useMount(() => {
    fetchgetDictPage(1, 10);
  });

  const fetchgetDictPage = async (
    pageNum?: number,
    pageSize?: number,
    searchParams?: any
  ) => {
    const params = {
      pageNum: pageNum || 1,
      pageSize: pageSize || 10,
      ...searchParams,
    };
    const result = await getDictPage(params);
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
      key: "dictName",
      label: "字典名",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "dictCode",
      label: "字典值",
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

  const handleCreate = async (params: DictProps) => {
    const result = await createDict({
      ...params,
      parentCode: parentId || null,
    });
    if (result.code === "0") {
      message.success("创建成功");
      setParentId("");
      fetchgetDictPage(pageNum, 10);
    } else {
      message.error(result.msg || "创建失败");
      setParentId("");
    }
  };

  const handleUpdate = async (params: DictProps) => {
    const result = await updateDict(params);
    if (result.code === "0") {
      message.success("更新成功");
      fetchgetDictPage(pageNum, 10);
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
          deletedDict(id).then((result) => {
            if (result.code === "0") {
              message.success("删除成功");
              fetchgetDictPage(pageNum, 10);
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
          console.log(params);
          fetchgetDictPage(pageNum, pageSize, params);
        }}
        onReload={() => {
          fetchgetDictPage(pageNum, pageSize);
        }}
      ></JPageCtrl>
      <JTable
        data={list}
        operationWidth={300}
        operation={(_text, record) => {
          return (
            <>
              <JCheck
                titleKey="name"
                options={columns}
                id={record.id}
                loadDataApi={getDictById}
              >
                <Button type="link" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>
              <JEdit
                titleKey="name"
                options={columns}
                id={record.id}
                loadDataApi={getDictById}
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
              <JEdit
                titleKey="name"
                options={columns}
                onSubmit={(data) => {
                  handleCreate(data);
                }}
              >
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setParentId(record.dictCode);
                    // handleDeleted(record.id);
                  }}
                >
                  新增子字典
                </Button>
              </JEdit>
            </>
          );
        }}
        columns={columns}
        pageNum={pageNum}
        pageTotal={total}
        pageSize={pageSize}
        onPageChange={(pageNum, pageSize) => {
          fetchgetDictPage(pageNum, pageSize);
        }}
      ></JTable>
    </JPage>
  );
};

export default DictPage;
