import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { JForm } from "@devin/ui";
import { JFormItemProps } from "../../components/Base/Form/types";
import { JRead } from "@devin/ui";
import { Button } from "antd";

const HomePage = () => {
  const [data, setData] = useState<any>();
  const [form] = useForm();
  const columns: JFormItemProps[] = [
    {
      type: "image",
      key: "icon",
      label: "应用图标",
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 22,
      },
      columnsNum: 24,
      fileGroupId: "f20f4a8cb29620bd2dfcc1aacd690988",
    },
    {
      type: "input",
      key: "name",
      label: "应用名",
    },
    {
      type: "input",
      key: "appKey",
      label: "应用Key",
    },
    {
      type: "input",
      key: "entry",
      label: "应用地址(entry)",
    },
    {
      type: "input",
      key: "activeRule",
      label: "应用路由",
    },
    {
      type: "input",
      key: "container",
      label: "容器元素ID",
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
    },
    {
      type: "textarea",
      key: "remark",
      label: "备注",
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 22,
      },
      columnsNum: 24,
    },
    {
      type: "date",
      key: "createdTime",
      label: "创建日期",
    },
    {
      type: "date",
      key: "updatedTime",
      label: "更新时间",
    },
  ];
  return (
    <>
      <JForm
        form={form}
        options={columns}
        initValue={{
          appKey: 1123,
        }}
      ></JForm>
      <Button
        onClick={() => {
          console.log(form.getFieldsValue());
          form.validateFields().then((res) => {
            console.log(res);
            setData(res);
          });
        }}
      >
        获取表单信息
      </Button>
      <JRead data={data} options={columns}></JRead>
    </>
  );
};

export default HomePage;
