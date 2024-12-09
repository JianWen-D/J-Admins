import { Pagination, Table } from "antd";
import Style from "./index.module.less";
import { useMemo } from "react";
import { ColumnProps } from "antd/es/table";
import { useSelector } from "react-redux";
import { JTableProps } from "./types";
import JReadItem from "../Read/item";
import { AnyObject } from "antd/es/_util/type";

const JTable = <T extends AnyObject>(props: JTableProps<T>) => {
  const loading = useSelector((state: any) => state.CommonReducer.loading);
  const tableColumns: ColumnProps<T>[] = useMemo(() => {
    const formatColumns = props.columns.map((item) => ({
      ...item,
      width: item.width || 160,
      render: item.render
        ? item.render
        : (value: any) => (
            <JReadItem
              label={item.title as string}
              key={item.dataIndex as string}
              type={item.type}
              value={value}
              timeFormat={item.timeFormat}
              options={item.options}
              optionsProps={item.optionsProps}
              color={item.color}
              mode={item.mode}
            ></JReadItem>
          ),
    }));
    return formatColumns;
  }, [props]);

  return (
    <div className={Style.JTable}>
      <Table
        dataSource={props.data}
        columns={tableColumns}
        loading={loading}
        pagination={false}
        rowKey={"id"}
        rowSelection={props.rowSelection || undefined}
        scroll={{
          x: "maxCount",
          y: props.scrollY || undefined,
        }}
        expandable={{
          defaultExpandAllRows: true,
        }}
      />
      {(props.showPage ?? true) && (
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
      )}
    </div>
  );
};

export default JTable;
