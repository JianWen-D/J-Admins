import { BaseApiProps, BasePageProps } from "../../types/common";
import request from "../index";

export interface AccountProps extends BaseApiProps {
  phone: string; // 手机号
  email: string; // 邮箱
  lastLoginTime: string; // 最近登录时间
  registerTime: string; // 注册时间
  lastChangePasswordTime: string; // 最近修改密码时间
  remark: string; // 备注
  userId: string; // 用户Id
}

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getAccountPage = (params: any) => {
  const { pageNum = 1, pageSize = 10, ...otherParams } = params;
  return request.post<BasePageProps<AccountProps>>({
    url: `/base-service/account/page?pageSize=${pageSize}&pageNum=${pageNum}`,
    params: otherParams,
  });
};

/**
 * 根据ID获取信息
 * @param id
 * @returns
 */
export const getAccountById = (id: string) => {
  return request.get<AccountProps>({
    url: `/base-service/account/getInfo/${id}`,
    params: {},
  });
};

/**
 * 创建
 * @param params
 * @returns
 */
export const createAccount = (params: any) => {
  return request.post<AccountProps>({
    url: `/base-service/account`,
    params: params,
  });
};

/**
 * 更新
 * @param params
 * @returns
 */
export const updateAccount = (params: any) => {
  return request.put<AccountProps>({
    url: `/base-service/account/${params.id}`,
    params: params,
  });
};

/**
 * 删除
 * @param params
 * @returns
 */
export const deletedAccount = (id: string) => {
  return request.delete<AccountProps>({
    url: `/base-service/account/${id}`,
    params: {},
  });
};

/**
 * 修改密码
 * @param params
 * @returns
 */
export const changePassword = (
  id: string,
  params: {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }
) => {
  return request.put<AccountProps>({
    url: `/base-service/account/changePassword/${id}`,
    params,
  });
};
