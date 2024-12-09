import { JFormItemProps } from "../Base/Form/types";
import { JTableOptions } from "../Base/Table/types";

export interface JColumnsOptions<T>
  extends Omit<JFormItemProps, "render">,
    Omit<JTableOptions<T>, "key"> {
  /**
   * 表格渲染栏
   */
  tableRender?: (record: T, refresh: () => void) => React.ReactNode;
  /**
   * 表单渲染
   */
  formRender?: (record: T, refresh: () => void) => React.ReactNode;
  /**
   * 表单排序
   */
  formSort?: number;
  /**
   * 表格排序
   */
  tableSort?: number;
  /**
   * 查看排序
   */
  checkSort?: number;
  /**
   * 搜索框中隐藏
   */
  hideInSearch?: boolean;
  /**
   * 表格中隐藏
   */
  hideInTable?: boolean;
  /**
   * 表单中隐藏
   */
  hideInForm?: boolean;
  /**
   * 查看中隐藏
   */
  hideInCheck?: boolean;
}
