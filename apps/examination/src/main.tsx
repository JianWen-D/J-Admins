import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import "./index.css";
import { AppProviders } from "./context/index.tsx";
import config from "./config/index.ts";
import renderWithQiankun, {
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";
import "./public-path.js";
import router from "./router/index.tsx";
import request from "./api/index.ts";
import KeepAliveLayout from "./components/Keepalive/index.tsx";

let root: any = null;
// 判断当前环境状态
const miniProgram = qiankunWindow.__POWERED_BY_QIANKUN__;
// 根目录加载方法
const render = (props: any) => {
  const { container } = props;
  // 获取路由信息
  const _router = createBrowserRouter(router, {
    basename: miniProgram ? config.MINI_PROGRAM.APP_ROUTER : "/",
  });
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
    <Provider store={store}>
      <AppProviders auth={props.auth} userInfo={props.userInfo}>
        <KeepAliveLayout keepPaths={[]}>
          <RouterProvider router={_router}></RouterProvider>
        </KeepAliveLayout>
      </AppProviders>
    </Provider>
  );
};

// 不在乾坤环境中
if (!miniProgram) {
  console.log(miniProgram)
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
