import {
  DownOutlined,
  ReloadOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import "./index.less";
import { JFormItemProps } from "../Form/types";
import JForm from "../Form";

interface JPageCtrlProps {
  options: JFormItemProps[];
  onSubmit: (params: any) => void;
}

const JPageCtrl = (props: JPageCtrlProps) => {
  const [unfold, setUnfold] = useState<boolean>(false);
  const [searchForm, searchFormDom] = JForm({
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
    columns: 4,
    options: props.options,
  });
  // 查询
  const handleSubmit = () => {
    searchForm
      .validateFields()
      .then(async (values) => {
        props.onSubmit(values);
      })
      .catch((error) => {
        // message.error('请检查必填信息');
      });
  };
  // 重置
  const handleReset = () => {
    searchForm.resetFields();
    props.onSubmit({});
  };
  return (
    <div
      className="j-search-box"
      style={{
        height: unfold
          ? props.options.length % 3 === 0
            ? (props.options.length / 3 + 1) * 56
            : "auto"
          : 56,
      }}
    >
      <div className="j-search-form">{searchFormDom}</div>
      <div className="j-search-ctrl">
        <Button
          className="j-search-ctrl-btn"
          type="primary"
          onClick={handleSubmit}
          icon={<SearchOutlined />}
        >
          查询
        </Button>
        <Button
          className="j-search-ctrl-btn"
          onClick={handleReset}
          icon={<ReloadOutlined />}
        >
          重置
        </Button>
        {props.options.length > 3 && (
          <Button
            className="j-search-ctrl-btn"
            type="link"
            onClick={() => setUnfold(!unfold)}
          >
            {unfold ? "收起" : "展开"}
            {unfold && <UpOutlined />}
            {!unfold && <DownOutlined />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default JPageCtrl;
