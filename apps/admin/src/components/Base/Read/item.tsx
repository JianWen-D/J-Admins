import { Badge, Image, Tag } from "antd";
import dayjs from "dayjs";
import { isNil } from "lodash";
import { useMemo } from "react";
import JIcon from "../Icon";
import { JFormItemProps, JFormItemType } from "../Form/types";

export interface JReadItemProps
  extends JFormItemType,
    Pick<
      JFormItemProps,
      "options" | "optionsProps" | "mode" | "key" | "label" | "columnsNum"
    > {
  value: any;
  timeFormat?: string;
  color?:
    | {
        [key: string | number]: string;
      }
    | string;
}

const JReadItem = (props: JReadItemProps) => {
  const formatDom = useMemo(() => {
    // 空值的时候直接返回
    if (isNil(props.value)) {
      return props.value || "-";
    }
    // 图标
    if (["icon"].includes(props.type) && props.value) {
      return <JIcon name={props.value} />;
    }
    // 图片
    if (["image"].includes(props.type)) {
      return <Image width={36} src={props.value} />;
    }
    // 日期
    if (["date"].includes(props.type)) {
      return dayjs(props.value).format(
        props.timeFormat || "YYYY-MM-DD HH:mm:ss"
      );
    }
    // 时间
    if (["time"].includes(props.type)) {
      return dayjs(props.value).format(props.timeFormat || "HH:mm");
    }
    // 日期/时间范围
    if (["dateRange"].includes(props.type)) {
      return `${dayjs(props.value[0]).format(
        props.timeFormat || "YYYY-MM-DD HH:mm:ss"
      )} - ${dayjs(props.value[1]).format(
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
        (item) => item[props.optionsProps?.value as string] === props.value
      );
      if (findData) {
        return props.color && props.color[props.value] ? (
          <Badge
            color={props.color && props.color[props.value]}
            status="default"
            text={findData[props.optionsProps?.label as string]}
          />
        ) : (
          findData[props.optionsProps?.label as string]
        );
      }
      return props.value;
    }
    // 多选
    if (
      ["select", "checkbox"].includes(props.type) &&
      Array.isArray(props.options)
    ) {
      return props.value.reduce((prev: any, next: any) => {
        const findData = props.options?.find(
          (item) => item[props.optionsProps?.value as string] === next
        );
        if (!(findData && findData[props.optionsProps?.label as string])) {
          return prev;
        }
        return [
          ...prev,
          <Tag color={props.color && props.color[next]}>
            {(findData && findData[props.optionsProps?.label as string]) ||
              next}
          </Tag>,
        ];
      }, []);
    }
    return props.value || "-";
  }, [props]);

  return formatDom;
};

export default JReadItem;
