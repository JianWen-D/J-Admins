export interface JFormProps {
  options: JFormItemProps[];
  columns?: number;
  labelCol?: {
    span: number;
  };
  wrapperCol?: {
    span: number;
  };
}

export interface JFormItemProps {
  type:
    | "input" // 输入框
    | "password" // 密码
    | "textarea" // 文本框
    | "number" // 数字
    | "select" // 选择框
    | "radio" // 单选框
    | "checkbox" // 多选
    | "date" // 日期选择
    | "dateRange" // 日期范围选择
    | "time" // 时间选择
    | "image" // 图片
    | "cascader" // 层级选择
    | "icon" // 图标
    | "slot"; // 自定义
  columns?: number; // 布局
  // 文本宽度
  labelCol?: {
    span: number;
  };
  // 内容宽度
  wrapperCol?: {
    span: number;
  };
  // key
  key: string;
  // label
  label: string;
  // 校验规则
  rules?: any[];
  // 最大长度
  maxLength?: number;
  // 输入类型
  inputType?: string;
  // 占位文本
  placeholder?: string;
  // 键盘
  onKeyUp?: (e: { keyCode: number }) => void;
  // 数据源： select，radio，checkbox
  options?: any[];
  // 数据源匹配真的字段
  optionsProps?: {
    value: string;
    label: string;
    children?: string;
  };
  // 自定一内容
  slot?: () => React.ReactNode;
  // 是否禁用
  disabled?: boolean;
  // 内容变动回调方法
  onChange?: (val: string | number | boolean) => void;
  // 是否编辑
  edit?: boolean;
  // 是否展示
  show?: boolean;
  // 展示时间
  showTime?: boolean;
  maxCount?: number;
  width?: number;
  pickerType?: "date" | "week" | "month" | "quarter" | "year";
  format?: string;
  color?: {
    [key: string | number]: string;
  };
  mode?: "multiple" | undefined;
  groupId?: string;
  accept?: string[];
  render?: (text: string, record: any, index: number) => React.ReactElement;
}
