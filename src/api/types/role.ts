import { BaseApiProps, BasePageProps } from "../../types/common";
import request from "../index";

export interface RoleProps extends BaseApiProps {
  name: string; // 角色名
  remark: string; // 备注
  associatedNum?: number; // 性别
  applicationName: string; // 身份证
  applicationId: string; // 账号
}

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getRolePage = (params: any) => {
  const { pageNum = 1, pageSize = 10, ...otherParams } = params;
  return request.post<BasePageProps<RoleProps>>({
    url: `/base-service/role/page?pageSize=${pageSize}&pageNum=${pageNum}`,
    params: otherParams,
  });
};

/**
 * 根据ID获取信息
 * @param id
 * @returns
 */
export const getRoleById = (id: string) => {
  return request.get<RoleProps>({
    url: `/base-service/role/getInfo/${id}`,
    params: {},
  });
};

/**
 * 创建
 * @param params
 * @returns
 */
export const createRole = (params: any) => {
  return request.post<RoleProps>({
    url: `/base-service/role`,
    params: params,
  });
};

/**
 * 更新
 * @param params
 * @returns
 */
export const updateRole = (params: any) => {
  return request.put<RoleProps>({
    url: `/base-service/role/${params.id}`,
    params: params,
  });
};

/**
 * 删除
 * @param params
 * @returns
 */
export const deletedRole = (id: string) => {
  return request.delete<RoleProps>({
    url: `/base-service/role/${id}`,
    params: {},
  });
};
