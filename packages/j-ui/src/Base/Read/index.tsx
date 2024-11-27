import { Descriptions } from "antd";
import { useMemo } from "react";
import JReadItem from "./item";
import { DescriptionsItemType } from "antd/es/descriptions";
import { JFormItemProps } from "../Form/types";

interface JReadProps {
  title?: string;
  options: JFormItemProps[];
  data: any;
}

const JRead = (props: JReadProps) => {
  const { data = {} } = props;
  const options: DescriptionsItemType[] = useMemo(() => {
    return props.options.map((item) => {
      return {
        key: item.key,
        label: item.label,
        children: (
          <JReadItem
            type={item.type}
            value={data[item.key]}
            label={item.label}
            key={item.key}
            timeFormat={item.timeFormat}
            options={item.options}
            optionsProps={item.optionsProps}
            color={item.color}
            mode={item.mode}
          ></JReadItem>
        ),
        span: item.columnsNum ? item.columnsNum / 8 : 1,
      };
    });
  }, [data, props.options]);
  return (
    <Descriptions bordered title={props.title} size="small" items={options} />
  );
};

export default JRead;
