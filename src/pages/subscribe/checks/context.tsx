import { getCtx } from "@/utils/help";

export interface PageState {
  visible: boolean;
  data: any;
  updateList: number;
}

const iniState: PageState = {
  visible: true,
  data: null,
  updateList: 1,
};

const { Provider, useCtx } = getCtx<PageState>(iniState);
export const usePageCtx = useCtx;
export const ProviderPage = Provider;
