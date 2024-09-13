import * as Icons from "@ant-design/icons";
import { Select } from "antd";
import JIcon from "../Icon";

const JIconSelect = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const options = Object.keys(Icons).map((item) => ({
    value: item,
    label: (
      <>
        <JIcon name={item}></JIcon>
        <span style={{ marginLeft: 8 }}>{item}</span>
      </>
    ),
  }));
  return (
    <Select
      value={props.value}
      options={options}
      showSearch
      onChange={(val) => {
        props.onChange?.(val);
      }}
    ></Select>
  );
};

export default JIconSelect;
