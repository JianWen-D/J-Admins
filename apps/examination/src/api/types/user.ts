import { BaseApiProps, BasePageProps } from "../../types/common";
import request from "../index";

export interface UserProps extends BaseApiProps {
  avatar: string; // 用户头像
  nickName: string; // 用户昵称
  name: string; // 用户名
  gender: string; // 性别
  idCard: string; // 身份证
  accountId: string; // 账号
}

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getUserPage = (params: any) => {
  const { pageNum = 1, pageSize = 10, ...otherParams } = params;
  return request.post<BasePageProps<UserProps>>({
    url: `/base-service/user/page?pageSize=${pageSize}&pageNum=${pageNum}`,
    params: otherParams,
  });
};

/**
 * 根据ID获取信息
 * @param id
 * @returns
 */
export const getUserById = (id: string) => {
  return request.get<UserProps>({
    url: `/base-service/user/getInfo/${id}`,
    params: {},
  });
};

/**
 * 创建
 * @param params
 * @returns
 */
export const createUser = (params: any) => {
  return request.post<UserProps>({
    url: `/base-service/user`,
    params: params,
  });
};

/**
 * 更新
 * @param params
 * @returns
 */
export const updateUser = (params: any) => {
  return request.put<UserProps>({
    url: `/base-service/user/${params.id}`,
    params: params,
  });
};

/**
 * 删除
 * @param params
 * @returns
 */
export const deletedUser = (id: string) => {
  return request.delete<UserProps>({
    url: `/base-service/user/${id}`,
    params: {},
  });
};
