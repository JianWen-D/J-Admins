import { JColumnsOptions, JSearchTable } from "@devin/ui";
import { Tag } from "antd";
import { useMount } from "ahooks";
import { useMemo, useState } from "react";
import { getUserIdsByRoleId } from "../../api/types/role";
import { useCommon } from "../../context/commonContext";
import { getUserPage, UserProps } from "../../api/types/user";

const UserEdit = (props: { roleId: string; onClose: () => void }) => {
  const { dictList } = useCommon();
  const [userIds, setUserIds] = useState<string[]>([]);
  const [selectUserIds, setSelectUserIds] = useState<React.Key[]>([]);

  useMount(() => {
    fetchGetUserIdsByRoleId();
  });

  /**
   * 获取应用资源列表
   */
  const fetchGetUserIdsByRoleId = async () => {
    const result = await getUserIdsByRoleId(props.roleId);
    if (result.code === "0") {
      setUserIds(result.data);
      setSelectUserIds(result.data);
    }
  };

  const columns = useMemo(() => {
    return [
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
        hideInForm: true,
        hideInSearch: true,
        label: "用户来源",
        width: 200,
      },
      {
        type: "input",
        key: "accountId",
        label: "账号",
        width: 200,
        hideInForm: true,
        hideInSearch: true,
        render: (text) => {
          return text ? <Tag color="blue">已绑定</Tag> : <Tag>未绑定</Tag>;
        },
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
      {
        type: "textarea",
        key: "remark",
        label: "备注",
        width: 200,
        columnsNum: 24,
        labelCol: {
          span: 2,
        },
        wrapperCol: {
          span: 22,
        },
        hideInSearch: true,
      },
      {
        type: "date",
        key: "updatedTime",
        label: "更新时间",
        width: 200,
        hideInSearch: true,
      },
    ];
  }, []) as JColumnsOptions<UserProps>[];

  return (
    <>
      <JSearchTable<UserProps>
        options={columns}
        request={getUserPage}
        rowSelection={{
          selectedRowKeys: selectUserIds,
          onChange: (selectedRowKeys) => {
            setSelectUserIds(selectedRowKeys);
          },
        }}
      ></JSearchTable>
    </>
  );
};

export default UserEdit;
