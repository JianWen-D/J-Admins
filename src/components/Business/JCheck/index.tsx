import { useState } from "react";
import { Descriptions, message, Modal, type DescriptionsProps } from "antd";
import JRead from "../../Base/Read";
import { JColumnsOptions } from "../types";

interface JCheckProps<T> {
  title?: string;
  width?: number;
  options: JColumnsOptions<T>[];
  id?: string;
  children?: React.ReactElement;
  loadDataApi?: any;
}

const JCheck = <T,>(props: JCheckProps<T>) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<{
    [key: string]: any;
  }>({});
  const options = (data: {
    [key: string]: any;
  }): DescriptionsProps["items"] => {
    return props.options
      .filter((item) => !item.hideInCheck)
      .map((item) => ({
        key: item.key,
        label: item.label,
        children: (
          <JRead
            type={item.type}
            data={data[item.key]}
            timeFormat={item.timeFormat}
            options={item.options}
            optionsProps={item.optionsProps}
            color={item.color}
            mode={item.mode}
          ></JRead>
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
        title={props.title || "查看"}
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
