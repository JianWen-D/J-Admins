import { useState } from "react";
import { useLoaderData } from "react-router";
import JPage from "../../components/Antd/Page";
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
  FileGroupProps,
  createFileGroup,
  deletedFileGroup,
  getFileGroupById,
  getFileGroupPage,
  updateFileGroup,
} from "../../api/types/filtGroup";
import { useMount } from "ahooks";

const { confirm } = Modal;

const FileGroupPage = () => {
  const LoaderData: any = useLoaderData();
  // 基础变量
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  //
  const [list, setList] = useState<FileGroupProps[]>([]);

  useMount(() => {
    fetchgetFileGroupPage(1, 10);
  });

  const fetchgetFileGroupPage = async (
    pageNum?: number,
    pageSize?: number,
    searchParams?: any
  ) => {
    const params = {
      pageNum: pageNum || 1,
      pageSize: pageSize || 10,
      ...searchParams,
    };
    const result = await getFileGroupPage(params);
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
      key: "id",
      label: "文件组ID",
      show: true,
      width: 280,
    },
    {
      type: "input",
      key: "groupName",
      label: "文件组名称",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "bucket",
      label: "bucket",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "maxSize",
      label: "最大文件大小",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "allowFileType",
      label: "文件类型",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "path",
      label: "文件存放路径",
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

  const handleCreate = async (params: FileGroupProps) => {
    const result = await createFileGroup(params);
    if (result.code === "0") {
      message.success("创建成功");
      fetchgetFileGroupPage(pageNum, 10);
    } else {
      message.error(result.msg || "创建失败");
    }
  };

  const handleUpdate = async (params: FileGroupProps) => {
    const result = await updateFileGroup(params);
    if (result.code === "0") {
      message.success("更新成功");
      fetchgetFileGroupPage(pageNum, 10);
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
          deletedFileGroup(id).then((result) => {
            if (result.code === "0") {
              message.success("删除成功");
              fetchgetFileGroupPage(pageNum, 10);
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
    <JPage title={LoaderData.title} desc={LoaderData.desc}>
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
          fetchgetFileGroupPage(pageNum, pageSize, params);
        }}
        onReload={() => {
          fetchgetFileGroupPage(pageNum, pageSize);
        }}
      ></JPageCtrl>
      <JTable
        data={list}
        operation={(text, record) => {
          return (
            <>
              <JCheck
                titleKey="name"
                options={columns}
                id={record.id}
                loadDataApi={getFileGroupById}
              >
                <Button type="link" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>
              <JEdit
                titleKey="name"
                options={columns}
                id={record.id}
                loadDataApi={getFileGroupById}
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
          fetchgetFileGroupPage(pageNum, pageSize);
        }}
      ></JTable>
    </JPage>
  );
};

export default FileGroupPage;
