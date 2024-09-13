import { useEffect, useMemo, useState } from "react";
import { JFormItemProps } from "../Form/types";
import { message, Modal } from "antd";
import JForm from "../Form";

interface JEditProps {
  titleKey?: string;
  title?: string;
  width?: number;
  options: JFormItemProps[];
  id?: string;
  children?: React.ReactElement;
  onSubmit: (data: any) => void;
  onBtnClick?: () => void;
  loadDataApi?: any;
  defaultData?: any;
}

const JEdit = (props: JEditProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<{
    [key: string]: any;
  }>({});
  const options: JFormItemProps[] = useMemo(() => {
    return props.options.filter((item) => item.edit);
  }, [props.options]);

  const [FormRef, FormDom] = JForm({
    options,
    columns: 2,
  });

  useEffect(() => {
    FormRef.setFieldsValue({
      ...(props.defaultData || {}),
      ...data,
    });
  }, [FormRef, data, props.defaultData, visible]);

  const handleSubmit = () => {
    FormRef.validateFields().then((res) => {
      props.onSubmit({
        ...data,
        ...res,
      });
      setVisible(false);
    });
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
          props.onBtnClick && props.onBtnClick();
          handleClick(() => {
            setVisible(true);
          });
        }}
      >
        {props.children}
      </div>
      <Modal
        width={props.width || 1000}
        title={
          props.titleKey ? data[props.titleKey] || "-" : props.title || "-"
        }
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          handleSubmit();
        }}
        destroyOnClose
        okText="保存"
        cancelText="返回"
      >
        {FormDom}
      </Modal>
    </>
  );
};

export default JEdit;
