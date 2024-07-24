import config from "../config";
import JAxios from "../utils/request";

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
  retryConfig: {
    wait: 2000,
    count: 3,
  },
});

export default request;
