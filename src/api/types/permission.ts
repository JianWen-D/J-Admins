import { BaseApiProps, BasePageProps } from "../../types/common";
import request from "../index";

export interface PermissionProps extends BaseApiProps {
  icon: string; // 应用ICON
  name: string; // 应用名称
  appKey: string; // 应用Key
  entry: string; // 访问地址
  activeRule: string; // 匹配路由
  container: string; // 映射容器ID
  remark: string; // 备注
  applicationId: string;
  parentId: string;
}

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getPermissionPage = (params: any) => {
  const { pageNum = 1, pageSize = 10, ...otherParams } = params;
  return request.post<BasePageProps<PermissionProps>>({
    url: `/base-service/permission/page?pageSize=${pageSize}&pageNum=${pageNum}`,
    params: otherParams,
  });
};

/**
 * 根据ID获取信息
 * @param id
 * @returns
 */
export const getPermissionById = (id: string) => {
  return request.get<PermissionProps>({
    url: `/base-service/permission/getInfo/${id}`,
    params: {},
  });
};

/**
 * 创建
 * @param params
 * @returns
 */
export const createPermission = (params: any) => {
  return request.post<PermissionProps>({
    url: `/base-service/permission`,
    params: params,
  });
};

/**
 * 更新
 * @param params
 * @returns
 */
export const updatePermission = (params: any) => {
  return request.put<PermissionProps>({
    url: `/base-service/permission/${params.id}`,
    params: params,
  });
};

/**
 * 删除
 * @param params
 * @returns
 */
export const deletedPermission = (id: string) => {
  return request.delete<PermissionProps>({
    url: `/base-service/permission/${id}`,
    params: {},
  });
};

/**
 * 查询应用的权限列表 - 树形结构，不分页
 * @param params
 * @returns
 */
export const getTreeListByApplicationId = (id: string) => {
  return request.get<PermissionProps[]>({
    url: `/base-service/permission/getTreeListByApplicationId/${id}`,
    params: {},
  });
};
/**
 * 获取某个角色的某个app权限
 * @param params
 * @returns
 */
export const getPermissionListByRoleIdAndAppId = (params: {
  roleId: string;
  applicationId: string;
}) => {
  return request.get<string[]>({
    url: `/base-service/permission/getIdListByRoleIdAndApplicationId`,
    params: params,
  });
};
