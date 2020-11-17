import { getCtx } from "./help";
import { RouteItem } from "../configs/routes";
import { FC } from "react";

export interface StateBase {
  routes: RouteItem[];
  HeightHeader: number;
  HeightBreadCrumb: number;
}

const { useCtx, Provider } = getCtx<StateBase>();

export const useBaseCtx = useCtx;
export const ProviderBase: FC<{ value: StateBase }> = Provider;
