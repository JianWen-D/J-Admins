import { useEffect, useState } from "react";
import JForm from "../Antd/Form";
import { Button, Checkbox, Col, Form, Row } from "antd";
import "./index.less";

interface FormDataProps {
  username: string;
  password: string;
  remember: boolean;
}

interface JLoginProps {
  loading: boolean;
  title: string;
  applicationName?: string;
  logoSrc?: string;
  onSubmit?: (data: FormDataProps) => void;
  onForget?: () => void;
}

const JLogin = (props: JLoginProps) => {
  const {
    loading = false,
    applicationName = "",
    title = "后台管理系统",
    logoSrc = "",
    onSubmit = () => {},
    onForget = () => {},
  } = props;
  const [remember, setRemember] = useState<boolean>(
    localStorage.getItem(`${applicationName}_account`.toLocaleUpperCase())
      ? true
      : false
  );

  useEffect(() => {
    if (remember) {
      const account = JSON.parse(
        localStorage.getItem(
          `${applicationName}_account`.toLocaleUpperCase()
        ) as string
      );
      formRef.setFieldsValue({
        username: account.username,
        password: account.password,
      });
    }
  }, []);

  // 登录
  const handleLogin = () => {
    formRef.validateFields().then((values: FormDataProps) => {
      onSubmit({
        ...values,
        remember,
      });
    });
  };

  const [formRef, form] = JForm({
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 24,
    },
    options: [
      {
        label: "",
        key: "username",
        type: "input",
        placeholder: "手机号 / 邮箱",
        rules: [
          {
            message: "请输入手机号 / 邮箱. ",
            validateTrigger: "blur",
            required: true,
          },
        ],
        edit: true,
      },
      {
        label: "",
        key: "password",
        type: "password",
        placeholder: "密码",
        rules: [
          { message: "请输入密码.", validateTrigger: "blur", required: true },
        ],
        onKeyUp: (e: any) => {
          if (e.keyCode === 13) {
            handleLogin();
          }
        },
        edit: true,
      },
      {
        label: "",
        key: "ctrl",
        type: "slot",
        slot: () => {
          return (
            <Row justify="space-between" align="middle">
              <Col>
                <Form.Item noStyle>
                  <Checkbox
                    checked={remember}
                    onChange={(e) => {
                      setRemember(e.target.checked);
                    }}
                  >
                    记住账户
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item noStyle>
                  <Button
                    type="link"
                    onClick={() => {
                      onForget();
                    }}
                  >
                    忘记密码
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          );
        },
        edit: true,
      },
    ],
  });
  return (
    <div className="login-page">
      <div className="login-container">
        {logoSrc && (
          <div className="login-logo">
            <img src={logoSrc} alt="" />
          </div>
        )}
        <div className="login-title">{title}</div>
        <div className="login-form">{form}</div>
        <Button
          block
          type="primary"
          loading={loading}
          onClick={() => {
            handleLogin();
          }}
        >
          登录
        </Button>
      </div>
    </div>
  );
};

export default JLogin;
