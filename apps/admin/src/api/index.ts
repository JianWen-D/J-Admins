import { message } from "antd";
import config from "../config";
import JAxios from "@devin/utils/request";
import { handleLoadingChange } from "../store/reducers/common";
import store from "../store";

export interface responseType<T> {
  code: number;
  data: T;
  msg: string | undefined;
}

const request = new JAxios({
  baseURL: config.API_HOST,
  timeout: 60000, // 1分钟
  isNeedToken: true, // 需要token
  noPermissionCode: 401,
  loading: true,
  loadingCallback: (loading: boolean) => {
    store.dispatch(handleLoadingChange(loading));
  },
  // refreshRequet: () => {
  // request
  //   .get<responseType<string>>({
  //     url: "/refreshToken",
  //   })
  //   .then((res) => {
  //     request.setToken(res.data);
  //     callback();
  //   });
  // },
  handleAfterResponse: (response) => {
    if (response.status === 401) {
      request.clearToken();
      window.location.reload();
    }
    return response;
  },
  retryConfig: {
    wait: 2000,
    count: 3,
  },
  tokenPrefix: config.APP_NAME,
  showMessage: (msg) => {
    message.destroy();
    message.error(msg);
  },
});

export default request;
