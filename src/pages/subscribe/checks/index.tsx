import React, { FC } from "react";
import { LayoutTable } from "@/components/PageLayout/LayoutTable";
import { TableHeader } from "./TabelHeader";
import { Table, Button, Popconfirm } from "antd";
import { ProviderPage } from "./context";
import { NewCheck } from "./NewCheck";
import {
  ProviderCrud,
  useCrudTableAction,
  useCrudTableState,
} from "@/hooks/page";
import * as api from "./services";

import { ColumnProps } from "antd/lib/table";
import { CheckItem } from "@/pages/subscribe/checks/constants";
import { ECheckTypeLabel, ESexTypeLabel } from "@/utils/constants";

interface IProps {}
export const Checks: FC<IProps> = function () {
  const { data, pagination, loading } = useCrudTableState();
  const { editItem, deleteItem } = useCrudTableAction();
  const columns: ColumnProps<CheckItem>[] = [
    {
      title: "项目编码",
      render: (_, item) => {
        return item.code;
      },
    },
    {
      title: "项目名称",
      render: (_, item) => {
        return item.name;
      },
    },
    {
      title: "项目类型",
      render: (_, item) => {
        return ECheckTypeLabel[item.type];
      },
    },
    {
      title: "所属分类",
      render: (_, item) => {
        return item.type;
      },
    },
    {
      title: "适用性别",
      render: (_, item) => {
        return ESexTypeLabel[item.sex];
      },
    },
    {
      title: "适用年龄",
      render: (_, item) => {
        return item.age;
      },
    },
    {
      title: "价格",
      render: (_, item) => {
        return item.price;
      },
    },
    {
      title: "项目说明",
      render: (_, item) => {
        return item.remark;
      },
    },
    {
      title: "操作",
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
    <LayoutTable>
      <TableHeader className={"lay-header"} />
      <Table
        className={"lay-table"}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
      />
      <NewCheck />
    </LayoutTable>
  );
};

export default () => {
  return (
    <ProviderPage>
      <ProviderCrud
        value={{
          ApiAddItem: api.addCheckItem,
          ApiDelItem: api.deleteById,
          ApiEditItem: api.updateItem,
          ApiPageList: api.getItemList,
        }}
      >
        <Checks />
      </ProviderCrud>
    </ProviderPage>
  );
};
