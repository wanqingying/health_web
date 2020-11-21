import { getCtx } from "@/utils/help";
import React from "react";
import {  IniCheckItem } from "./constants";

export interface PageState {
}

const iniState: PageState = {

};

const { Provider, useCtx } = getCtx<PageState>(iniState);
export const usePageCtx = useCtx;
export const ProviderPage = Provider;
