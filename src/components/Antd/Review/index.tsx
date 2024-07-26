import { Badge, Tag } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

interface JReviewProps {
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
    | "color" // 颜色选择
    | "cascader" // 层级选择
    | "slot"; // 自定义
  data: any;
  format?: string;
  options?: any[];
  props?: {
    value: string;
    label: string;
  };
  color?: {
    [key: string | number]: string;
  };
  mode?: "multiple" | undefined;
}

const JReview = (props: JReviewProps) => {
  const formatType = useMemo(() => {
    // 日期
    if (["date"].includes(props.type)) {
      return dayjs(props.data).format(props.format || "YYYY-MM-DD HH:mm:ss");
    }
    // 时间
    if (["time"].includes(props.type)) {
      return dayjs(props.data).format(props.format || "HH:mm");
    }
    // 日期/时间范围
    if (["dateRange"].includes(props.type)) {
      return `${dayjs(props.data[0]).format(
        props.format || "YYYY/MM/DD HH:mm:ss"
      )} - ${dayjs(props.data[1]).format(
        props.format || "YYYY/MM/DD HH:mm:ss"
      )}`;
    }
    if (
      ["radio", "select"].includes(props.type) &&
      Array.isArray(props.options) &&
      !props.mode
    ) {
      const findData = props.options.find(
        (item) => item[props.props?.value as string] === props.data
      );
      if (findData) {
        return (
          <Badge
            color={props.color && props.color[props.data]}
            text={findData[props.props?.label as string]}
          />
        );
      }
      return props.data;
    }
    if (
      ["select", "checkbox"].includes(props.type) &&
      Array.isArray(props.options)
    ) {
      return props.data.reduce((prev: any, next: any) => {
        const findData = props.options?.find(
          (item) => item[props.props?.value as string] === next
        );
        return [
          ...prev,
          <Tag color={props.color && props.color[next]}>
            {(findData && findData[props.props?.label as string]) || next}
          </Tag>,
        ];
      }, []);
    }
    return props.data;
  }, [props]);

  return formatType;
};

export default JReview;
