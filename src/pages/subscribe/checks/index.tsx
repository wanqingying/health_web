import React, { FC } from "react";
import { LayoutTable } from "@/components/PageLayout/LayoutTable";
import { TableHeader } from "./TabelHeader";
import { Table, Button } from "antd";
import { ProviderPage, useTableData } from "./context";
import { NewCheck } from "./NewCheck";

import { ColumnProps } from "antd/lib/table";
import { CheckItem } from "@/pages/subscribe/checks/constants";
import { ECheckTypesMap, ESexTypeMap } from "@/utils/constants";

interface IProps {}
export const Checks: FC<IProps> = function () {
  const { data, pagination, loading } = useTableData();
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
        return ECheckTypesMap.get(item.type);
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
        return ESexTypeMap.get(item.sex);
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
      render() {
        return (
          <span>
            <Button size={"small"}>编辑</Button>
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
      <Checks />
    </ProviderPage>
  );
};
