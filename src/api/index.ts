import { message } from "antd";
import config from "../config";
import JAxios from "../utils/request";
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
  refreshRequet: (callback) => {
    // request
    //   .get<responseType<string>>({
    //     url: "/refreshToken",
    //   })
    //   .then((res) => {
    //     request.setToken(res.data);
    //     callback();
    //   });
  },
  handleAfterResponse: (response) => {
    if (response.data.code === "401") {
      message.error("登录过期，请重新登录");
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
});

export default request;
