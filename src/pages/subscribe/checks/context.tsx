import { getCtx } from "@/utils/help";
import React, { useCallback, useEffect } from "react";
import { deleteById, getItemList } from "./services";
import { debounce } from "lodash";
import { TablePaginationConfig } from "antd/lib/table";
import { CheckItem, IniCheckItem } from "./constants";
import { message } from "antd";

export interface PageState {
  visible: boolean;
  data: CheckItem;
  updateList: number;
  search: string;
  loadingList: boolean;
  current: number;
}

const iniState: PageState = {
  visible: false,
  data: IniCheckItem,
  updateList: 1,
  search: "",
  loadingList: false,
  current: 1,
};

const { Provider, useCtx } = getCtx<PageState>(iniState);
export const usePageCtx = useCtx;
export const ProviderPage = Provider;
