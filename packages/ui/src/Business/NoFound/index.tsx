import { Button, Result } from "antd";

const JNoFound = (props: { hiden?: boolean }) => {
  if (props.hiden) {
    console.log("hiden");
    return null;
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，该页面不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            window.history.go(-1);
          }}
        >
          返回上一页
        </Button>
      }
    />
  );
};

export default JNoFound;
