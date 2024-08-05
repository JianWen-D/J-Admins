import request from "../index";

interface fetchLoginProps {
  username: string;
  password: string;
  appid: string;
}

interface fetchLoginResultProps {
  accessToken: string;
  expiredTime: number;
  refreshToken: string;
}

/**
 * 获取密码加密密钥
 * @param {}
 * @returns
 */
export const getPasswordKey = () => {
  return request.get<string>({
    url: "/auth-service/getPasswordKey",
    params: {},
    config: {
      isNeedToken: false,
    },
  });
};

/**
 * 应用登录
 * @param params
 * @returns
 */
export const fetchLogin = (params: fetchLoginProps) => {
  return request.post<fetchLoginResultProps>({
    url: "/auth-service/login",
    params,
    config: {
      isNeedToken: false,
    },
  });
};

/**
 * 获取用户信息
 * @param params
 * @returns
 */
export const getUserInfo = () => {
  return request.get<any>({
    url: "/auth-service/getUserInfo",
    params: {},
  });
};

/**
 * 获取当前用户可选的应用列表
 * @param params
 * @returns
 */
export const getApplicationListByUser = () => {
  return request.get<any>({
    url: "/base-service/application/getApplicationListByUser",
    params: {},
  });
};

/**
 * 获取应用信息
 * @param params
 * @returns
 */
export const getApplicationInfo = (id: string) => {
  return request.get<any>({
    url: `/auth-service/getApplicationInfo/${id}`,
    params: {},
  });
};
