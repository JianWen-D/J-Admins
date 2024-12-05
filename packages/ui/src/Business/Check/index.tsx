import { useState } from "react";
import { message, Modal } from "antd";
import { JColumnsOptions } from "../types";
import JRead from "../../Base/Read";
import useColumn, { ColumnType } from "../../tools";

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

  const formOptions = useColumn(props.options, ColumnType.Form);

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
        <JRead options={formOptions} data={data} />
      </Modal>
    </>
  );
};

export default JCheck;
