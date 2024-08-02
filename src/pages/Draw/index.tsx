import { useEffect } from "react";
import {
  useLoaderData,
  useMatches,
  useNavigate,
  useRouteLoaderData,
} from "react-router";
import JPage from "../../components/Antd/Page";
import JPageCtrl from "../../components/Antd/PageCtrl";
import { Button } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import JTable from "../../components/Antd/Table";
import { JFormItemProps } from "../../components/Antd/Form/types";
import JCheck from "../../components/Antd/Check";
import JEdit from "../../components/Antd/Edit";

const DrawPage = () => {
  const RouteLoaderData = useRouteLoaderData("home");
  const LoaderData: any = useLoaderData();
  const Matches = useMatches();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(Matches);
    console.log(LoaderData);
    console.log(RouteLoaderData);
  }, []);

  const columns: JFormItemProps[] = [
    {
      type: "input",
      key: "name",
      label: "模版名称",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "desc",
      label: "备注",
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
      type: "date",
      key: "createdName",
      label: "创建人",
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
      key: "updatedName",
      label: "修改人",
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
            name: "模版1",
            desc: "测试模版",
            createdTime: "2024-01-01 23:59:59",
            updatedTime: "2024-12-01 06:30:59",
            status: 0,
          },
        ]}
        operationWidth={400}
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
              <Button
                type="link"
                icon={<SettingOutlined />}
                onClick={() => {
                  navigate("/drawDetail");
                }}
              >
                设置
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

export default DrawPage;
