import { useState } from "react";
import { JColumnsOptions, JSearchTable } from "@devin/ui";
import { useMount } from "ahooks";
import { getUserPage, UserProps } from "../../api/types/user";
import { getDictList } from "../../api/types/dict";

const ChangeUser = (props: {
  selectId: React.Key;
  onSelect: (id: React.Key) => void;
}) => {
  const [dictList, setDictList] = useState<any>({
    Gender: "",
  });

  useMount(() => {
    fetchgetDictList();
  });

  const fetchgetDictList = async () => {
    const result = await getDictList(["Gender"]);
    if (result.code === "0") {
      setDictList(result.data);
    }
  };

  const columns: JColumnsOptions<any>[] = [
    {
      type: "image",
      key: "avatar",
      label: "用户头像",
      width: 100,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      type: "input",
      key: "nickName",
      label: "昵称",
      width: 200,
    },
    {
      type: "input",
      key: "name",
      label: "姓名",
      width: 200,
    },
    {
      type: "select",
      key: "gender",
      label: "性别",
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
      width: 200,
    },
    {
      type: "input",
      key: "createdByApplicationName",
      label: "账号来源",
      width: 200,
      hideInForm: true,
      hideInSearch: true,
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
      width: 200,
    },
  ];

  return (
    <JSearchTable<UserProps>
      options={columns}
      request={getUserPage}
      rowSelection={{
        type: "radio",
        selectedRowKeys: [props.selectId],
        onChange: (selectedRowKeys) => {
          props.onSelect(selectedRowKeys[0]);
        },
      }}
    ></JSearchTable>
    // <JTable
    //   data={list}
    //   columns={tableOperation}
    //   pageTotal={total}
    //   pageSize={pageSize}
    //   pageNum={pageNum}
    //   onPageChange={(pageNum, pageSize) => {
    //     fetchgetUserPage(pageNum, pageSize);
    //   }}
    //   rowSelection={{
    //     type: "radio",
    //     selectedRowKeys: [props.selectId],
    //     onChange: (selectedRowKeys) => {
    //       props.onSelect(selectedRowKeys[0]);
    //     },
    //   }}
    // ></JTable>
  );
};

export default ChangeUser;
