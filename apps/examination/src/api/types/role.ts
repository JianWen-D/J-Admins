import { BaseApiProps, BasePageProps } from "../../types/common";
import request from "../index";

export interface RoleProps extends BaseApiProps {
  name: string; // 角色名
  remark: string; // 备注
  associatedNum?: number; // 性别
  applicationName: string; // 身份证
  applicationId: string; // 账号
}
export interface RoleMenuProps extends BaseApiProps {
  icon: string; // 角色名
  name: string; // 备注
  parentId?: string; // 性别
  applicationId: string; // 身份证
  roleId: string; // 账号
  permissionId: string; // 账号
  authList: string; // 账号
  auths: string; // 账号
  sortNum: string; // 账号
  remark: string; // 账号
  path: string; // 账号
  applicationPath: string; // 账号
  children: RoleMenuProps[];
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

/**
 * 查询角色菜单列表
 * @param id
 * @returns
 */
export const getRoleMenuListById = (id: string) => {
  return request.get<RoleMenuProps[]>({
    url: `/base-service/role/getMenuTree/${id}`,
    params: {},
  });
};

/**
 * 创建
 * @param params
 * @returns
 */
export const getMenuListByApplicationId = (id: string) => {
  return request.get<RoleMenuProps[]>({
    url: `/base-service/role/getMenuListByApplicationId/${id}`,
    params: {},
  });
};
/**
 * 创建
 * @param params
 * @returns
 */
export const getRoleMenuById = (id: string) => {
  return request.get<RoleMenuProps>({
    url: `/base-service/role/menu/${id}`,
    params: {},
  });
};
/**
 * 创建
 * @param params
 * @returns
 */
export const createRoleMenu = (params: any) => {
  return request.post<RoleMenuProps>({
    url: `/base-service/role/menu`,
    params: params,
  });
};

/**
 * 更新
 * @param params
 * @returns
 */
export const updateRoleMenu = (params: any) => {
  return request.put<RoleMenuProps>({
    url: `/base-service/role/menu/${params.id}`,
    params: params,
  });
};

/**
 * 删除
 * @param params
 * @returns
 */
export const deletedRoleMenu = (id: string) => {
  return request.delete<RoleMenuProps>({
    url: `/base-service/role/menu/${id}`,
    params: {},
  });
};

/**
 * 获取该角色的所有用户id，用作选择
 * @param params
 * @returns
 */
export const getUserIdsByRoleId = (id: string) => {
  return request.get<string[]>({
    url: `/base-service/role/getUserListByRoleId/${id}`,
    params: {},
  });
};
