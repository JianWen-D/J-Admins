import { useEffect, useMemo, useState } from "react";
import { message, Modal } from "antd";
import { JFormItemProps } from "../../Base/Form/index.d";
import JForm from "../../Base/Form";
import { JColumnsOptions } from "../types";
import useColumn, { ColumnType } from "../../tools";
import { useForm } from "antd/es/form/Form";

interface JEditProps<T> {
  title?: string;
  width?: number;
  options: JColumnsOptions<T>[];
  id?: string;
  children?: React.ReactElement;
  onSubmit?: (data: any) => void;
  onBtnClick?: () => void;
  loadDataApi?: any;
  saveRequest?: any;
  initValues?: any;
}

const JEdit = <T,>(props: JEditProps<T>) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [form] = useForm<T>();

  // 搜索框配置
  const editOptions: JFormItemProps[] = useColumn<T, ColumnType.Form>(
    props.options,
    ColumnType.Form
  );

  useEffect(() => {
    visible &&
      form.setFieldsValue({
        ...(props.initValues || {}),
        ...data,
      });
  }, [data, form, props.initValues, visible]);

  const handleSubmit = () => {
    form.validateFields().then((res) => {
      if (props.saveRequest) {
        handleSave({
          ...data,
          ...res,
        });
      } else {
        props.onSubmit &&
          props.onSubmit({
            ...data,
            ...res,
          });
      }
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

  const handleSave = async (params: T) => {
    const result = await props.saveRequest(params);
    if (result.code === "0") {
      message.success("保存成功");
      props.onSubmit && props.onSubmit(result.data);
    } else {
      message.error(result.msg || "保存失败");
    }
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
        maskClosable={false}
        width={props.width || 1000}
        title={props.title || "-"}
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
        <JForm<T> form={form} options={editOptions} initValue={data}></JForm>
      </Modal>
    </>
  );
};

export default JEdit;
