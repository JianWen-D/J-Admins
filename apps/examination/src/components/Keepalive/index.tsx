/*eslint-disable */
import React, { createContext, useContext } from "react";
import { useOutlet, useLocation, matchPath } from "react-router-dom";

const keepElements: {
  [key: string]: any;
} = {};

//创建一个全局变量来存储组件，在content里面存放路径，组件，及其删除缓存的方法
export const KeepAliveContext = createContext({
  keepPaths: [],
  keepElements,
  dropByPath(path: string) {
    keepElements[path] = null;
  },
});

//keepPaths和当前路径做比较，keepPaths可以是字符串也可以是正则表达式，所以通过if else判断即可，
const isKeepPath = (keepPaths: string[], path: string) => {
  let isKeep = false;
  for (let i = 0; i < keepPaths.length; i++) {
    let item: any = keepPaths[i];
    if (item === path) {
      isKeep = true;
    }
    if (item instanceof RegExp && item.test(path)) {
      isKeep = true;
    }
    if (typeof item === "string" && item.toLowerCase() === path) {
      isKeep = true;
    }
  }
  return isKeep;
};

export function useKeepOutlet() {
  const location = useLocation();
  const element = useOutlet();

  const { keepElements } = useContext(KeepAliveContext);
  const isKeep = isKeepPath(Object.keys(keepElements), location.pathname);

  if (!isKeep) {
    keepElements[location.pathname] = element;
  }

  return (
    <>
      {/* {!isKeep && element} */}
      {Object.entries(keepElements).map(([pathname, element]) => (
        <div
          key={pathname}
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            overflow: "hidden auto",
          }}
          className="keep-alive-page"
          hidden={!matchPath(location.pathname, pathname)}
        >
          {element}
        </div>
      ))}
    </>
  );
}

const KeepAliveLayout = (props: {
  keepPaths: string[];
  children: React.ReactNode;
}) => {
  const { keepPaths, ...other } = props;
  const { keepElements, dropByPath } = useContext(KeepAliveContext);

  return (
    <KeepAliveContext.Provider
      value={{ keepPaths: keepPaths as never, keepElements, dropByPath }}
      {...other}
    />
  );
};

export default KeepAliveLayout;
