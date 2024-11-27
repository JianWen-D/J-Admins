import request from "../index";

interface fetchLoginProps {
  createdBy: string;
  createdTime: string;
  deletedBy: string;
  deletedTime: null;
  etag: string;
  fileGroupId: string;
  fileName: string;
  fileType: string;
  id: string;
  isDeleted: 0 | 1;
  path: string;
  size: number;
  status: 1 | 0;
  updatedBy: string;
  updatedTime: string;
  url: string;
}

/**
 * 文件上传
 * @param {}
 * @returns
 */
export const uploadFile = (params: any) => {
  return request.form<fetchLoginProps>({
    url: "/base-service/file/upload",
    params: params,
    config: {
      isNeedToken: false,
    },
  });
};
