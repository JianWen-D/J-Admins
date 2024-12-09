/**
 * 基础接口返回信息
 */
export interface ApiResultProps<T> {
  code: "0" | string;
  data: T;
  msg: string;
}

/**
 * 基础接口的参数
 */
export interface BaseApiProps {
  id?: string;
  createdTime?: string;
  createdBy?: string;
  updatedTime?: string;
  updatedBy?: string;
  status?: 0 | 1;
  deleted?: 0 | 1;
  deletedTime?: string;
  deletedBy?: string;
}

/**
 * 基础分页参数
 */

export interface BasePageProps<T> {
  pages: number;
  records: T[];
  total: number;
  size: number;
}
