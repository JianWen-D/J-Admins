import { useState } from "react";
import { JFormItemProps } from "../Form/types";
import { Descriptions, message, Modal, type DescriptionsProps } from "antd";
import JReview from "../Review";

interface JCheckProps {
  titleKey: string;
  width?: number;
  options: JFormItemProps[];
  id?: string;
  children?: React.ReactElement;
  loadDataApi?: any;
}

const JCheck = (props: JCheckProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<{
    [key: string]: any;
  }>({});
  const options = (data: {
    [key: string]: any;
  }): DescriptionsProps["items"] => {
    return props.options
      .filter((item) => item.show)
      .map((item) => ({
        key: item.key,
        label: item.label,
        children: (
          <JReview
            type={item.type}
            data={data[item.key]}
            format={item.format}
            options={item.options}
            props={item.optionsProps}
            color={item.color}
            mode={item.mode}
          ></JReview>
        ),
      }));
  };

  const handleClick = async (callback: () => void) => {
    if (props.loadDataApi && props.id) {
      const result = await props.loadDataApi(props.id);
      if (result.code === "0") {
        setData(result.data);
        callback();
      } else {
        message.error(result.msg || "获取信息失败");
      }
      return;
    }
    callback();
  };

  return (
    <>
      <div
        style={{ display: "inline-block" }}
        onClick={() => {
          handleClick(() => {
            setVisible(true);
          });
        }}
      >
        {props.children}
      </div>
      <Modal
        width={props.width || 1000}
        title={props.titleKey ? data[props.titleKey] || "-" : "-"}
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        destroyOnClose
        footer={false}
        closable={false}
      >
        <Descriptions bordered items={options(data)} />
      </Modal>
    </>
  );
};

export default JCheck;
