// import { RouteTypesList } from '../types/config';
export const getAllRouterList = (list: any[]) => {
  return list.reduce((prev: any, next: any) => {
    if (next.routes) {
      return [
        ...prev,
        ...next.routes.map((item: any) => ({
          ...item,
          parentPath: next.path,
        })),
      ];
    }
    return [...prev, next];
  }, []);
};

/**
 * 过去对象中的空数值
 * @param data 对象
 * @returns
 */
export const filterInvalidData = (data: any) => {
  return Object.keys(data).reduce((prev: object, next: string) => {
    if (data[next] === undefined || data[next] === null || data[next] === "") {
      return prev;
    }
    return {
      ...prev,
      [next]: data[next],
    };
  }, {});
};
