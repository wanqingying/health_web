import { getCtx } from "@/utils/help";
import React from "react";
import { CheckGroup, IniCheckItem } from "./constants";

export interface PageState {
  visible: boolean;
  data: CheckGroup;
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
