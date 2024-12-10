import { BaseApiProps, BasePageProps } from "../../types/common";
import request from "../index";

export interface ArchiveProps extends BaseApiProps {
  name: string;
  user: string;
  phone: string;
  idCard: string;
  email: string;
  wechatNum: string;
  areaCode: string;
  areaName: string;
  archiveType: number;
  studentNum: number;
  areaNum: number;
  teacherFullNum: number;
  teacherPartNum: number;
  channel: number;
  history: number;
  room_num: number;
  referer: number;
  isMajor: number;
}

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getArchivePage = (params: any) => {
  const { pageNum = 1, pageSize = 10, ...otherParams } = params;
  return request.post<BasePageProps<ArchiveProps>>({
    url: `/examination-service/archive/page?pageSize=${pageSize}&pageNum=${pageNum}`,
    params: otherParams,
  });
};

/**
 * 根据ID获取信息
 * @param id
 * @returns
 */
export const getArchiveById = (id: string) => {
  return request.get<ArchiveProps>({
    url: `/examination-service/archive/getInfo/${id}`,
    params: {},
  });
};

/**
 * 创建
 * @param params
 * @returns
 */
export const createArchive = (params: any) => {
  return request.post<ArchiveProps>({
    url: `/examination-service/archive`,
    params: params,
  });
};

/**
 * 更新
 * @param params
 * @returns
 */
export const updateArchive = (params: any) => {
  return request.put<ArchiveProps>({
    url: `/examination-service/archive/${params.id}`,
    params: params,
  });
};

/**
 * 删除
 * @param params
 * @returns
 */
export const deletedArchive = (id: string) => {
  return request.delete<ArchiveProps>({
    url: `/examination-service/archive/${id}`,
    params: {},
  });
};
