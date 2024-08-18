import { BaseApiProps, BasePageProps } from "../../types/common";
import request from "../index";

export interface ApplicationProps extends BaseApiProps {
  icon: string; // 应用ICON
  name: string; // 应用名称
  appKey: string; // 应用Key
  entry: string; // 访问地址
  activeRule: string; // 匹配路由
  container: string; // 映射容器ID
  remark: string; // 备注
}

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getApplicationPage = (params: any) => {
  const { pageNum = 1, pageSize = 10, ...otherParams } = params;
  return request.post<BasePageProps<ApplicationProps>>({
    url: `/base-service/application/page?pageSize=${pageSize}&pageNum=${pageNum}`,
    params: otherParams,
  });
};

/**
 * 根据ID获取信息
 * @param id
 * @returns
 */
export const getApplicationById = (id: string) => {
  return request.get<ApplicationProps>({
    url: `/base-service/application/getInfo/${id}`,
    params: {},
  });
};

/**
 * 创建
 * @param params
 * @returns
 */
export const createApplication = (params: any) => {
  return request.post<ApplicationProps>({
    url: `/base-service/application`,
    params: params,
  });
};

/**
 * 更新
 * @param params
 * @returns
 */
export const updateApplication = (params: any) => {
  return request.put<ApplicationProps>({
    url: `/base-service/application/${params.id}`,
    params: params,
  });
};

/**
 * 删除
 * @param params
 * @returns
 */
export const deletedApplication = (id: string) => {
  return request.delete<ApplicationProps>({
    url: `/base-service/application/${id}`,
    params: {},
  });
};
