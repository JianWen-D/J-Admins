import { Badge, Image, Tag } from "antd";
import dayjs from "dayjs";
import { isNil } from "lodash";
import { useMemo } from "react";
import JIcon from "../Icon";
import { JFormItemType } from "../Form/types";

interface JReadProps extends JFormItemType {
  data: any;
  timeFormat?: string;
  options?: any[];
  optionsProps?: {
    value: string;
    label: string;
    children?: string;
  };
  color?:
    | {
        [key: string | number]: string;
      }
    | string;
  mode?: "multiple" | undefined;
}

const JRead = (props: JReadProps) => {
  const formatDom = useMemo(() => {
    // 空值的时候直接返回
    if (isNil(props.data)) {
      return props.data || "-";
    }
    // 图标
    if (["icon"].includes(props.type) && props.data) {
      return <JIcon name={props.data} />;
    }
    // 图片
    if (["image"].includes(props.type)) {
      return <Image width={36} src={props.data} />;
    }
    // 日期
    if (["date"].includes(props.type)) {
      return dayjs(props.data).format(
        props.timeFormat || "YYYY-MM-DD HH:mm:ss"
      );
    }
    // 时间
    if (["time"].includes(props.type)) {
      return dayjs(props.data).format(props.timeFormat || "HH:mm");
    }
    // 日期/时间范围
    if (["dateRange"].includes(props.type)) {
      return `${dayjs(props.data[0]).format(
        props.timeFormat || "YYYY-MM-DD HH:mm:ss"
      )} - ${dayjs(props.data[1]).format(
        props.timeFormat || "YYYY-MM-DD HH:mm:ss"
      )}`;
    }
    // 单选
    if (
      ["radio", "select"].includes(props.type) &&
      Array.isArray(props.options) &&
      !props.mode
    ) {
      const findData = props.options.find(
        (item) => item[props.optionsProps?.value as string] === props.data
      );
      if (findData) {
        return (
          <Badge
            color={props.color && props.color[props.data]}
            status="default"
            text={findData[props.optionsProps?.label as string]}
          />
        );
      }
      return props.data;
    }
    // 多选
    if (
      ["select", "checkbox"].includes(props.type) &&
      Array.isArray(props.options)
    ) {
      return props.data.reduce((prev: any, next: any) => {
        const findData = props.options?.find(
          (item) => item[props.optionsProps?.value as string] === next
        );
        return [
          ...prev,
          <Tag color={props.color && props.color[next]}>
            {(findData && findData[props.optionsProps?.label as string]) ||
              next}
          </Tag>,
        ];
      }, []);
    }
    return props.data || "-";
  }, [props]);

  return formatDom;
};

export default JRead;
