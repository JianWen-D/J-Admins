import { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import JPage from "../../components/Business/JPage";
import JPageCtrl from "../../components/Business/PageCtrl";
import { Button, Divider, message, Modal, Space } from "antd";
import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { JFormItemProps } from "../../components/Antd/Form/types";
import JCheck from "../../components/Business/JCheck";
import JEdit from "../../components/Business/JEdit";
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
import JSearchTable from "../../components/Business/JSearchTable";
import { JColumnsOptions } from "../../components/Business/types";
import JDelete from "../../components/Business/JDelete";
import JButtonList from "../../components/Business/JButtonList";

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

  const columns: JColumnsOptions<ApplicationProps>[] = [
    {
      type: "image",
      key: "icon",
      label: "应用图标",
      width: 100,
      maxUploadCount: 1,
      columnsNum: 24,
      labelCol: {
        span: 3,
      },
      fileGroupId: "f20f4a8cb29620bd2dfcc1aacd690988",
      hideInSearch: true,
    },
    {
      type: "input",
      key: "name",
      label: "应用名",
      width: 200,
      columnsNum: 12,
    },
    {
      type: "input",
      key: "appKey",
      label: "应用Key",
      width: 200,
      columnsNum: 12,
    },
    {
      type: "input",
      key: "entry",
      label: "应用地址(entry)",
      width: 200,
      columnsNum: 12,
    },
    {
      type: "input",
      key: "activeRule",
      label: "应用路由",
      width: 200,
      columnsNum: 12,
    },
    {
      type: "input",
      key: "container",
      label: "容器元素ID",
      width: 200,
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
    },
    {
      type: "date",
      key: "createdTime",
      label: "创建日期",
      width: 140,
      hideInForm: true,
    },
    {
      type: "date",
      key: "updatedTime",
      label: "更新时间",
      width: 140,
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
                title="新增"
                options={columns}
                id={record.id}
                loadDataApi={getApplicationById}
              >
                <Button type="link" size="small" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>,
              <JEdit
                title="编辑"
                options={columns}
                id={record.id}
                loadDataApi={getApplicationById}
                onSubmit={() => {
                  refresh();
                }}
                saveRequest={updateApplication}
              >
                <Button type="link" size="small" icon={<EditOutlined />}>
                  编辑
                </Button>
              </JEdit>,
              <JDelete
                id={record.id as string}
                request={getApplicationById}
                onSuccess={() => {
                  refresh();
                }}
              >
                <Button type="link" size="small" icon={<DeleteOutlined />}>
                  删除
                </Button>
              </JDelete>,
              <Button
                type="link"
                size="small"
                icon={<AppstoreOutlined />}
                onClick={() => {
                  setPermissionEditVisible(true);
                  setApplicationId(record.id as string);
                }}
              >
                权限管理
              </Button>,
            ]}
          ></JButtonList>
        );
      },
    },
  ];

  return (
    <>
      <JPage title={LoaderData?.title || "-"} desc={LoaderData?.desc || "-"}>
        <JSearchTable<ApplicationProps>
          options={columns}
          request={getApplicationPage}
          searchOperation={(_form, refresh) => {
            return (
              <JEdit
                options={columns}
                onSubmit={() => {
                  refresh();
                }}
                saveRequest={createApplication}
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  新增
                </Button>
              </JEdit>
            );
          }}
        ></JSearchTable>
      </JPage>
      <Modal
        title="权限列表"
        width={1400}
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
        footer={false}
      >
        <PermissionEdit
          applicationId={applicationId}
          onSelect={() => {
            // setSelectUserId(id);
          }}
        ></PermissionEdit>
      </Modal>
    </>
  );
};

export default ApplicationPage;
