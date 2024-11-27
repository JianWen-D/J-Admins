import { useMemo } from "react";
import { JFormItemProps } from "./Base/Form/types";
import { JColumnsOptions } from "./Business/types";
import { JTableOptions } from "./Base/Table/types";

export enum ColumnType {
  Form = "form",
  Table = "table",
  Search = "search",
  Check = "check",
}

type ColumnReturnProps<T, R> = R extends ColumnType.Form
  ? JFormItemProps[]
  : R extends ColumnType.Table
  ? JTableOptions<T>[]
  : R extends ColumnType.Search
  ? JFormItemProps[]
  : R extends ColumnType.Check
  ? JFormItemProps[]
  : never[];

const IGNORE_KEYS = [
  "formSort",
  "tableSort",
  "checkSort",
  "hideInSearch",
  "hideInTable",
  "hideInForm",
  "hideInCheck",
];

const ignoreKeyInObject = (data: any, ignoreKeys?: string[]): object => {
  const keysArr = Object.keys(data);
  return keysArr.reduce((prev, next) => {
    if ([...IGNORE_KEYS, ...(ignoreKeys || [])].some((item) => item === next)) {
      return prev;
    }
    return {
      ...prev,
      [next]: data[next],
    };
  }, {});
};

const useColumn = <T, R extends ColumnType>(
  options: JColumnsOptions<T>[],
  type: R
): ColumnReturnProps<T, R> => {
  // Get Form Options
  const formOptions = useMemo(() => {
    return options
      .filter((item) => !item.hideInForm)
      .map((item) => {
        return ignoreKeyInObject(item);
      });
  }, [options]) as ColumnReturnProps<T, R>;
  // Get Table Options
  const tableOptions = useMemo(() => {
    return options
      .filter((item) => !item.hideInTable)
      .map((item) => {
        return {
          ...ignoreKeyInObject(item, ["key", "name"]),
          dataIndex: item.key,
          title: item.label,
        };
      });
  }, [options]) as ColumnReturnProps<T, R>;
  // Get Search Options
  const searchOptions = useMemo(() => {
    return options
      .filter((item) => !item.hideInSearch)
      .map((item) => {
        return {
          ...ignoreKeyInObject(item, ["columnsNum"]),
          type: ["checkbox", "radio"].includes(item.type)
            ? "select"
            : item.type,
        };
      });
  }, [options]) as ColumnReturnProps<T, R>;
  // Get Check Options
  const checkOptions = useMemo(() => {
    return options
      .filter((item) => !item.hideInCheck)
      .map((item) => {
        return ignoreKeyInObject(item);
      });
  }, [options]) as ColumnReturnProps<T, R>;
  // defatul options
  const defaultOptions = useMemo(() => {
    return options;
  }, [options]) as ColumnReturnProps<T, R>;

  switch (type) {
    case ColumnType.Form:
      return formOptions;
    case ColumnType.Table:
      return tableOptions;
    case ColumnType.Search:
      return searchOptions;
    case ColumnType.Check:
      return checkOptions;
    default:
      return defaultOptions;
  }
};

export default useColumn;
