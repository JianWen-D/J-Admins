import { isNil } from "lodash";

export interface PermissionTypes {
  id: string;
  name?: string;
  value: string;
  type?: 1 | 2;
  remark?: string;
  icon?: string | null;
  parentId: string;
  children: PermissionTypes[];
}

export const formatMenuListToTree = (list: PermissionTypes[]) => {
  // 创建一个映射，用于快速查找节点
  const map: { [key: string]: PermissionTypes } = {};
  list.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  // 遍历列表，构建树形结构
  list.forEach((item) => {
    const parentId = item.parentId;
    // 如果父ID存在，则将当前节点添加到父节点的children数组中
    if (parentId !== "" && map[parentId]) {
      map[parentId].children.push(map[item.id]);
    }
  });

  // 找出所有根节点（即没有父节点的节点）
  const roots = Object.values(map).filter((node) => node.parentId === "");

  return roots;
};

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
    if (isNil(data[next])) {
      return prev;
    }
    return {
      ...prev,
      [next]: data[next],
    };
  }, {});
};

export const flattenTreeArray = <T>(tree: T[]) => {
  const result: T[] = [];

  function flatten(node: any) {
    const { children, ...rest } = node;
    result.push(rest);
    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        flatten(children[i]);
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    flatten(tree[i]);
  }

  return result;
};
