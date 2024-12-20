import { useCommon } from "../../utils/hooks";
import JNoFound from "../Business/NoFound";

interface JAuthProps {
  authKey: string;
  type: "page" | "element" | "api";
  children?: React.ReactElement;
}

const JAuth = (props: JAuthProps) => {
  const { auth } = useCommon();
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
      <JNoFound />
    );
  }
  return auth[type].find((item: string) => item === authKey) ? (
    children
  ) : (
    <JNoFound />
  );
};

export default JAuth;
