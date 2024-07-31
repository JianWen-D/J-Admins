import React from "react";
import {
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  TimePicker,
} from "antd";
import { FormInstance } from "antd/lib/form";
import { JFormItemProps, JFormProps } from "./types";
import JImage from "../Image";

const { RangePicker } = DatePicker;

const initForm = (
  props: JFormProps
): { ref: FormInstance; dom: React.ReactNode } => {
  const [form] = Form.useForm();
  const {
    labelCol = { span: 6 },
    wrapperCol = { span: 18 },
    options = [],
    columns = 1,
  } = props;
  return {
    ref: form,
    dom: (
      <Form
        form={form}
        labelCol={labelCol ?? { span: 8 }}
        wrapperCol={wrapperCol ?? { span: 16 }}
        autoComplete="off"
      >
        <Row>
          {options
            .filter((item: JFormItemProps) => item.edit)
            .map((item: JFormItemProps, index: number) => {
              switch (item.type) {
                case "input":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <Input
                          maxLength={item.maxLength || 200}
                          type={item.inputType || "text"}
                          placeholder={
                            item.placeholder || `请输入${item.label}.`
                          }
                          onKeyUp={item.onKeyUp}
                          allowClear
                          onPressEnter={() => {
                            // handleConfirm();
                          }}
                        />
                      </Form.Item>
                    </Col>
                  );
                case "password":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <Input.Password
                          maxLength={item.maxLength || 200}
                          placeholder={
                            item.placeholder || `请输入${item.label}.`
                          }
                          onKeyUp={item.onKeyUp}
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                  );
                case "textarea":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <Input.TextArea
                          showCount={item.maxLength ? true : false}
                          maxLength={item.maxLength || 200}
                          placeholder={
                            item.placeholder || `请输入${item.label}.`
                          }
                          onKeyUp={item.onKeyUp}
                          allowClear
                          autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                      </Form.Item>
                    </Col>
                  );
                case "number":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          min={0}
                          controls={false}
                          placeholder={
                            item.placeholder || `请输入${item.label}.`
                          }
                        />
                      </Form.Item>
                    </Col>
                  );
                case "select":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        key={index}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <Select
                          style={{ width: "100%" }}
                          disabled={item.disabled}
                          placeholder={
                            item.placeholder || `请选择${item.label}.`
                          }
                          onChange={item?.onChange}
                          filterOption={(input, option: any) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          showSearch
                          allowClear
                        >
                          {item.options?.map((optionsItem, optionsIndex) => {
                            return (
                              <Select.Option
                                key={optionsIndex}
                                value={
                                  optionsItem[
                                    item.optionsProps?.value || "value"
                                  ]
                                }
                              >
                                {
                                  optionsItem[
                                    item.optionsProps?.label || "label"
                                  ]
                                }
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                  );
                case "radio":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        key={index}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <Radio.Group optionType="button" buttonStyle="solid">
                          {item.options?.map(
                            (optionsItem: any, optionsIndex: number) => {
                              return (
                                <Radio.Button
                                  key={optionsIndex}
                                  value={
                                    optionsItem[
                                      item.optionsProps?.value || "value"
                                    ]
                                  }
                                >
                                  {
                                    optionsItem[
                                      item.optionsProps?.label || "label"
                                    ]
                                  }
                                </Radio.Button>
                              );
                            }
                          )}
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  );
                case "checkbox":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        key={index}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <Checkbox.Group
                          onChange={(e: any) => {
                            item.onChange && item.onChange(e);
                          }}
                        >
                          {item.options?.map(
                            (optionsItem: any, optionsIndex: number) => {
                              return (
                                <Checkbox
                                  key={optionsIndex}
                                  value={
                                    optionsItem[
                                      item.optionsProps?.value || "value"
                                    ]
                                  }
                                >
                                  {
                                    optionsItem[
                                      item.optionsProps?.label || "label"
                                    ]
                                  }
                                </Checkbox>
                              );
                            }
                          )}
                        </Checkbox.Group>
                      </Form.Item>
                    </Col>
                  );
                case "date":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <DatePicker
                          showTime={item.showTime}
                          style={{ width: "100%" }}
                          placeholder={
                            item.placeholder || `请选择${item.label}.`
                          }
                        />
                      </Form.Item>
                    </Col>
                  );
                case "dateRange":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <RangePicker
                          picker={item.pickerType || "date"}
                          showTime={{ format: "HH:mm" }}
                          format="YYYY-MM-DD HH:mm"
                        />
                      </Form.Item>
                    </Col>
                  );
                case "time":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                    </Col>
                  );
                case "image":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <JImage maxCount={item.maxCount || 1} />
                      </Form.Item>
                    </Col>
                  );
                case "cascader":
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        <Cascader
                          options={item.options}
                          fieldNames={item.optionsProps}
                          placeholder={
                            item.placeholder || `请选择${item.label}.`
                          }
                        />
                      </Form.Item>
                    </Col>
                  );
                default:
                  return (
                    <Col key={index} span={24 / (item.columns || columns)}>
                      <Form.Item
                        labelCol={item.labelCol || labelCol}
                        wrapperCol={item.wrapperCol || wrapperCol}
                        key={index}
                        name={item.key}
                        label={item.label}
                        rules={item.rules || []}
                      >
                        {item.slot?.()}
                      </Form.Item>
                    </Col>
                  );
              }
            })}
        </Row>
      </Form>
    ),
  };
};

const JForm = (config: JFormProps): [FormInstance, React.ReactNode] => {
  const { ref, dom }: { ref: FormInstance; dom: React.ReactNode } =
    initForm(config);
  return [ref, dom];
};

export default JForm;
