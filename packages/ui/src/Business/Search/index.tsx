import {
  DownOutlined,
  ReloadOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import { JFormItemProps } from "../../Base/Form/index.d";
import JForm from "../../Base/Form";
import { useForm } from "antd/es/form/Form";
import { FormInstance } from "antd";
import "./index.less";

interface JSearchProps<T> {
  options: JFormItemProps[];
  onSubmit: (params?: T) => void;
  onReload?: () => void;
  operation?: (
    form: FormInstance<T> | undefined
  ) => React.ReactElement | undefined;
}

const JSearch = <T,>(props: JSearchProps<T>) => {
  const [unfold, setUnfold] = useState<boolean>(false);
  const [form] = useForm();

  const { operation = () => <></> } = props;
  // 查询
  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      props.onSubmit(values);
    });
  };
  // 重置
  const handleReset = () => {
    form.resetFields();
    props.onSubmit();
  };
  return (
    <div className="j-search-box">
      {props.options.length > 0 && (
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
          <div className="j-search-form">
            <JForm
              form={form}
              options={props.options}
              defalutColumnsNum={6}
            ></JForm>
          </div>
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
      )}
      <div className="j-search-ctrl-second">
        <div className="j-search-ctrl-second-item">
          {operation && operation(form)}
        </div>
        <div className="j-search-ctrl-second-item">
          <Tooltip title="刷新">
            <Button
              type="text"
              icon={<ReloadOutlined />}
              onClick={() => {
                props.onReload && props.onReload();
              }}
            ></Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default JSearch;
