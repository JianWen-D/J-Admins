import { useEffect, useMemo, useState } from "react";
import { JFormItemProps } from "../Form/types";
import { Modal } from "antd";
import JForm from "../Form";

interface JEditProps {
  titleKey: string;
  width?: number;
  options: JFormItemProps[];
  data: any;
  children?: React.ReactElement;
  onSubmit: (data: any) => void;
}

const JEdit = (props: JEditProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const options: JFormItemProps[] = useMemo(() => {
    return props.options.filter((item) => item.edit);
  }, [props.options]);

  const [FormRef, FormDom] = JForm({
    options,
    columns: 2,
  });

  useEffect(() => {
    FormRef.setFieldsValue(props.data);
  }, [visible]);

  const handleSubmit = () => {
    FormRef.validateFields().then((res) => {
      props.onSubmit({
        ...props.data,
        ...res,
      });
      setVisible(false);
    });
  };

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
