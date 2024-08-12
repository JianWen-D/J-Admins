import { useMemo, useState } from "react";
import { JFormItemProps } from "../Form/types";
import { Descriptions, Modal, type DescriptionsProps } from "antd";
import JReview from "../Review";

interface JCheckProps {
  titleKey: string;
  width?: number;
  options: JFormItemProps[];
  data: any;
  children?: React.ReactElement;
}

const JCheck = (props: JCheckProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const options: DescriptionsProps["items"] = useMemo(() => {
    return props.options
      .filter((item) => item.show)
      .map((item) => ({
        key: item.key,
        label: item.label,
        children: (
          <JReview
            type={item.type}
            data={props.data[item.key]}
            format={item.format}
            options={item.options}
            props={item.optionsProps}
            color={item.color}
            mode={item.mode}
          ></JReview>
        ),
      }));
  }, [props.data, props.options]);

  return (
    <>
      <div
        style={{ display: "inline-block" }}
        onClick={() => {
          setVisible(true);
        }}
      >
        {props.children}
      </div>
      <Modal
        width={props.width || 1000}
        title={props.titleKey ? props.data[props.titleKey] || "-" : "-"}
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        destroyOnClose
        footer={false}
        closable={false}
      >
        <Descriptions bordered items={options} />
      </Modal>
    </>
  );
};

export default JCheck;
