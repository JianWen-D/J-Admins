import { BaseApiProps, BasePageProps } from "../../types/common";
import request from "../index";

export interface DictProps extends BaseApiProps {
  dictName: string; // 字典名
  dictCode: string; // 字典值
  remark: string; // 字典值
}

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getDictPage = (params: any) => {
  const { pageNum = 1, pageSize = 10, ...otherParams } = params;
  return request.post<BasePageProps<DictProps>>({
    url: `/base-service/dict/page?pageSize=${pageSize}&pageNum=${pageNum}`,
    params: otherParams,
  });
};

/**
 * 根据ID获取信息
 * @param id
 * @returns
 */
export const getDictById = (id: string) => {
  return request.get<DictProps>({
    url: `/base-service/dict/getInfo/${id}`,
    params: {},
  });
};

/**
 * 创建
 * @param params
 * @returns
 */
export const createDict = (params: any) => {
  return request.post<DictProps>({
    url: `/base-service/dict`,
    params: params,
  });
};

/**
 * 更新
 * @param params
 * @returns
 */
export const updateDict = (params: any) => {
  return request.put<DictProps>({
    url: `/base-service/dict/${params.id}`,
    params: params,
  });
};

/**
 * 删除
 * @param params
 * @returns
 */
export const deletedDict = (id: string) => {
  return request.delete<DictProps>({
    url: `/base-service/dict/${id}`,
    params: {},
  });
};

/**
 * 获取字典列表
 * @param params
 * @returns
 */
export const getDictList = (codeList: string[]) => {
  return request.post<{
    [keys: string]: DictProps[];
  }>({
    url: `/base-service/dict/childList`,
    params: codeList,
  });
};
