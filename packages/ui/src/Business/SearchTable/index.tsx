import { useCallback, useMemo, useState } from "react";
import JTable from "../../Base/Table";
import JSearch from "../Search";
import { JColumnsOptions } from "../types";
import { JTableOptions, JTableProps } from "../../Base/Table/types";
import { FormInstance } from "antd";
import useColumn, { ColumnType } from "../../tools";
import { JFormItemProps } from "../../Base/Form/index.d";
import { useMount } from "ahooks";
import { AnyObject } from "antd/es/_util/type";

interface JSearchTableProps<T extends AnyObject>
  extends Omit<JTableProps<T>, "columns" | "data"> {
  options: JColumnsOptions<T>[];
  request?: any;
  searchOperation?: (
    form: FormInstance<T> | undefined,
    refresh: () => Promise<void>
  ) => React.ReactElement;
  tableOperation?: (record?: T) => React.ReactElement;
  defaultParams?: {
    [key: string]: any;
  };
}

const JSearchTable = <T extends AnyObject>(props: JSearchTableProps<T>) => {
  const { options = [], defaultParams = {}, ...tableProps } = props;
  const [list, setList] = useState<T[]>([]);
  // 基础变量
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<T>();

  // 搜索框配置
  const searchOptions: JFormItemProps[] = useColumn<T, ColumnType.Search>(
    options,
    ColumnType.Search
  );
  const tableOptions: JTableOptions<T>[] = useColumn<T, ColumnType.Table>(
    options,
    ColumnType.Table
  );

  const fetchGetDataPage = useCallback(
    async (pageNum?: number, pageSize?: number, searchData?: any) => {
      if (!props.request) {
        return;
      }
      const params = {
        pageNum: pageNum || 1,
        pageSize: pageSize || 10,
        ...defaultParams,
        ...(searchData || searchParams || {}),
      };
      const result = await props.request(params);
      if (result.code === "0") {
        setTotal(result.data.total);
        setPageNum(result.data.pages);
        setPageSize(result.data.size);
        setList(result.data.records);
      }
    },
    [defaultParams, props, searchParams]
  );

  useMount(() => {
    fetchGetDataPage(1, pageSize);
  });

  const formatRender = useMemo(() => {
    return tableOptions.map((item) => {
      if (item.tableRender) {
        item.render = (_text: any, record: T) =>
          item.tableRender &&
          item.tableRender(record, () => fetchGetDataPage(1, pageSize));
      }
      return item;
    });
  }, [fetchGetDataPage, pageSize, tableOptions]);

  return (
    <>
      <JSearch<T>
        options={searchOptions}
        onSubmit={(data) => {
          setSearchParams(data);
          fetchGetDataPage(1, pageSize, data);
        }}
        onReload={() => {
          fetchGetDataPage(pageNum, pageSize, searchParams);
        }}
        operation={(form) =>
          props.searchOperation ? (
            props.searchOperation(form, () => fetchGetDataPage(1, pageSize))
          ) : (
            <></>
          )
        }
      ></JSearch>
      <JTable<T>
        {...tableProps}
        columns={formatRender}
        data={list}
        pageNum={pageNum}
        pageSize={pageSize}
        pageTotal={total}
      ></JTable>
    </>
  );
};

export default JSearchTable;
