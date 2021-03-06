import React, { FC } from "react";
import { LayoutTable } from "@/components/PageLayout/LayoutTable";
import { TableHeader } from "./TabelHeader";
import { TableList } from './TableList';
import { ProviderPage } from "./context";
import { NewCheck } from "./NewCheck";
import {
  ProviderCrud,
} from "@/hooks/page";
import * as api from "./services";

interface IProps {}
export const Checks: FC<IProps> = function () {
  return (
    <LayoutTable>
      <TableHeader className={"lay-header"} />
      <TableList />
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
