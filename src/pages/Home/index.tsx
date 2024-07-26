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
      type: "input",
      key: "name",
      label: "名字",
      show: true,
      width: 200,
    },
    {
      type: "radio",
      key: "gender",
      label: "性别",
      options: [
        {
          label: "男",
          value: 1,
        },
        {
          label: "女",
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
      show: true,
      width: 200,
    },
    {
      type: "date",
      key: "brithday",
      label: "创建日期",
      show: true,
      width: 200,
    },
    {
      type: "time",
      key: "time",
      label: "执行时间",
      show: true,
      width: 200,
    },
    {
      type: "dateRange",
      key: "dateRange",
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
            <Button type="primary" icon={<PlusOutlined />}>
              新增
            </Button>
          </>
        }
        onSubmit={() => {}}
        onReload={() => {}}
      ></JPageCtrl>
      <JTable
        data={[
          {
            name: "小明",
            brithday: "2024-01-01",
            time: "2024-01-01 06:30",
            dateRange: ["2024-01-31 06:30", "2024-01-01 06:30"],
            gender: 1,
            gender1: [1, 2, 3],
          },
        ]}
        operation={(record) => {
          return (
            <>
              <Button type="link" icon={<EyeOutlined />}>
                查看
              </Button>
              <Button type="link" icon={<EditOutlined />}>
                编辑
              </Button>
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
