import { Pagination, Table } from "antd";
import Style from "./index.module.less";
import { JFormItemProps } from "../Form/types";
import { useMemo } from "react";
import { ColumnProps } from "antd/es/table";
import JReview from "../Review";
import { useSelector } from "react-redux";
import { TableRowSelection } from "antd/es/table/interface";

interface JTableProps {
  data: any[];
  columns: JFormItemProps[];
  showPage?: boolean;
  pageNum?: number;
  pageSize?: number;
  pageTotal?: number;
  onPageChange?: (pageNum: number, pageSize: number) => void;
  operationWidth?: number;
  operation?: (text: any, record: any) => React.ReactNode;
  rowSelection?: TableRowSelection<any>;
}
const JTable = (props: JTableProps) => {
  const loading = useSelector((state: any) => state.CommonReducer.loading);
  const tableColumns: ColumnProps<any>[] = useMemo(() => {
    const formatColumns = props.columns
      .filter((item) => item.show)
      .map((item) => ({
        title: item.label,
        dataIndex: item.key,
        key: item.key,
        width: item.width || 160,
        render: item.render
          ? item.render
          : (value: any) => (
              <JReview
                type={item.type}
                data={value}
                format={item.format}
                options={item.options}
                props={item.optionsProps}
                color={item.color}
                mode={item.mode}
              ></JReview>
            ),
      }));
    if (props.operation) {
      return [
        ...formatColumns,
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          fixed: "right",
          width: props.operationWidth || 300,
          align: "center",
          render: (text: any, record: any) => {
            return props.operation && props.operation(text, record);
          },
        },
      ];
    }
    return formatColumns;
  }, [props]);

  return (
    <div className={Style.JTable}>
      <Table
        dataSource={props.data}
        columns={tableColumns}
        loading={loading}
        pagination={false}
        scroll={{
          x: "100%",
        }}
        rowKey={"id"}
        rowSelection={props.rowSelection || undefined}
      />
      <div className={Style.JTablePagination}>
        <Pagination
          total={props.pageTotal || 0}
          showTotal={(total) => `共 ${total} 条数据`}
          defaultPageSize={props.pageSize || 10}
          defaultCurrent={props.pageNum || 1}
          showQuickJumper
          pageSizeOptions={[10, 20, 50, 100, 200, 500]}
          onChange={(page, pageSize) => {
            props.onPageChange && props.onPageChange(page, pageSize);
          }}
          onShowSizeChange={(current, size) => {
            props.onPageChange && props?.onPageChange(current, size);
          }}
        />
      </div>
    </div>
  );
};

export default JTable;
