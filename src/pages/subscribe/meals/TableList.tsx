import React, { CSSProperties, FC } from "react";
import { useCrudTableAction, useCrudTableState } from "@/hooks/page";
import { ColumnProps } from "antd/lib/table";
import { MealItem, EMealFields, EMealLabels } from "./constants";

import { ESexTypeLabel } from "@/utils/constants";
import { Button, Popconfirm, Table } from "antd";

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const TableList: FC<IProps> = function (props) {
  const { data, pagination, loading } = useCrudTableState();
  const { editItem, deleteItem } = useCrudTableAction();
  const columns: ColumnProps<MealItem>[] = [
    {
      title: EMealLabels.code,
      key: EMealFields.code,
      render: (_, item) => {
        return item.code;
      },
    },
    {
      title: EMealLabels.name,
      key: EMealFields.name,
      render: (_, item) => {
        return item.name;
      },
    },
    {
      title: EMealLabels.price,
      key: EMealFields.price,
      render: (_, item) => {
        return item.price;
      },
    },
    {
      title: EMealLabels.helpcode,
      key: EMealFields.helpcode,

      render: (_, item) => {
        return item.helpcode;
      },
    },
    {
      title: EMealLabels.sex,
      key: EMealFields.sex,

      render: (_, item) => {
        return ESexTypeLabel[item.sex];
      },
    },
    // {
    //   title: EMealLabels.attention,
    //   key: EMealFields.attention,
    //
    //   render: (_, item) => {
    //     return item.attention;
    //   },
    // },
    {
      title: EMealLabels.attention,
      key: EMealFields.attention,
      render: (_, item) => {
        return item.attention;
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
