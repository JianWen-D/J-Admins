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
const miniProgram = qiankunWindow.__POWERED_BY_QIANKUN__;
const render = (props: any) => {
  const { container } = props;
  const _router = createBrowserRouter(router(miniProgram), {
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
  render({});
}

// 在乾坤环境中
if (miniProgram) {
  console.log(`mini program`);
  // some code
  renderWithQiankun({
    mount(props) {
      console.log("[react18] props from main framework", props);
      render(props);
    },
    bootstrap() {
      console.log("[react18] react app bootstraped");
    },
    update() {
      console.log("[react18] react app update");
    },
    unmount() {
      console.log("unmount");
      root.unmount();
      root = null;
    },
  });
}
