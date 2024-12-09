import { BaseApiProps, BasePageProps } from "../../types/common";
import request from "../index";

export interface FileGroupProps extends BaseApiProps {
  groupName: string; // 文件组名称
  bucket: string; // bucket
  maxSize: string; // 允许文件最大size
  path: string; // 文件存放路径
  allowFileType: string; // 允许上传文件类型
}

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getFileGroupPage = (params: any) => {
  const { pageNum = 1, pageSize = 10, ...otherParams } = params;
  return request.post<BasePageProps<FileGroupProps>>({
    url: `/base-service/fileGroup/page?pageSize=${pageSize}&pageNum=${pageNum}`,
    params: otherParams,
  });
};

/**
 * 根据ID获取信息
 * @param id
 * @returns
 */
export const getFileGroupById = (id: string) => {
  return request.get<FileGroupProps>({
    url: `/base-service/fileGroup/getInfo/${id}`,
    params: {},
  });
};

/**
 * 创建
 * @param params
 * @returns
 */
export const createFileGroup = (params: any) => {
  return request.post<FileGroupProps>({
    url: `/base-service/fileGroup`,
    params: params,
  });
};

/**
 * 更新
 * @param params
 * @returns
 */
export const updateFileGroup = (params: any) => {
  return request.put<FileGroupProps>({
    url: `/base-service/fileGroup/${params.id}`,
    params: params,
  });
};

/**
 * 删除
 * @param params
 * @returns
 */
export const deletedFileGroup = (id: string) => {
  return request.delete<FileGroupProps>({
    url: `/base-service/fileGroup/${id}`,
    params: {},
  });
};
