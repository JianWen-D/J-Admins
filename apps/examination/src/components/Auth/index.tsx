import { JNoFound } from "@devin/ui";
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";

interface JAuthProps {
  authKey: string;
  type: "page" | "element" | "api";
  children?: React.ReactElement;
  auth: {
    page: string[];
    api: string[];
    element: string[];
  };
}

const JAuth = (props: JAuthProps) => {
  const { auth } = props;
  const { authKey, type, children = <></> } = props;
  // 判断当前api权限
  if (type === "api") {
    return auth[type].find((item: string) => item === authKey);
  }
  // 判断页面和元素权限
  if (!authKey) {
    return <JNoFound />;
  }
  if (type === "page") {
    return auth[type].find((item: string) => authKey.includes(item)) ? (
      children
    ) : (
      <JNoFound hiden={qiankunWindow.__POWERED_BY_QIANKUN__} />
    );
  }
  return auth[type].find((item: string) => item === authKey) ? (
    children
  ) : (
    <JNoFound />
  );
};

export default JAuth;
