import { CloseOutlined } from "@ant-design/icons";
import { useUpdateEffect } from "ahooks";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";
import { throttle } from "lodash";

interface SettingFormProps {
  options: any[];
  onChange: (options: any[]) => void;
}

const SettingForm = (props: SettingFormProps) => {
  const [form] = Form.useForm();
  const options = Form.useWatch("options", form);

  useUpdateEffect(() => {
    props.onChange(options);
  }, [options]);

  useUpdateEffect(() => {
    throttle(() => {
      form.setFieldsValue({
        options: props.options,
      });
    }, 300);
  }, [props.options]);

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{ options: props.options }}
    >
      <Form.List name="options">
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
                  <Form.Item label="类型值" name={[field.name, "keys"]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="坐标" style={{ marginBottom: 0 }}>
                    <Row>
                      <Col>
                        <Form.Item name={[field.name, "x"]} initialValue={0}>
                          <InputNumber min={0} placeholder="X轴" />
                        </Form.Item>
                      </Col>
                      <Col offset={1}>
                        <Form.Item name={[field.name, "y"]} initialValue={0}>
                          <InputNumber min={0} placeholder="Y轴" />
                        </Form.Item>
                      </Col>
                    </Row>
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
                  {form.getFieldValue([`options`, index, "type"]) ===
                    "text" && (
                    <>
                      <Form.Item
                        label="字体大小"
                        name={[field.name, "fontSize"]}
                      >
                        <InputNumber min={12} max={100} />
                      </Form.Item>
                      <Form.Item
                        label="字体"
                        name={[field.name, "fontType"]}
                        initialValue={"songti"}
                      >
                        <Select
                          options={[
                            {
                              label: "宋体",
                              value: "songti",
                            },
                          ]}
                        ></Select>
                      </Form.Item>
                      <Form.Item
                        label="对齐方式"
                        name={[field.name, "align"]}
                        initialValue={"left"}
                      >
                        <Radio.Group>
                          <Radio.Button value="left">左对齐</Radio.Button>
                          <Radio.Button value="center">居中</Radio.Button>
                          <Radio.Button value="right">右对齐</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        label="下划线"
                        name={[field.name, "downline"]}
                        initialValue={false}
                      >
                        <Radio.Group>
                          <Radio.Button value={false}>无</Radio.Button>
                          <Radio.Button value={true}>有</Radio.Button>
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
                add({
                  id: new Date().valueOf(),
                });
              }}
              block
            >
              + 新增
            </Button>
          </div>
        )}
      </Form.List>
    </Form>
  );
};

export default SettingForm;
