import { getCtx } from "@/utils/help";
import React from "react";
import { CheckGroup, IniCheckItem } from "./constants";

export interface PageState {
  checkItems: string[];
  items: string[];
}

const iniState: PageState = {
  checkItems: [],
  items: [],
};

const { Provider, useCtx } = getCtx<PageState>(iniState);
export const usePageCtx = useCtx;
export const ProviderPage = Provider;
