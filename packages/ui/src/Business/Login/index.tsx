import { useEffect, useState } from "react";
import JForm from "./../../Base/Form";
import { JFormItemProps } from "./../../Base/Form/index.d";
import { Button, Checkbox, Col, Form, Row } from "antd";
import styles from "./index.module.less";
import { useForm } from "antd/es/form/Form";

interface FormDataProps {
  username: string;
  password: string;
  remember: boolean;
}

interface JLoginProps {
  loading: boolean;
  title: string;
  applicationName?: string;
  logoSrc?: string | null;
  onSubmit?: (data: FormDataProps) => void;
  onForget?: () => void;
}

const JLogin = (props: JLoginProps) => {
  const {
    loading = false,
    applicationName = "",
    title = "",
    logoSrc = "",
    onSubmit = () => {},
    onForget = () => {},
  } = props;
  const [remember, setRemember] = useState<boolean>(
    localStorage.getItem(`${applicationName}_account`.toLocaleUpperCase())
      ? true
      : false
  );
  const [form] = useForm();

  const options: JFormItemProps[] = [
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
    },
    {
      label: "",
      key: "ctrl",
      type: "slot",
      render: () => {
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
    },
  ];

  useEffect(() => {
    if (remember) {
      if (
        localStorage.getItem(
          `${applicationName}_account`.toLocaleUpperCase()
        ) as string
      ) {
        const account = JSON.parse(
          localStorage.getItem(
            `${applicationName}_account`.toLocaleUpperCase()
          ) as string
        );
        form.setFieldsValue({
          username: account.username,
          password: account.password,
        });
      }
    }
  }, [applicationName, form, remember]);

  // 登录
  const handleLogin = () => {
    form.validateFields().then((values: FormDataProps) => {
      onSubmit({
        ...values,
        remember,
      });
    });
  };
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        {logoSrc && (
          <div className={styles.logo}>
            <img src={logoSrc} alt="" />
          </div>
        )}
        {title && <div className={styles.title}>{title}</div>}
        <JForm
          form={form}
          options={options}
          defalutColumnsNum={24}
          wrapperCol={{
            span: 24,
          }}
        ></JForm>
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
