import React, { FC } from "react";
import { LayoutTable } from "@/components/PageLayout/LayoutTable";
import { TableHeader } from "./TabelHeader";
import { Table } from "antd";
import { ProviderPage } from "./context";
import { NewCheck } from './NewCheck';


import { ColumnProps } from "antd/lib/table";

interface IProps {}
export const Checks: FC<IProps> = function () {
  const columns: ColumnProps<any>[] = [
    { title: "项目编码" },
    { title: "项目名称" },
    { title: "项目类型" },
    { title: "所属分类" },
    { title: "适用性别" },
    { title: "适用年龄" },
    { title: "价格" },
    { title: "项目说明" },
    { title: "操作" },
  ];
  return (
    <LayoutTable>
      <TableHeader className={"lay-header"} />
      <Table className={"lay-table"} columns={columns} dataSource={[]} />
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
