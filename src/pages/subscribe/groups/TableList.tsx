import React, { CSSProperties, FC } from "react";
import { useCrudTableAction, useCrudTableState } from "@/hooks/page";
import { ColumnProps } from "antd/lib/table";
import {
  CheckGroup,
  ECheckGroupFields,
} from "@/pages/subscribe/groups/constants";
import { ECheckTypeLabel, ESexTypeLabel } from "@/utils/constants";
import { Button, Popconfirm, Table } from "antd";

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const TableList: FC<IProps> = function (props) {
  const { data, pagination, loading } = useCrudTableState();
  const { editItem, deleteItem } = useCrudTableAction();
  const columns: ColumnProps<CheckGroup>[] = [
    {
      title: "编码",
      key: ECheckGroupFields.code,
      render: (_, item) => {
        return item.code;
      },
    },
    {
      title: "名称",
      key: ECheckGroupFields.name,
      render: (_, item) => {
        return item.name;
      },
    },
    {
      title: "助记码",
      key: ECheckGroupFields.helpcode,

      render: (_, item) => {
        return item.helpcode;
      },
    },
    {
      title: "适用性别",
      key: ECheckGroupFields.sex,

      render: (_, item) => {
        return ESexTypeLabel[item.sex];
      },
    },
    {
      title: "注意事项",
      key: ECheckGroupFields.attention,

      render: (_, item) => {
        return item.attention;
      },
    },
    {
      title: "项目说明",
      key: ECheckGroupFields.remark,

      render: (_, item) => {
        return item.remark;
      },
    },
    {
      title: "操作",
      key: "action",
      render(_, item) {
        return (
          <span className={"btn-act"}>
            <Button
              size={"small"}
              onClick={() => {
                editItem(item);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title={"确认删除?"}
              onConfirm={() => {
                deleteItem(item.id);
              }}
            >
              <Button size={"small"} style={{ color: "red" }}>
                删除
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  return (
    <Table
      className={"lay-table"}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      loading={loading}
    />
  );
};
