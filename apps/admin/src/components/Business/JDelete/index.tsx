import React from "react";
import { message, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

interface JDeleteProps {
  id: string;
  request: any;
  children: React.ReactElement;
  onSuccess?: () => void;
}

const JDelete = (props: JDeleteProps) => {
  const handleDeleted = async () => {
    confirm({
      title: "确定删除该条信息?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        return new Promise((resolve, reject) => {
          props
            .request(props.id)
            .then((result: { code: string; msg: string }) => {
              if (result.code === "0") {
                message.success("删除成功");
                props.onSuccess && props.onSuccess();
                resolve(true);
              } else {
                message.error(result.msg || "删除失败");
                reject();
              }
            });
        }).catch(() => message.error("删除失败"));
      },
    });
  };

  return React.cloneElement(props.children, {
    onClick: () => {
      handleDeleted();
    },
  });
};

export default JDelete;
