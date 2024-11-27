import { useState } from "react";
import JPageCtrl from "../../components/Antd/PageCtrl";
import { JFormItemProps } from "../../components/Antd/Form/types";
import { useMount } from "ahooks";
import { getUserPage, UserProps } from "../../api/types/user";
import JTable from "../../components/Antd/Table";
import { getDictList } from "../../api/types/dict";

const ChangeUser = (props: {
  selectId: React.Key;
  onSelect: (id: React.Key) => void;
}) => {
  // 基础变量
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  //
  const [list, setList] = useState<UserProps[]>([]);
  const [dictList, setDictList] = useState<any>({
    Gender: "",
  });

  useMount(() => {
    fetchgetUserPage(1, 10);
    fetchgetDictList();
  });

  const fetchgetDictList = async () => {
    const result = await getDictList(["Gender"]);
    if (result.code === "0") {
      setDictList(result.data);
    }
  };

  const fetchgetUserPage = async (
    pageNum?: number,
    pageSize?: number,
    searchParams?: any
  ) => {
    const params = {
      pageNum: pageNum || 1,
      pageSize: pageSize || 10,
      ...searchParams,
    };
    const result = await getUserPage(params);
    if (result.code === "0") {
      setTotal(result.data.total);
      setPageNum(result.data.pages);
      setPageSize(result.data.size);
      setList(result.data.records);
    }
  };

  const columns: JFormItemProps[] = [
    {
      type: "image",
      key: "avatar",
      label: "用户头像",
      edit: true,
      show: true,
      width: 100,
      maxCount: 1,
      columns: 1,
      labelCol: {
        span: 3,
      },
      groupId: "7cd169f80fa6da7d7b97a1320bc029eb",
    },
    {
      type: "input",
      key: "nickName",
      label: "昵称",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "name",
      label: "姓名",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "select",
      key: "gender",
      label: "性别",
      edit: true,
      show: true,
      width: 200,
      options: (dictList.Gender || []).map((item: any) => ({
        ...item,
        dictCode: Number(item.dictCode),
      })),
      optionsProps: {
        label: "dictName",
        value: "dictCode",
      },
      color: {
        1: "blue",
        2: "red",
      },
    },
    {
      type: "input",
      key: "idCard",
      label: "身份证",
      edit: true,
      show: true,
      width: 200,
    },
    {
      type: "input",
      key: "createdByApplicationName",
      label: "账号来源",
      show: true,
      width: 200,
    },
    {
      type: "radio",
      key: "status",
      label: "状态",
      options: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "禁用",
          value: 0,
        },
      ],
      color: {
        1: "green",
        0: "red",
      },
      optionsProps: {
        label: "label",
        value: "value",
      },
      edit: true,
      show: true,
      width: 200,
    },
  ];

  return (
    <>
      <JPageCtrl
        options={[
          {
            type: "input",
            key: "name",
            label: "用户名",
            edit: true,
          },
        ]}
        additionButton={<></>}
        onSubmit={(params) => {
          fetchgetUserPage(pageNum, pageSize, params);
        }}
        onReload={() => {
          fetchgetUserPage(pageNum, pageSize);
        }}
      ></JPageCtrl>
      <JTable
        data={list}
        columns={columns}
        pageNum={pageNum}
        pageTotal={total}
        pageSize={pageSize}
        onPageChange={(pageNum, pageSize) => {
          fetchgetUserPage(pageNum, pageSize);
        }}
        rowSelection={{
          type: "radio",
          selectedRowKeys: [props.selectId],
          onChange: (selectedRowKeys) => {
            props.onSelect(selectedRowKeys[0]);
          },
        }}
      ></JTable>
    </>
  );
};

export default ChangeUser;
