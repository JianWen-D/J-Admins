import { useEffect } from "react";
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

const HomePage = () => {
  const RouteLoaderData = useRouteLoaderData("home");
  const LoaderData: any = useLoaderData();
  const Matches = useMatches();

  useEffect(() => {
    console.log(Matches);
    console.log(LoaderData);
    console.log(RouteLoaderData);
  }, []);

  const columns: JFormItemProps[] = [
    {
      type: "image",
      key: "avatar",
      label: "头像",
      edit: true,
      show: true,
      width: 100,
      maxCount: 2,
      columns: 1,
      labelCol: {
        span: 3,
      },
    },
    {
      type: "input",
      key: "phone",
      label: "手机号",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "email",
      label: "邮箱",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "select",
      key: "user",
      label: "用户",
      options: [
        {
          label: "用户1",
          value: 1,
        },
        {
          label: "用户2",
          value: 2,
        },
      ],
      color: {
        1: "blue",
        2: "red",
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
      type: "date",
      key: "createdTime",
      label: "创建日期",
      show: true,
      width: 200,
    },
    {
      type: "date",
      key: "lastLoginTime",
      label: "最近登陆时间",
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
  ];

  return (
    <JPage title={LoaderData.title} desc={LoaderData.desc}>
      <JPageCtrl
        options={[
          {
            type: "input",
            key: "name1",
            label: "名字",
            show: true,
          },
          {
            type: "input",
            key: "name2",
            label: "名字",
            show: true,
          },
          {
            type: "input",
            key: "name3",
            label: "名字",
            show: true,
          },
        ]}
        additionButton={
          <>
            <JEdit
              title="123"
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
        onSubmit={() => {}}
        onReload={() => {}}
      ></JPageCtrl>
      <JTable
        data={[
          {
            avatar:
              "https://file.iviewui.com/admin-cloud-dist/img/logo-small.4a34a883.png",
            phone: "12345678901",
            email: "123456789@qq.com",
            createdTime: "2024-01-01 23:59:59",
            lastLoginTime: "2024-01-01 06:30:59",
            updatedTime: "2024-12-01 06:30:59",
            user: 1,
            status: 0,
          },
        ]}
        operation={(text, record) => {
          return (
            <>
              <JCheck title="123" options={columns} data={record}>
                <Button type="link" icon={<EyeOutlined />}>
                  查看
                </Button>
              </JCheck>
              <JEdit
                title="123"
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
        pageNum={1}
        pageTotal={10}
        pageSize={10}
        onPageChange={() => {}}
      ></JTable>
    </JPage>
  );
};

export default HomePage;
