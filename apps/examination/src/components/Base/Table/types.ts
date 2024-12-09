import { TableColumnProps } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { JFormItemType } from "../Form/types";
import { AnyObject } from "antd/es/_util/type";

export interface JTableOptions<T> extends TableColumnProps<T>, JFormItemType {
  /**
   * 时间格式
   */
  timeFormat?: string;
  options?: any[];
  optionsProps?: {
    value: string;
    label: string;
    children?: string;
  };
  color?:
    | {
        [key: string | number]: string;
      }
    | string;
  mode?: "multiple" | undefined;
  /**
   * 表格渲染栏
   */
  tableRender?: (record: T, refresh: () => void) => React.ReactNode;
}

export interface JTableProps<T extends AnyObject> {
  /**
   * 数据源
   */
  data: T[];
  /**
   * 表格列配置
   */
  columns: JTableOptions<T>[];
  /**
   * 展示分页
   */
  showPage?: boolean;
  /**
   * 页码
   */
  pageNum?: number;
  /**
   * 页数
   */
  pageSize?: number;
  /**
   * 数据总条数
   */
  pageTotal?: number;
  /**
   * 分页回调方法
   * @param pageNum 页码
   * @param pageSize 页数
   * @returns
   */
  onPageChange?: (pageNum: number, pageSize: number) => void;
  /**
   * 选择配置项
   */
  rowSelection?: TableRowSelection<any>;
  /**
   * 表格最大高度
   */
  scrollY?: number;
}
