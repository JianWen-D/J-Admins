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
import type { JFormItemProps, JFormProps } from "./index.d";
import JImage from "../Image";
import JIconSelect from "../../Business/IconSelect/index";

const { RangePicker } = DatePicker;

const JForm = <T,>(props: JFormProps<T>) => {
  const [form] = props.form ? [props.form] : Form.useForm<T>();
  const {
    labelCol = { span: 6 },
    wrapperCol = { span: 18 },
    options = [],
    defalutColumnsNum = 8,
  } = props;
  return (
    <Form
      form={form}
      labelCol={labelCol ?? { span: 8 }}
      wrapperCol={wrapperCol ?? { span: 16 }}
      autoComplete="off"
      initialValues={props.initValue || {}}
    >
      <Row gutter={12}>
        {options.map((item: JFormItemProps) => {
          return (
            <Col key={item.key} span={item.columnsNum || defalutColumnsNum}>
              <Form.Item
                labelCol={item.labelCol || labelCol}
                wrapperCol={item.wrapperCol || wrapperCol}
                name={item.key}
                label={item.label}
                rules={item.rules || []}
              >
                {item.type === "input" && (
                  <Input
                    maxLength={item.maxLength || 200}
                    type={item.inputType || "text"}
                    placeholder={item.placeholder || `请输入${item.label}.`}
                    onKeyUp={item.onKeyUp}
                    allowClear
                  />
                )}
                {item.type === "password" && (
                  <Input.Password
                    maxLength={item.maxLength || 200}
                    placeholder={item.placeholder || `请输入${item.label}.`}
                    onKeyUp={item.onKeyUp}
                    allowClear
                  />
                )}
                {item.type === "textarea" && (
                  <Input.TextArea
                    showCount={item.maxLength ? true : false}
                    maxLength={item.maxLength || 200}
                    placeholder={item.placeholder || `请输入${item.label}.`}
                    onKeyUp={item.onKeyUp}
                    allowClear
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                )}
                {item.type === "number" && (
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    controls={false}
                    placeholder={item.placeholder || `请输入${item.label}.`}
                  />
                )}
                {item.type === "select" && (
                  <Select
                    style={{ width: "100%" }}
                    disabled={item.disabled}
                    placeholder={item.placeholder || `请选择${item.label}.`}
                    onChange={(value) => {
                      form.setFieldValue(
                        item.key,
                        value || (item.mode === "multiple" ? [] : "")
                      );
                      item?.onChange && item.onChange(value);
                    }}
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    showSearch
                    allowClear
                    optionRender={item.selectOptionRender}
                    options={item.options}
                    fieldNames={item.optionsProps}
                    mode={item.mode}
                  ></Select>
                )}
                {item.type === "radio" && (
                  <Radio.Group optionType="button" buttonStyle="solid">
                    {item.options?.map(
                      (optionsItem: any, optionsIndex: number) => {
                        return (
                          <Radio.Button
                            key={optionsIndex}
                            value={
                              optionsItem[item.optionsProps?.value || "value"]
                            }
                          >
                            {optionsItem[item.optionsProps?.label || "label"]}
                          </Radio.Button>
                        );
                      }
                    )}
                  </Radio.Group>
                )}
                {item.type === "checkbox" && (
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
                              optionsItem[item.optionsProps?.value || "value"]
                            }
                          >
                            {optionsItem[item.optionsProps?.label || "label"]}
                          </Checkbox>
                        );
                      }
                    )}
                  </Checkbox.Group>
                )}
                {item.type === "date" && (
                  <DatePicker
                    showTime={item.showTime}
                    style={{ width: "100%" }}
                    placeholder={item.placeholder || `请选择${item.label}.`}
                  />
                )}
                {item.type === "dateRange" && (
                  <RangePicker
                    picker={item.pickerType || "date"}
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                  />
                )}
                {item.type === "time" && (
                  <TimePicker format={item.timeFormat || "HH:mm"} />
                )}
                {item.type === "image" && (
                  <JImage
                    groupId={item.fileGroupId}
                    maxCount={item.maxUploadCount || 1}
                    accept={item.accept}
                    uploadApi={item.uploadApi}
                  />
                )}
                {item.type === "cascader" && (
                  <Cascader
                    options={item.options}
                    fieldNames={item.optionsProps}
                    placeholder={item.placeholder || `请选择${item.label}.`}
                  />
                )}
                {item.type === "icon" && <JIconSelect />}
                {item.type === "slot" && item.render?.()}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
};

export default JForm;
