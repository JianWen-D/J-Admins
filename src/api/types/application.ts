import { BasePageProps } from "../../types/common";
import request from "../index";

export interface ApplicationProps {
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
