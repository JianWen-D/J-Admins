import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import "./index.css";
import { AppProviders } from "./context/index.tsx";
import config from "./config/index.ts";
import renderWithQiankun, {
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";
import "./public-path.js";
import request from "./api/index.ts";
import App from "./App.tsx";

let root: any = null;
// 判断当前环境状态
const miniProgram = qiankunWindow.__POWERED_BY_QIANKUN__;

// 根目录加载方法
const render = (props: any) => {
  const { container } = props;
  // 获取路由信息
  // 存储token
  if (props.token) {
    request.setToken(props.token);
  }
  root =
    root ||
    ReactDOM.createRoot(
      container
        ? container.querySelector("#root")
        : document.getElementById("root")!
    );
  root.render(
    // <BrowserRouter>
    <Provider store={store}>
      <AppProviders auth={props.auth} userInfo={props.userInfo}>
        {/* <KeepAliveLayout keepPaths={[]}> */}
        {/* </KeepAliveLayout> */}
        <App></App>
        {/* 123123 */}
      </AppProviders>
    </Provider>
    // </BrowserRouter>
  );
};

// 不在乾坤环境中
if (!miniProgram) {
  render({});
}

// 在乾坤环境中
if (miniProgram) {
  console.log(`${config.APP_NAME} run in mini program`);
  // some code
  renderWithQiankun({
    mount(props) {
      console.log(`${config.APP_NAME} app is mount`, props);
      render(props);
    },
    bootstrap() {
      console.log(`${config.APP_NAME} app is bootstraped`);
    },
    update() {
      console.log(`${config.APP_NAME} app is update`);
    },
    unmount() {
      console.log(`${config.APP_NAME} app is unmount`);
      root.unmount();
      root = null;
    },
  });
}
