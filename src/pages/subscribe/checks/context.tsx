import { getCtx } from "@/utils/help";

export interface PageState {
  visible: boolean;
  data: any;
}

const iniState: PageState = {
  visible: true,
  data: null,
};

const { Provider, useCtx } = getCtx<PageState>(iniState);
export const usePageCtx = useCtx;
export const ProviderPage = Provider;
