import {
  DownOutlined,
  ReloadOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Tooltip } from "antd";
import { useState } from "react";
import "./index.less";
import { JFormItemProps } from "../Form/types";
import JForm from "../Form";

interface JPageCtrlProps {
  options: JFormItemProps[];
  onSubmit: (params: any) => void;
  onReload?: () => void;
  additionButton?: React.ReactElement;
}

const JPageCtrl = (props: JPageCtrlProps) => {
  const { additionButton = <></> } = props;
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
    searchForm.validateFields().then(async (values) => {
      props.onSubmit(values);
    });
  };
  // 重置
  const handleReset = () => {
    searchForm.resetFields();
    props.onSubmit({});
  };
  return (
    <div className="j-search-box">
      <div
        className="j-search-form-box"
        style={{
          height: unfold
            ? props.options.length % 4 === 0
              ? Math.floor(props.options.length / 4 + 1) * 60
              : Math.ceil(props.options.length / 4) * 60
            : 60,
        }}
      >
        <div className="j-search-form">{searchFormDom}</div>
        <div className="j-search-form-ctrl">
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
      <div className="j-search-ctrl-second">
        <div className="j-search-ctrl-second-item">{additionButton}</div>
        <div className="j-search-ctrl-second-item">
          <Tooltip title="刷新">
            <Button
              type="text"
              icon={<ReloadOutlined />}
              onClick={() => {
                props?.onReload();
              }}
            ></Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default JPageCtrl;
