import { useEffect, useState } from "react";
import { useLoaderData, useMatches, useRouteLoaderData } from "react-router";
import JPage from "../../components/Antd/Page";
import JPageCtrl from "../../components/Antd/PageCtrl";
import { Button, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import JTable from "../../components/Antd/Table";
import { JFormItemProps } from "../../components/Antd/Form/types";
import JCheck from "../../components/Antd/Check";
import JEdit from "../../components/Antd/Edit";
import {
  ApplicationProps,
  createApplication,
  deletedApplication,
  getApplicationById,
  getApplicationPage,
  updateApplication,
} from "../../api/types/application";
import { useMount } from "ahooks";
import PermissionEdit from "./permission";

const { confirm } = Modal;

const ApplicationPage = () => {
  const LoaderData: any = useLoaderData();
  // 基础变量
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  //
  const [list, setList] = useState<ApplicationProps[]>([]);
  const [permissionEditVisible, setPermissionEditVisible] =
    useState<boolean>(false);
  const [applicationId, setApplicationId] = useState<string>("");

  useMount(() => {
    fetchgetApplicationPage(1, 10);
  });

  const fetchgetApplicationPage = async (
    pageNum?: number,
    pageSize?: number,
    searchParams?: any
  ) => {
    const params = {
      pageNum: pageNum || 1,
      pageSize: pageSize || 10,
      ...searchParams,
    };
    const result = await getApplicationPage(params);
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
      key: "icon",
      label: "应用图标",
      edit: true,
      show: true,
      width: 100,
      maxCount: 1,
      columns: 1,
      labelCol: {
        span: 3,
      },
      groupId: "f20f4a8cb29620bd2dfcc1aacd690988",
    },
    {
      type: "input",
      key: "name",
      label: "应用名",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "appKey",
      label: "应用Key",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "entry",
      label: "应用地址(entry)",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "activeRule",
      label: "应用路由",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "container",
      label: "容器元素ID",
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

  const handleCreate = async (params: ApplicationProps) => {
    const result = await createApplication(params);
    if (result.code === "0") {
      message.success("创建成功");
      fetchgetApplicationPage(pageNum, 10);
    } else {
      message.error(result.msg || "创建失败");
    }
  };

  const handleUpdate = async (params: ApplicationProps) => {
    const result = await updateApplication(params);
    if (result.code === "0") {
      message.success("更新成功");
      fetchgetApplicationPage(pageNum, 10);
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
          deletedApplication(id).then((result) => {
            if (result.code === "0") {
              message.success("删除成功");
              fetchgetApplicationPage(pageNum, 10);
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
    <>
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
            fetchgetApplicationPage(pageNum, pageSize, params);
          }}
          onReload={() => {
            fetchgetApplicationPage(pageNum, pageSize);
          }}
        ></JPageCtrl>
        <JTable
          data={list}
          operationWidth={300}
          operation={(text, record) => {
            return (
              <>
                <JCheck
                  titleKey="name"
                  options={columns}
                  id={record.id}
                  loadDataApi={getApplicationById}
                >
                  <Button type="link" icon={<EyeOutlined />}>
                    查看
                  </Button>
                </JCheck>
                <JEdit
                  titleKey="name"
                  options={columns}
                  id={record.id}
                  loadDataApi={getApplicationById}
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
                <Button
                  type="link"
                  icon={<MenuOutlined />}
                  onClick={() => {
                    setApplicationId(record.id);
                    setPermissionEditVisible(true);
                  }}
                >
                  权限列表
                </Button>
              </>
            );
          }}
          columns={columns}
          pageNum={pageNum}
          pageTotal={total}
          pageSize={pageSize}
          onPageChange={(pageNum, pageSize) => {
            fetchgetApplicationPage(pageNum, pageSize);
          }}
        ></JTable>
      </JPage>
      <Modal
        title="权限列表"
        width={1200}
        open={permissionEditVisible}
        destroyOnClose
        styles={{
          body: {
            padding: "24px 0",
          },
        }}
        onCancel={() => {
          setPermissionEditVisible(false);
          setApplicationId("");
        }}
        onOk={() => {}}
      >
        <PermissionEdit
          applicationId={applicationId}
          onSelect={(id) => {
            // setSelectUserId(id);
          }}
        ></PermissionEdit>
      </Modal>
    </>
  );
};

export default ApplicationPage;
