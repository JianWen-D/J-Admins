import { useEffect, useState } from "react";
import { useLoaderData, useMatches, useRouteLoaderData } from "react-router";
import JPage from "../../components/Antd/Page";
import JPageCtrl from "../../components/Antd/PageCtrl";
import { Button } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import JTable from "../../components/Antd/Table";
import { JFormItemProps } from "../../components/Antd/Form/types";
import JCheck from "../../components/Antd/Check";
import JEdit from "../../components/Antd/Edit";
import {
  ApplicationProps,
  getApplicationPage,
} from "../../api/types/application";
import { useMount } from "ahooks";

const ApplicationPage = () => {
  const RouteLoaderData = useRouteLoaderData("home");
  const LoaderData: any = useLoaderData();
  const Matches = useMatches();
  // 基础变量
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  //
  const [list, setList] = useState<ApplicationProps[]>([]);

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
              data={{}}
              onSubmit={(data) => {
                console.log(data);
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
        operation={(text, record) => {
          return (
            <>
              <JCheck titleKey="name" options={columns} data={record}>
                <Button type="link" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>
              <JEdit
                titleKey="name"
                options={columns}
                data={record}
                onSubmit={(data) => {
                  console.log(data);
                }}
              >
                <Button type="link" icon={<EditOutlined />}>
                  编辑
                </Button>
              </JEdit>
              <Button type="link" icon={<DeleteOutlined />}>
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
          fetchgetApplicationPage(pageNum, pageSize);
        }}
      ></JTable>
    </JPage>
  );
};

export default ApplicationPage;
