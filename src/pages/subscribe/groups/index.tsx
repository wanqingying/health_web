import React, { FC } from "react";
import { LayoutTable } from "@/components/PageLayout/LayoutTable";
import { TableHeader } from "./TabelHeader";
import { TableList } from './TableList';
import { ProviderPage } from "./context";
import { NewGroup } from "./NewGroup";
import {
  ProviderCrud,
} from "@/hooks/page";
import * as api from "./services";

interface IProps {}
export const Groups: FC<IProps> = function () {
  return (
    <LayoutTable>
      <TableHeader className={"lay-header"} />
      <TableList />
      <NewGroup />
    </LayoutTable>
  );
};

export default () => {
  return (
    <ProviderPage>
      <ProviderCrud
        value={{
          ApiAddItem: api.add,
          ApiDelItem: api.deleteById,
          ApiEditItem: api.updateItem,
          ApiPageList: api.getItemList,
        }}
      >
        <Groups />
      </ProviderCrud>
    </ProviderPage>
  );
};
