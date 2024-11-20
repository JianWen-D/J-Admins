import { FormInstance } from "antd";
import { Rule } from "antd/es/form";

export interface JFormItemType {
  /**
   * "input": 输入框, "password": 密码, "textarea": 文本框, "number": 数字, "select": 选择框, "radio": 单选框, "checkbox": 多选, "date": 日期选择, "dateRange": 日期范围选择, "time": 时间选择, "image": 图片, "cascader": 层级选择, "icon": 图标, "slot": 自定义
   */
  type:
    | "input"
    | "password"
    | "textarea"
    | "number"
    | "select"
    | "radio"
    | "checkbox"
    | "date"
    | "dateRange"
    | "time"
    | "image"
    | "cascader"
    | "icon"
    | "slot";
}

export interface JFormProps<T> {
  /**
   * 表单实例
   */
  form?: FormInstance<T>;
  /**
   * 默认布局占位，默认值：12，最大：24，最小1
   */
  defalutColumnsNum?: number;
  /**
   * 全局文本布局
   */
  labelCol?: {
    span: number;
  };
  /**
   * 全局内容宽度
   */
  wrapperCol?: {
    span: number;
  };
  /**
   * 表单元素
   */
  options: JFormItemProps[];
  /**
   * 默认值
   */
  initValue?: T;
  /**
   * 是否只读
   */
  readonly?: boolean;
}

export interface JFormItemProps extends JFormItemType {
  /**
   * 布局
   */
  columnsNum?: number;
  /**
   * 文本布局
   */
  labelCol?: {
    span: number;
  };
  /**
   * 内容宽度
   */
  wrapperCol?: {
    span: number;
  };
  /**
   * 字段Key
   */
  key: string;
  /**
   * 字段名字
   */
  label: string;
  /**
   * 校验规则
   */
  rules?: Rule[];
  /**
   * 最大长度，适用类型：Number
   */
  maxLength?: number;
  /**
   * input框类型，适用类型：Input
   */
  inputType?: string;
  /**
   * 文本占位文本
   */
  placeholder?: string;
  /**
   * 键盘回调方法
   * @param e
   * @returns
   */
  onKeyUp?: (e: { keyCode: number }) => void;
  /**
   * 数据源： 适用类型： select，radio，checkbox，cascader
   */
  options?: any[];
  /**
   *  数据源匹配字段： 适用类型： select，radio，checkbox，cascader
   * */
  optionsProps?: {
    value: string;
    label: string;
    children?: string;
  };
  /**
   * 自定义FormItem内容
   */
  render?: () => React.ReactNode;
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 内容变化回调方法
   * @param val
   * @returns
   */
  onChange?: (val: string | number | boolean) => void;
  /**
   * 展示时间, 适用类型：date，dateRange
   */
  showTime?: boolean;
  /**
   * 最大上传数量，适用类型：Upload
   */
  maxUploadCount?: number;
  /**
   * 选择框类型，适用类型：date，dateRange
   */
  pickerType?: "date" | "week" | "month" | "quarter" | "year";
  /**
   * 时间格式，默认：YYYY-MM-DD HH:mm
   */
  timeFormat?: string;
  color?:
    | {
        [key: string | number]: string;
      }
    | string;
  /**
   * 选择类型，适用类型：Select
   */
  mode?: "multiple" | undefined;
  /**
   * 文件组ID，适用类型：Upload
   */
  fileGroupId?: string;
  /**
   * 上传文件类型，适用类型：Upload
   */
  accept?: string[];

  /**
   * 选择框child item render，适用类型：Select
   */
  selectOptionRender?: any;
  /**
   * 是否只读
   */
  readonly?: boolean;
}
