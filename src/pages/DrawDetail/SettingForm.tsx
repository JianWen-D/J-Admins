import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
} from "antd";

interface SettingFormProps {
  options: [];
}

const SettingForm = () => {
  const [form] = Form.useForm();
  Form.useWatch("items", form);

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{ items: [{}] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field, index) => {
              return (
                <Card
                  size="small"
                  title={`元素 ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item
                    label="名称"
                    name={[field.name, "name"]}
                    rules={[
                      {
                        required: true,
                        message: "请输入名称.",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="类型"
                    name={[field.name, "type"]}
                    rules={[
                      {
                        required: true,
                        message: "请选择类型.",
                      },
                    ]}
                  >
                    <Select
                      options={[
                        {
                          label: "文字",
                          value: "text",
                        },
                        {
                          label: "图片",
                          value: "image",
                        },
                      ]}
                    ></Select>
                  </Form.Item>
                  <Form.Item label="类型值" name={[field.name, "name"]}>
                    <Input />
                  </Form.Item>
                  {form.getFieldValue([`items`, index, "type"]) === "text" && (
                    <>
                      <Form.Item
                        label="字体大小"
                        name={[field.name, "fontsize"]}
                      >
                        <InputNumber min={10} />
                      </Form.Item>
                      <Form.Item label="字体" name={[field.name, "fontType"]}>
                        <Select
                          options={[
                            {
                              label: "宋体",
                              value: "songti",
                            },
                          ]}
                        ></Select>
                      </Form.Item>
                      <Form.Item label="对齐方式" name={[field.name, "align"]}>
                        <Radio.Group defaultValue="left">
                          <Radio.Button value="left">左对齐</Radio.Button>
                          <Radio.Button value="center">居中</Radio.Button>
                          <Radio.Button value="right">右对齐</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </>
                  )}
                </Card>
              );
            })}

            <Button
              type="dashed"
              onClick={() => {
                console.log(form.getFieldValue(`rules`));
                add();
              }}
              block
            >
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>
    </Form>
  );
};

export default SettingForm;
